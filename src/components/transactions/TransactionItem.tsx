import React from 'react';
import { 
  ArrowDown, 
  ArrowUp, 
  CreditCard, 
  Trophy, 
  PlusCircle,
  ExternalLink 
} from 'lucide-react';
import { Transaction } from '../../types';
import { formatDate, formatCurrency } from '../../utils/helpers';

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const getIcon = () => {
    switch (transaction.type) {
      case 'deposit':
        return <ArrowDown size={18} className="text-success-500" />;
      case 'withdrawal':
        return <ArrowUp size={18} className="text-warning-500" />;
      case 'ticket-purchase':
        return <CreditCard size={18} className="text-primary-500" />;
      case 'lottery-win':
        return <Trophy size={18} className="text-accent-500" />;
      case 'lottery-creation':
        return <PlusCircle size={18} className="text-secondary-500" />;
      default:
        return <ArrowDown size={18} className="text-gray-500" />;
    }
  };

  const getAmountColor = () => {
    switch (transaction.type) {
      case 'deposit':
      case 'lottery-win':
        return 'text-success-500';
      case 'withdrawal':
      case 'ticket-purchase':
      case 'lottery-creation':
        return 'text-warning-500';
      default:
        return 'text-gray-300';
    }
  };

  const getAmountPrefix = () => {
    switch (transaction.type) {
      case 'deposit':
      case 'lottery-win':
        return '+';
      case 'withdrawal':
      case 'ticket-purchase':
      case 'lottery-creation':
        return '-';
      default:
        return '';
    }
  };

  return (
    <div className="border-b border-dark-600 py-4 last:border-b-0">
      <div className="flex items-center">
        <div className="mr-4 h-10 w-10 rounded-full bg-dark-600 flex items-center justify-center">
          {getIcon()}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between">
            <p className="font-medium text-white">
              {transaction.description}
            </p>
            <p className={`font-bold ${getAmountColor()}`}>
              {getAmountPrefix()}{formatCurrency(transaction.amount)} ETH
            </p>
          </div>
          
          <div className="flex justify-between mt-1">
            <p className="text-sm text-gray-400">
              {formatDate(transaction.timestamp)}
            </p>
            
            {transaction.hash && (
              <a 
                href={`https://etherscan.io/tx/${transaction.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-400 hover:text-primary-300 flex items-center"
              >
                <span className="mr-1">View on Etherscan</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};