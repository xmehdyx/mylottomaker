// src/pages/CreateLotteryPage.tsx

import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Calendar, Coins, Users, Globe, Lock, Info, CheckCircle, Network as NetworkIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Network } from '../types';

export const CreateLotteryPage: React.FC = () => {
  const { createLottery, state } = useAppContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'custom',
    visibility: 'public',
    ticketPrice: 5,
    maxTickets: 100,
    endDate: '',
    network: 'solana' as Network,
    currency: 'USDT',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.ticketPrice <= 0) newErrors.ticketPrice = 'Ticket price must be greater than 0';
    if (formData.maxTickets < 10) newErrors.maxTickets = 'Minimum 10 tickets required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    else if (new Date(formData.endDate) <= new Date()) newErrors.endDate = 'End date must be in the future';

    const userBalance = state.user?.wallet?.balances[formData.network] || 0;
    if (userBalance < 1) {
      newErrors.balance = `Insufficient balance on ${formData.network.toUpperCase()} for creation fee (1 USDT required)`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const success = await createLottery({
        ...formData,
        endDate: new Date(formData.endDate),
      });

      if (success) {
        setSuccess(true);
        setFormData({
          title: '',
          description: '',
          category: 'custom',
          visibility: 'public',
          ticketPrice: 5,
          maxTickets: 100,
          endDate: '',
          network: 'solana',
          currency: 'USDT',
        });
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
          <p className="text-gray-300 mb-6">Your lottery is now active. Users can buy tickets.</p>
          <Button variant="primary" size="lg" fullWidth onClick={() => setSuccess(false)}>
            Create Another
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create a New Lottery</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card variant="glass">
            <form onSubmit={handleSubmit}>
              {/* title, description, category, visibility inputs */}
              {/* ... (همانند کد اصلی که فرستادی) */}

              {/* Network Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Blockchain Network
                </label>
                <select
                  name="network"
                  value={formData.network}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-600 border border-dark-500 rounded-lg"
                >
                  <option value="solana">Solana</option>
                  <option value="tron">Tron</option>
                  <option value="bsc">BNB Smart Chain</option>
                </select>
              </div>

              {/* End Date, Balance Error, Submit */}
              {/* ... (همانند کد اصلی که فرستادی) */}

              {errors.balance && (
                <div className="mb-6 p-4 bg-error-900/20 border border-error-500/50 rounded-lg">
                  <p className="text-error-400">{errors.balance}</p>
                </div>
              )}
              {errors.submit && (
                <div className="mb-6 p-4 bg-error-900/20 border border-error-500/50 rounded-lg">
                  <p className="text-error-400">{errors.submit}</p>
                </div>
              )}

              <div className="mt-8">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={loading}
                  disabled={loading}
                >
                  Create Lottery (1 USDT Fee)
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Summary Box */}
        <div>
          <Card variant="glass">
            <h3 className="text-lg font-semibold mb-4">Lottery Summary</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p>Ticket Price: {formData.ticketPrice} USDT</p>
              <p>Max Tickets: {formData.maxTickets}</p>
              <p>Estimated Pool: {estimatedPrizePool.toFixed(2)} USDT</p>
              <p>Creator Fee (5%): {creatorFee.toFixed(2)} USDT</p>
              <p>Platform Fee (5%): {platformFee.toFixed(2)} USDT</p>
              <p>Final Prize Pool: {finalPrizePool.toFixed(2)} USDT</p>
              <p>Network: {formData.network.toUpperCase()}</p>
            </div>
            <div className="text-xs text-gray-400 mt-4">
              Note: You must have at least 1 USDT in your {formData.network.toUpperCase()} wallet.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
