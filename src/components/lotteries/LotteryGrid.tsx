import React from 'react';
import { Lottery, LotteryFilters } from '../../types';
import { LotteryCard } from './LotteryCard';

interface LotteryGridProps {
  lotteries: Lottery[];
  filters?: LotteryFilters;
  title?: string;
  emptyMessage?: string;
}

export const LotteryGrid: React.FC<LotteryGridProps> = ({
  lotteries,
  filters,
  title,
  emptyMessage = 'No lotteries available',
}) => {
  // Apply filters (basic implementation)
  const filteredLotteries = React.useMemo(() => {
    if (!filters) return lotteries;
    
    return lotteries.filter(lottery => {
      if (filters.type && filters.type !== 'all' && lottery.type !== filters.type) return false;
      if (filters.category && filters.category !== 'all' && lottery.category !== filters.category) return false;
      if (filters.status && filters.status !== 'all' && lottery.status !== filters.status) return false;
      if (filters.visibility && filters.visibility !== 'all' && lottery.visibility !== filters.visibility) return false;
      return true;
    });
  }, [lotteries, filters]);

  // Sort lotteries (basic implementation)
  const sortedLotteries = React.useMemo(() => {
    if (!filters?.sortBy) return filteredLotteries;
    
    return [...filteredLotteries].sort((a, b) => {
      const asc = filters.sortOrder === 'asc' ? 1 : -1;
      
      switch (filters.sortBy) {
        case 'endDate':
          return (new Date(a.endDate).getTime() - new Date(b.endDate).getTime()) * asc;
        case 'prizePool':
          return (a.prizePool - b.prizePool) * asc;
        case 'ticketPrice':
          return (a.ticketPrice - b.ticketPrice) * asc;
        case 'popularity':
          return (a.ticketsSold - b.ticketsSold) * asc;
        default:
          return 0;
      }
    });
  }, [filteredLotteries, filters?.sortBy, filters?.sortOrder]);

  return (
    <div>
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      
      {sortedLotteries.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedLotteries.map(lottery => (
            <LotteryCard key={lottery.id} lottery={lottery} />
          ))}
        </div>
      )}
    </div>
  );
};