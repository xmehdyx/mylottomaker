import React, { useState } from 'react';
import { X, Ticket, Clock, Users, Coins, Trophy, Calendar } from 'lucide-react';
import { Lottery } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { formatTimeLeft, formatCurrency, formatDate } from '../../utils/helpers';
import { useAppContext } from '../../context/AppContext';

interface LotteryModalProps {
  lottery: Lottery;
  onClose: () => void;
}

export const LotteryModal: React.FC<LotteryModalProps> = ({ lottery, onClose }) => {
  const { purchaseTicket, state } = useAppContext();
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [purchasing, setPurchasing] = useState(false);

  const isCompleted = lottery.status === 'completed';
  const totalCost = lottery.ticketPrice * ticketQuantity;
  const canAfford = state.user ? state.user.balance >= totalCost : false;

  const handlePurchase = async () => {
    if (!state.user || !canAfford) return;

    setPurchasing(true);
    const success = await purchaseTicket(lottery.id, ticketQuantity);
    setPurchasing(false);
    
    if (success) {
      alert(`Successfully purchased ${ticketQuantity} ticket${ticketQuantity > 1 ? 's' : ''}!`);
      onClose();
    } else {
      alert('Failed to purchase tickets');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-dark-700 border-b border-dark-600 p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{lottery.title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-dark-600 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card variant="glass" padding="md">
              <div className="flex items-center mb-3">
                <Trophy size={20} className="mr-2 text-accent-400" />
                <h3 className="font-semibold text-white">Prize Pool</h3>
              </div>
              <p className="text-2xl font-bold text-accent-400">
                {formatCurrency(lottery.prizePool)} ETH
              </p>
            </Card>

            <Card variant="glass" padding="md">
              <div className="flex items-center mb-3">
                <Ticket size={20} className="mr-2 text-primary-400" />
                <h3 className="font-semibold text-white">Ticket Price</h3>
              </div>
              <p className="text-2xl font-bold text-primary-400">
                {formatCurrency(lottery.ticketPrice)} ETH
              </p>
            </Card>

            <Card variant="glass" padding="md">
              <div className="flex items-center mb-3">
                <Users size={20} className="mr-2 text-secondary-400" />
                <h3 className="font-semibold text-white">Tickets Sold</h3>
              </div>
              <p className="text-2xl font-bold text-secondary-400">
                {lottery.ticketsSold}{lottery.maxTickets ? `/${lottery.maxTickets}` : ''}
              </p>
            </Card>

            <Card variant="glass" padding="md">
              <div className="flex items-center mb-3">
                <Clock size={20} className="mr-2 text-warning-400" />
                <h3 className="font-semibold text-white">
                  {isCompleted ? 'Ended' : 'Time Left'}
                </h3>
              </div>
              <p className="text-2xl font-bold text-warning-400">
                {isCompleted ? 'Completed' : formatTimeLeft(lottery.endDate)}
              </p>
            </Card>
          </div>

          <Card variant="glass" padding="md" className="mb-6">
            <h3 className="font-semibold text-white mb-3">Description</h3>
            <p className="text-gray-300">{lottery.description}</p>
            
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Category:</span>
                <span className="ml-2 text-white capitalize">{lottery.category}</span>
              </div>
              <div>
                <span className="text-gray-400">Type:</span>
                <span className="ml-2 text-white capitalize">{lottery.type.replace('-', ' ')}</span>
              </div>
              <div>
                <span className="text-gray-400">Start Date:</span>
                <span className="ml-2 text-white">{formatDate(lottery.startDate)}</span>
              </div>
              <div>
                <span className="text-gray-400">End Date:</span>
                <span className="ml-2 text-white">{formatDate(lottery.endDate)}</span>
              </div>
            </div>

            {lottery.creatorName && (
              <div className="mt-4 pt-4 border-t border-dark-600">
                <span className="text-gray-400">Created by:</span>
                <span className="ml-2 text-secondary-400 font-medium">{lottery.creatorName}</span>
              </div>
            )}
          </Card>

          {!isCompleted && state.user && (
            <Card variant="glass" padding="md">
              <h3 className="font-semibold text-white mb-4">Purchase Tickets</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Number of Tickets
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                    className="w-10 h-10 bg-dark-600 hover:bg-dark-500 rounded-lg flex items-center justify-center text-white font-bold"
                  >
                    -
                  </button>
                  <span className="text-xl font-bold text-white w-12 text-center">
                    {ticketQuantity}
                  </span>
                  <button
                    onClick={() => setTicketQuantity(ticketQuantity + 1)}
                    className="w-10 h-10 bg-dark-600 hover:bg-dark-500 rounded-lg flex items-center justify-center text-white font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-dark-800/50 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Total Cost:</span>
                  <span className="text-xl font-bold text-accent-400">
                    {formatCurrency(totalCost)} ETH
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Your Balance:</span>
                  <span className={`font-medium ${canAfford ? 'text-success-400' : 'text-error-400'}`}>
                    {formatCurrency(state.user.balance)} ETH
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth={true}
                onClick={handlePurchase}
                loading={purchasing}
                disabled={!canAfford}
                icon={<Ticket size={18} />}
              >
                {canAfford 
                  ? `Purchase ${ticketQuantity} Ticket${ticketQuantity > 1 ? 's' : ''}`
                  : 'Insufficient Balance'
                }
              </Button>
            </Card>
          )}

          {isCompleted && lottery.winnerNames && (
            <Card variant="glass" padding="md">
              <h3 className="font-semibold text-white mb-4">Winner</h3>
              <div className="flex items-center">
                <Trophy size={20} className="mr-2 text-accent-400" />
                <span className="text-lg font-medium text-accent-400">
                  {lottery.winnerNames[0]}
                </span>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};