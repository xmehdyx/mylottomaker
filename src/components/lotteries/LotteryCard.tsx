import React, { useState } from 'react';
import { Calendar, Clock, Coins, Users, ArrowRight, Ticket } from 'lucide-react';
import { Lottery } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { formatTimeLeft, formatCurrency, getProgressValue } from '../../utils/helpers';
import { useAppContext } from '../../context/AppContext';
import { LotteryModal } from './LotteryModal';

interface LotteryCardProps {
  lottery: Lottery;
}

export const LotteryCard: React.FC<LotteryCardProps> = ({ lottery }) => {
  const { purchaseTicket, state } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  
  const timeLeft = formatTimeLeft(lottery.endDate);
  const isCompleted = lottery.status === 'completed';
  const progress = getProgressValue(lottery.ticketsSold, lottery.maxTickets);
  
  const categoryColors = {
    daily: 'from-blue-500/20 to-blue-600/20 text-blue-400',
    weekly: 'from-purple-500/20 to-purple-600/20 text-purple-400',
    monthly: 'from-pink-500/20 to-pink-600/20 text-pink-400',
    yearly: 'from-amber-500/20 to-amber-600/20 text-amber-400',
    custom: 'from-emerald-500/20 to-emerald-600/20 text-emerald-400',
  };
  
  const categoryColor = categoryColors[lottery.category as keyof typeof categoryColors];

  const handleQuickPurchase = async () => {
    if (!state.user || isCompleted) return;
    
    if (state.user.balance < lottery.ticketPrice) {
      alert('Insufficient balance to purchase ticket');
      return;
    }

    setPurchasing(true);
    const success = await purchaseTicket(lottery.id, 1);
    setPurchasing(false);
    
    if (success) {
      alert('Ticket purchased successfully!');
    } else {
      alert('Failed to purchase ticket');
    }
  };
  
  return (
    <>
      <Card 
        variant="glass" 
        padding="none" 
        hover={true}
        className="overflow-hidden transition-all duration-300 h-full"
      >
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mb-2 bg-gradient-to-r ${categoryColor}`}>
                {lottery.category.charAt(0).toUpperCase() + lottery.category.slice(1)}
              </div>
              <h3 className="text-lg font-semibold text-white">{lottery.title}</h3>
            </div>
            {lottery.type === 'user-generated' && (
              <div className="flex items-center text-xs text-gray-400">
                <span>Created by</span>
                <span className="ml-1 font-medium text-secondary-400">{lottery.creatorName}</span>
              </div>
            )}
          </div>
          
          <p className="text-sm text-gray-300 mb-4">{lottery.description}</p>
          
          <div className="mb-4">
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-gray-400">Tickets sold</span>
              <span className="text-white font-medium">
                {lottery.ticketsSold}{lottery.maxTickets ? `/${lottery.maxTickets}` : ''}
              </span>
            </div>
            <div className="w-full bg-dark-600 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-dark-800/50 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <Coins size={14} className="mr-1 text-accent-400" />
                <span className="text-xs text-gray-400">Prize Pool</span>
              </div>
              <p className="text-sm font-medium text-white">
                {formatCurrency(lottery.prizePool)} ETH
              </p>
            </div>
            
            <div className="bg-dark-800/50 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <Users size={14} className="mr-1 text-primary-400" />
                <span className="text-xs text-gray-400">Participants</span>
              </div>
              <p className="text-sm font-medium text-white">
                {Math.floor(lottery.ticketsSold * 0.7)} users
              </p>
            </div>
            
            {!isCompleted ? (
              <div className="bg-dark-800/50 rounded-lg p-3">
                <div className="flex items-center mb-1">
                  <Clock size={14} className="mr-1 text-secondary-400" />
                  <span className="text-xs text-gray-400">Time Left</span>
                </div>
                <p className="text-sm font-medium text-white">{timeLeft}</p>
              </div>
            ) : (
              <div className="bg-dark-800/50 rounded-lg p-3">
                <div className="flex items-center mb-1">
                  <Users size={14} className="mr-1 text-success-400" />
                  <span className="text-xs text-gray-400">Winner</span>
                </div>
                <p className="text-sm font-medium text-success-400">
                  {lottery.winnerNames?.[0] || 'Unknown'}
                </p>
              </div>
            )}
            
            <div className="bg-dark-800/50 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <Coins size={14} className="mr-1 text-accent-400" />
                <span className="text-xs text-gray-400">Ticket Price</span>
              </div>
              <p className="text-sm font-medium text-white">
                {formatCurrency(lottery.ticketPrice)} ETH
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-dark-800 p-4 border-t border-dark-600">
          <div className="flex gap-2">
            <Button 
              variant={isCompleted ? 'ghost' : 'accent'} 
              size="md" 
              fullWidth={true}
              icon={isCompleted ? <ArrowRight size={16} /> : <Ticket size={16} />}
              iconPosition="right"
              onClick={() => setShowModal(true)}
              disabled={isCompleted}
            >
              {isCompleted ? 'View Results' : 'View Details'}
            </Button>
            
            {!isCompleted && (
              <Button 
                variant="primary" 
                size="md"
                onClick={handleQuickPurchase}
                loading={purchasing}
                disabled={!state.user || state.user.balance < lottery.ticketPrice}
              >
                Quick Buy
              </Button>
            )}
          </div>
        </div>
      </Card>

      {showModal && (
        <LotteryModal 
          lottery={lottery} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
};