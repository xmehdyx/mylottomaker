import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { CheckCircle, Info, Coins, Users, Calendar, Globe, Lock, Wallet } from 'lucide-react';

export const CreateLotteryPage: React.FC = () => {
  const { state, createLottery } = useAppContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    network: 'solana',
    visibility: 'public',
    ticketPrice: 1,
    maxTickets: 100,
    endDate: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'ticketPrice' || name === 'maxTickets' ? parseFloat(value) || 0 : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const balance = state.user?.wallet.balances[formData.network] || 0;
    const creationFee = 1; // ۱ USDT

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    else if (new Date(formData.endDate) <= new Date()) newErrors.endDate = 'End date must be in the future';
    if (formData.ticketPrice <= 0) newErrors.ticketPrice = 'Ticket price must be > 0';
    if (formData.maxTickets < 10) newErrors.maxTickets = 'Minimum 10 tickets required';
    if (balance < creationFee) newErrors.balance = `Insufficient balance on ${formData.network.toUpperCase()} network (min 1 USDT required)`;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const lotteryData = {
      ...formData,
      endDate: new Date(formData.endDate),
      startDate: new Date(),
      type: 'user-generated',
      category: 'custom',
      currency: 'USDT',
      creatorName: state.user?.username || 'Unknown',
    };

    const success = await createLottery(lotteryData);

    if (success) {
      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        network: 'solana',
        visibility: 'public',
        ticketPrice: 1,
        maxTickets: 100,
        endDate: '',
      });
    } else {
      setErrors({ submit: 'Failed to create lottery' });
    }

    setLoading(false);
  };

  const estimatedPrize = formData.ticketPrice * formData.maxTickets;
  const platformFee = estimatedPrize * 0.05;
  const creatorFee = estimatedPrize * 0.05;
  const finalPrizePool = estimatedPrize - platformFee - creatorFee;

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-20">
        <Card variant="glass" className="text-center">
          <CheckCircle size={64} className="mx-auto text-success-500 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Lottery Created Successfully!</h2>
          <p className="text-gray-300 mb-6">
            Your lottery is now active and visible to others.
          </p>
          <Button onClick={() => setSuccess(false)} fullWidth variant="primary">Create Another</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Create a New Lottery</h1>

      <Card variant="glass">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-gray-300 block mb-1">Title *</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-dark-700 text-white"
              placeholder="Lottery title"
            />
            {errors.title && <p className="text-error-500 text-sm">{errors.title}</p>}
          </div>

          <div>
            <label className="text-gray-300 block mb-1">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 rounded bg-dark-700 text-white"
            />
            {errors.description && <p className="text-error-500 text-sm">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300 block mb-1">Network *</label>
              <select
                name="network"
                value={formData.network}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-dark-700 text-white"
              >
                <option value="solana">Solana</option>
                <option value="tron">Tron</option>
                <option value="bsc">BSC</option>
              </select>
            </div>

            <div>
              <label className="text-gray-300 block mb-1">Visibility *</label>
              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-dark-700 text-white"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300 block mb-1">Ticket Price (USDT) *</label>
              <input
                type="number"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-dark-700 text-white"
                min={0.1}
              />
              {errors.ticketPrice && <p className="text-error-500 text-sm">{errors.ticketPrice}</p>}
            </div>

            <div>
              <label className="text-gray-300 block mb-1">Max Tickets *</label>
              <input
                type="number"
                name="maxTickets"
                value={formData.maxTickets}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-dark-700 text-white"
                min={10}
              />
              {errors.maxTickets && <p className="text-error-500 text-sm">{errors.maxTickets}</p>}
            </div>
          </div>

          <div>
            <label className="text-gray-300 block mb-1">End Date & Time *</label>
            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-dark-700 text-white"
            />
            {errors.endDate && <p className="text-error-500 text-sm">{errors.endDate}</p>}
          </div>

          {errors.balance && (
            <div className="bg-red-900/30 border border-red-600 p-3 rounded text-red-300">
              {errors.balance}
            </div>
          )}

          {errors.submit && (
            <div className="bg-red-900/30 border border-red-600 p-3 rounded text-red-300">
              {errors.submit}
            </div>
          )}

          <div className="text-sm text-gray-400 mt-4">
            <Info size={14} className="inline mr-1 text-primary-400" />
            Creating a lottery costs <strong>1 USDT</strong> from your {formData.network.toUpperCase()} balance.
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            Create Lottery
          </Button>
        </form>
      </Card>

      <Card variant="glass">
        <h3 className="font-semibold text-lg mb-2">Prize Calculation</h3>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>Total Collected: {estimatedPrize} USDT</li>
          <li>Platform Fee (5%): {platformFee.toFixed(2)} USDT</li>
          <li>Creator Fee (5%): {creatorFee.toFixed(2)} USDT</li>
          <li><strong>Final Prize Pool: {finalPrizePool.toFixed(2)} USDT</strong></li>
        </ul>
      </Card>
    </div>
  );
};
