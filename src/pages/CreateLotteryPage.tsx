import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Calendar, Clock, Coins, Users, Globe, Lock, Info, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const CreateLotteryPage: React.FC = () => {
  const { createLottery, state } = useAppContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'custom',
    visibility: 'public',
    ticketPrice: 0.1,
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
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (formData.ticketPrice <= 0) {
      newErrors.ticketPrice = 'Ticket price must be greater than 0';
    }
    
    if (formData.maxTickets < 10) {
      newErrors.maxTickets = 'Minimum 10 tickets required';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else {
      const endDate = new Date(formData.endDate);
      const now = new Date();
      if (endDate <= now) {
        newErrors.endDate = 'End date must be in the future';
      }
    }
    
    const creationFee = 0.01;
    if (!state.user || state.user.balance < creationFee) {
      newErrors.balance = 'Insufficient balance for creation fee (0.01 ETH required)';
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
      
      const success = await createLottery(lotteryData);
      
      if (success) {
        setSuccess(true);
        setFormData({
          title: '',
          description: '',
          category: 'custom',
          visibility: 'public',
          ticketPrice: 0.1,
          maxTickets: 100,
          endDate: '',
        });
      } else {
        setErrors({ submit: 'Failed to create lottery. Please try again.' });
      }
    } catch (error) {
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
            fullWidth={true}
            onClick={() => setSuccess(false)}
          >
            Create Another Lottery
          </Button>
        </Card>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create Your Own Lottery</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card variant="glass">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Lottery Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-dark-600 border rounded-lg focus:outline-none focus:ring-1 ${
                    errors.title 
                      ? 'border-error-500 focus:ring-error-500 focus:border-error-500' 
                      : 'border-dark-500 focus:ring-primary-500 focus:border-primary-500'
                  }`}
                  placeholder="Enter a catchy title"
                />
                {errors.title && <p className="text-error-500 text-sm mt-1">{errors.title}</p>}
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-2 bg-dark-600 border rounded-lg focus:outline-none focus:ring-1 ${
                    errors.description 
                      ? 'border-error-500 focus:ring-error-500 focus:border-error-500' 
                      : 'border-dark-500 focus:ring-primary-500 focus:border-primary-500'
                  }`}
                  placeholder="Describe your lottery event and its prizes"
                ></textarea>
                {errors.description && <p className="text-error-500 text-sm mt-1">{errors.description}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-dark-600 border border-dark-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="custom">Custom</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Visibility
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="visibility"
                        value="public"
                        checked={formData.visibility === 'public'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <Globe size={16} className="mr-1 text-primary-400" />
                      <span>Public</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="visibility"
                        value="private"
                        checked={formData.visibility === 'private'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <Lock size={16} className="mr-1 text-secondary-400" />
                      <span>Private</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ticket Price (ETH) *
                  </label>
                  <div className="relative">
                    <Coins size={16} className="absolute left-3 top-3 text-accent-400" />
                    <input
                      type="number"
                      name="ticketPrice"
                      min="0.01"
                      step="0.01"
                      value={formData.ticketPrice}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2 bg-dark-600 border rounded-lg focus:outline-none focus:ring-1 ${
                        errors.ticketPrice 
                          ? 'border-error-500 focus:ring-error-500 focus:border-error-500' 
                          : 'border-dark-500 focus:ring-primary-500 focus:border-primary-500'
                      }`}
                    />
                  </div>
                  {errors.ticketPrice && <p className="text-error-500 text-sm mt-1">{errors.ticketPrice}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Maximum Tickets *
                  </label>
                  <div className="relative">
                    <Users size={16} className="absolute left-3 top-3 text-primary-400" />
                    <input
                      type="number"
                      name="maxTickets"
                      min="10"
                      step="1"
                      value={formData.maxTickets}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2 bg-dark-600 border rounded-lg focus:outline-none focus:ring-1 ${
                        errors.maxTickets 
                          ? 'border-error-500 focus:ring-error-500 focus:border-error-500' 
                          : 'border-dark-500 focus:ring-primary-500 focus:border-primary-500'
                      }`}
                    />
                  </div>
                  {errors.maxTickets && <p className="text-error-500 text-sm mt-1">{errors.maxTickets}</p>}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  End Date & Time *
                </label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-3 text-secondary-400" />
                  <input
                    type="datetime-local"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 bg-dark-600 border rounded-lg focus:outline-none focus:ring-1 ${
                      errors.endDate 
                        ? 'border-error-500 focus:ring-error-500 focus:border-error-500' 
                        : 'border-dark-500 focus:ring-primary-500 focus:border-primary-500'
                    }`}
                  />
                </div>
                {errors.endDate && <p className="text-error-500 text-sm mt-1">{errors.endDate}</p>}
              </div>
              
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
                  fullWidth={true}
                  loading={loading}
                  disabled={!state.user || state.user.balance < 0.01}
                >
                  Create Lottery (0.01 ETH Fee)
                </Button>
              </div>
            </form>
          </Card>
        </div>
        
        <div>
          <Card variant="glass">
            <h3 className="text-lg font-semibold mb-4">Lottery Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Ticket Price:</span>
                <span className="font-medium">{formData.ticketPrice} ETH</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Maximum Tickets:</span>
                <span className="font-medium">{formData.maxTickets}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Estimated Prize Pool:</span>
                <span className="font-medium">{estimatedPrizePool.toFixed(2)} ETH</span>
              </div>
              
              <div className="border-t border-dark-600 my-4"></div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Creator Fee (5%):</span>
                <span className="text-secondary-400">{creatorFee.toFixed(2)} ETH</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Platform Fee (5%):</span>
                <span className="text-primary-400">{platformFee.toFixed(2)} ETH</span>
              </div>
              
              <div className="border-t border-dark-600 my-4"></div>
              
              <div className="flex justify-between">
                <span className="text-gray-300 font-medium">Final Prize Pool:</span>
                <span className="text-accent-400 font-bold">{finalPrizePool.toFixed(2)} ETH</span>
              </div>
            </div>
            
            <div className="bg-dark-600/50 rounded-lg p-4">
              <div className="flex">
                <Info size={16} className="text-primary-400 mt-1 mr-2 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p className="mb-2">
                    Creating a lottery requires a 0.01 ETH fee for smart contract deployment.
                  </p>
                  <p>
                    After creation, your lottery will be active and visible to other users based on your visibility settings.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};