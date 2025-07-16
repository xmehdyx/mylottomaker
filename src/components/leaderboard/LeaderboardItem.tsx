import React from 'react';
import { Trophy } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

interface LeaderboardItemProps {
  position: number;
  username: string;
  avatar?: string;
  winnings: number;
  lotteryWon: number;
}

export const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  position,
  username,
  avatar,
  winnings,
  lotteryWon,
}) => {
  const getBadgeColor = () => {
    switch (position) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800';
      case 3:
        return 'bg-gradient-to-r from-amber-700 to-amber-800 text-amber-100';
      default:
        return 'bg-dark-600 text-gray-300';
    }
  };

  const isTopThree = position <= 3;

  return (
    <div className={`
      flex items-center p-4 rounded-lg transition-transform duration-200
      ${isTopThree ? 'bg-dark-600/50 hover:bg-dark-600/80' : 'hover:bg-dark-700/50'}
    `}>
      <div className={`
        flex items-center justify-center h-8 w-8 rounded-full font-bold text-sm mr-4
        ${getBadgeColor()}
      `}>
        {position}
      </div>
      
      <div className="flex items-center flex-1">
        <div className="h-10 w-10 rounded-full overflow-hidden mr-3 border-2 border-dark-600">
          {avatar ? (
            <img 
              src={avatar} 
              alt={username} 
              className="h-full w-full object-cover" 
            />
          ) : (
            <div className="h-full w-full bg-primary-700 flex items-center justify-center">
              <span className="text-white font-medium">
                {username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        
        <div>
          <p className="font-medium text-white">{username}</p>
          <p className="text-sm text-gray-400">
            {lotteryWon} {lotteryWon === 1 ? 'lottery' : 'lotteries'} won
          </p>
        </div>
      </div>
      
      <div className="text-right">
        <div className="flex items-center justify-end font-bold text-accent-400">
          <Trophy size={16} className="mr-1" />
          <span>{formatCurrency(winnings)} ETH</span>
        </div>
      </div>
    </div>
  );
};