import React, { useState } from 'react';
import { 
  Bell, 
  Moon, 
  Sun, 
  Wallet,
  Plus,
  Minus,
  X,
  Menu,
  Ticket
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { formatCurrency, formatDate } from '../../utils/helpers';

export const Header: React.FC = () => {
  const { state, toggleDarkMode, notifications, markNotificationAsRead, updateBalance, addTransaction, toggleSidebar } = useAppContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  
  const unreadNotifications = notifications.filter(n => !n.isRead);

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (amount > 0) {
      updateBalance(amount);
      addTransaction({
        userId: state.user!.id,
        type: 'deposit',
        amount: amount,
        status: 'completed',
        timestamp: new Date(),
        description: 'Wallet deposit',
        hash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
      });
      setDepositAmount('');
      alert('Deposit successful!');
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && state.user && amount <= state.user.balance) {
      updateBalance(-amount);
      addTransaction({
        userId: state.user.id,
        type: 'withdrawal',
        amount: amount,
        status: 'completed',
        timestamp: new Date(),
        description: 'Withdrawal to external wallet',
        hash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
      });
      setWithdrawAmount('');
      alert('Withdrawal successful!');
    }
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-dark-700/95 backdrop-blur-lg border-b border-dark-600">
      <div className="container mx-auto px-4 lg:px-6 py-3 flex items-center justify-between">
        <div className="w-full flex justify-between items-center">
          {/* Mobile menu toggle */}
          <div className="lg:hidden">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-lg bg-dark-600/50 text-white hover:bg-dark-600 transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
          
          {/* Logo for mobile */}
          <div className="lg:hidden flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center mr-2">
              <Ticket size={16} className="text-white" />
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary-400 to-secondary-400 text-transparent bg-clip-text">
              CryptoLotto
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
          {/* Balance chip */}
          <div 
            className="hidden md:flex items-center bg-dark-600/80 rounded-full py-1.5 px-3 text-white cursor-pointer hover:bg-dark-600 transition-colors"
            onClick={() => setShowWallet(!showWallet)}
          >
            <Wallet size={16} className="mr-2 text-accent-400" />
            <span className="font-medium">{formatCurrency(state.user?.balance || 0)} ETH</span>
          </div>
          
          {/* Notifications */}
          <div className="relative">
            <button 
              className="p-2 rounded-full hover:bg-dark-600/50 text-gray-300 hover:text-white transition-colors"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />
              {unreadNotifications.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-error-500 rounded-full">
                  {unreadNotifications.length}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto">
                <Card variant="glass" padding="none" className="border border-dark-600">
                  <div className="p-4 border-b border-dark-600">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-white">Notifications</h3>
                      <button 
                        onClick={() => setShowNotifications(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-400">
                        No notifications
                      </div>
                    ) : (
                      notifications.slice(0, 10).map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-dark-600 last:border-b-0 cursor-pointer hover:bg-dark-600/30 ${
                            !notification.isRead ? 'bg-primary-900/20' : ''
                          }`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <p className="text-sm text-white mb-1">{notification.message}</p>
                          <p className="text-xs text-gray-400">{formatDate(notification.timestamp)}</p>
                        </div>
                      ))
                    )}
                  </div>
                </Card>
              </div>
            )}
          </div>
          </div>
          
          {/* Theme toggle */}
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-dark-600/50 text-gray-300 hover:text-white transition-colors"
          >
            {state.darkMode ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>
          
          {/* User profile */}
          {state.user && (
            <div className="flex items-center">
              <div className="mr-3 hidden md:block text-right">
                <p className="text-sm font-medium text-white">{state.user.username}</p>
                <p className="text-xs text-gray-400">{state.user.walletAddress}</p>
              </div>
              <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-primary-500">
                {state.user.avatar ? (
                  <img 
                    src={state.user.avatar} 
                    alt={state.user.username} 
                    className="h-full w-full object-cover" 
                  />
                ) : (
                  <div className="h-full w-full bg-primary-700 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {state.user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Wallet modal */}
      {showWallet && (
        <div className="absolute right-4 top-16 w-80 z-30">
          <Card variant="glass" className="border border-dark-600">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-white">Wallet Management</h3>
              <button 
                onClick={() => setShowWallet(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mb-4 p-3 bg-dark-800/50 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-1">Current Balance</p>
                <p className="text-2xl font-bold text-accent-400">
                  {formatCurrency(state.user?.balance || 0)} ETH
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Deposit Amount (ETH)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="flex-1 px-3 py-2 bg-dark-600 border border-dark-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                    placeholder="0.00"
                  />
                  <Button
                    variant="success"
                    size="sm"
                    onClick={handleDeposit}
                    disabled={!depositAmount || parseFloat(depositAmount) <= 0}
                    icon={<Plus size={14} />}
                  >
                    Deposit
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Withdraw Amount (ETH)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    max={state.user?.balance || 0}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="flex-1 px-3 py-2 bg-dark-600 border border-dark-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                    placeholder="0.00"
                  />
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={handleWithdraw}
                    disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > (state.user?.balance || 0)}
                    icon={<Minus size={14} />}
                  >
                    Withdraw
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </header>
  );
};