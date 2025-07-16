import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Calendar, Coins, Users, Globe, Lock, CheckCircle, Info } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface LotteryFormData {
  title: string;
  description: string;
  category: string;
  visibility: 'public' | 'private';
  ticketPrice: number;
  maxTickets: number;
  endDate: string;
}

const CATEGORIES = ['Custom', 'Sports', 'Entertainment', 'Crypto', 'Other'];

export const CreateLotteryPage: React.FC = () => {
  const { createLottery, state } = useAppContext();
  const [formData, setFormData] = useState<LotteryFormData>({
    title: '',
    description: '',
    category: 'Custom',
    visibility: 'public',
    ticketPrice: 0.1,
    maxTickets: 100,
    endDate: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const CREATION_FEE = 0.01; // هزینه ثابت ایجاد لاتری به ETH یا USDT

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === 'ticketPrice' || name === 'maxTickets'
          ? parseFloat(value) || 0
          : value,
    }));

    // حذف خطا هنگام تغییر ورودی
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.ticketPrice <= 0) newErrors.ticketPrice = 'Ticket price must be greater than 0';
    if (formData.maxTickets < 10) newErrors.maxTickets = 'Minimum 10 tickets required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    else if (new Date(formData.endDate) <= new Date()) newErrors.endDate = 'End date must be in the future';

    // بررسی موجودی کاربر برای هزینه ایجاد لاتری
    if (!state.user || state.user.balance < CREATION_FEE) {
      newErrors.balance = `Insufficient balance for creation fee (${CREATION_FEE} ETH required)`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const lotteryData = {
        ...formData,
        endDate: new Date(formData.endDate),
      };

      const result = await createLottery(lotteryData);

      if (result) {
        setSuccess(true);
        setFormData({
          title: '',
          description: '',
          category: 'Custom',
          visibility: 'public',
          ticketPrice: 0.1,
          maxTickets: 100,
          endDate: '',
        });
        setErrors({});
      } else {
        setErrors({ submit: 'Failed to create lottery. Please try again.' });
      }
    } catch {
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const estimatedPrizePool = formData.ticketPrice * (formData.maxTickets || 100);
  const creatorFee = estimatedPrizePool * 0.05;
  const platformFee = estimatedPrizePool * 0.05;
  const finalPrizePool = estimatedPrizePool - creatorFee - platformFee;

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-20">
        <Card variant="glass" className="text-center">
          <CheckCircle size={64} className="mx-auto text-success-500 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Lottery Created Successfully!</h2>
          <p className="text-gray-300 mb-6">
            Your lottery has been created and is now active. Users can start purchasing tickets.
          </p>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setSuccess(false)}
          >
            Create Another Lottery
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Create Your Own Lottery</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card variant="glass" className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-white font-medium mb-2">
                  Lottery Title *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter a catchy title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-dark-700 border focus:outline-none focus:ring-2 ${
                    errors.title ? 'border-error-500 ring-error-500' : 'border-dark-600 ring-primary-500'
                  } text-white`}
                />
                {errors.title && <p className="text-error-500 text-sm mt-1">{errors.title}</p>}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-white font-medium mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Describe your lottery event and its prizes"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-dark-700 border focus:outline-none focus:ring-2 ${
                    errors.description ? 'border-error-500 ring-error-500' : 'border-dark-600 ring-primary-500'
                  } text-white resize-none`}
                />
                {errors.description && <p className="text-error-500 text-sm mt-1">{errors.description}</p>}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-white font-medium mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Visibility */}
              <div>
                <span className="block text-white font-medium mb-2">Visibility</span>
                <div className="flex items-center space-x-6">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="visibility"
                      value="public"
                      checked={formData.visibility === 'public'}
                      onChange={handleChange}
                      className="form-radio text-primary-500"
                    />
                    <span className="ml-2 text-white">Public</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="visibility"
                      value="private"
                      checked={formData.visibility === 'private'}
                      onChange={handleChange}
                      className="form-radio text-primary-500"
                    />
                    <span className="ml-2 text-white">Private</span>
                  </label>
                </div>
              </div>

              {/* Ticket Price */}
              <div>
                <label htmlFor="ticketPrice" className="block text-white font-medium mb-2">
                  Ticket Price (ETH) *
                </label>
                <input
                  id="ticketPrice"
                  name="ticketPrice"
                  type="number"
                  min={0.01}
                  step={0.01}
                  value={formData.ticketPrice}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-dark-700 border focus:outline-none focus:ring-2 ${
                    errors.ticketPrice ? 'border-error-500 ring-error-500' : 'border-dark-600 ring-primary-500'
                  } text-white`}
                />
                {errors.ticketPrice && <p className="text-error-500 text-sm mt-1">{errors.ticketPrice}</p>}
              </div>

              {/* Maximum Tickets */}
              <div>
                <label htmlFor="maxTickets" className="block text-white font-medium mb-2">
                  Maximum Tickets *
                </label>
                <input
                  id="maxTickets"
                  name="maxTickets"
                  type="number"
                  min={10}
                  step={1}
                  value={formData.maxTickets}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-dark-700 border focus:outline-none focus:ring-2 ${
                    errors.maxTickets ? 'border-error-500 ring-error-500' : 'border-dark-600 ring-primary-500'
                  } text-white`}
                />
                {errors.maxTickets && <p className="text-error-500 text-sm mt-1">{errors.maxTickets}</p>}
              </div>

              {/* End Date & Time */}
              <div>
                <label htmlFor="endDate" className="block text-white font-medium mb-2">
                  End Date & Time *
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-dark-700 border focus:outline-none focus:ring-2 ${
                    errors.endDate ? 'border-error-500 ring-error-500' : 'border-dark-600 ring-primary-500'
                  } text-white`}
                />
                {errors.endDate && <p className="text-error-500 text-sm mt-1">{errors.endDate}</p>}
              </div>

              {/* Balance Error */}
              {errors.balance && (
                <div className="bg-error-900/20 border border-error-500/50 rounded-lg p-3 text-error-400">
                  {errors.balance}
                </div>
              )}

              {/* Submit Error */}
              {errors.submit && (
                <div className="bg-error-900/20 border border-error-500/50 rounded-lg p-3 text-error-400">
                  {errors.submit}
                </div>
              )}

              {/* Summary */}
              <div className="bg-dark-700 rounded-lg p-4 text-gray-300 space-y-2">
                <p>
                  Estimated Prize Pool: <span className="font-semibold">{estimatedPrizePool.toFixed(4)} ETH</span>
                </p>
                <p>
                  Creator Fee (5%): <span className="text-secondary-400">{creatorFee.toFixed(4)} ETH</span>
                </p>
                <p>
                  Platform Fee (5%): <span className="text-primary-400">{platformFee.toFixed(4)} ETH</span>
                </p>
                <p className="font-semibold text-accent-400">
                  Final Prize Pool: {finalPrizePool.toFixed(4)} ETH
                </p>
                <div className="flex items-center text-sm text-gray-400 mt-2">
                  <Info size={16} className="mr-2" />
                  <span>
                    Creating a lottery requires a {CREATION_FEE} ETH fee for smart contract deployment.
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                disabled={!state.user || state.user.balance < CREATION_FEE}
              >
                Create Lottery ({CREATION_FEE} ETH Fee)
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};
