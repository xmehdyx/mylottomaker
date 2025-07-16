import React from 'react';
import { Card } from '../components/common/Card';
import { LeaderboardItem } from '../components/leaderboard/LeaderboardItem';
import { Search } from 'lucide-react';
import { mockLeaderboard } from '../data/mockData';

export const LeaderboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Leaderboard</h1>
      
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search players..."
            className="w-full pl-10 pr-4 py-2.5 bg-dark-600 border border-dark-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>
      
      <Card variant="glass">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Top Winners</h2>
          <div className="text-sm text-gray-400">Updated daily</div>
        </div>
        
        <div className="space-y-3">
          {mockLeaderboard.map((winner, index) => (
            <LeaderboardItem
              key={winner.id}
              position={index + 1}
              username={winner.username}
              avatar={winner.avatar}
              winnings={winner.winnings}
              lotteryWon={winner.lotteryWon}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};