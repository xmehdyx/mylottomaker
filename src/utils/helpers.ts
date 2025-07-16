import { LotteryFilters } from '../types';

/**
 * Format a date to local string
 */
export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format time left until a date
 */
export const formatTimeLeft = (endDate: Date): string => {
  const now = new Date().getTime();
  const end = new Date(endDate).getTime();
  const distance = end - now;
  
  if (distance <= 0) {
    return 'Ended';
  }
  
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) {
    return `${days}d ${hours}h remaining`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m remaining`;
  } else {
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return `${minutes}m ${seconds}s remaining`;
  }
};

/**
 * Format currency with 2 decimal places
 */
export const formatCurrency = (value: number): string => {
  return value.toFixed(2);
};

/**
 * Get progress value for progress bar
 */
export const getProgressValue = (current: number, max?: number): number => {
  if (!max) return 50; // Default to 50% if no max is provided
  return Math.min(100, (current / max) * 100);
};

/**
 * Filter lotteries based on filters
 */
export const filterLotteries = (lotteries: any[], filters: LotteryFilters) => {
  return lotteries.filter(lottery => {
    if (filters.type && filters.type !== 'all' && lottery.type !== filters.type) return false;
    if (filters.category && filters.category !== 'all' && lottery.category !== filters.category) return false;
    if (filters.status && filters.status !== 'all' && lottery.status !== filters.status) return false;
    if (filters.visibility && filters.visibility !== 'all' && lottery.visibility !== filters.visibility) return false;
    return true;
  });
};

/**
 * Sort lotteries based on sortBy and sortOrder
 */
export const sortLotteries = (lotteries: any[], sortBy?: string, sortOrder?: 'asc' | 'desc') => {
  if (!sortBy) return lotteries;
  
  return [...lotteries].sort((a, b) => {
    const asc = sortOrder === 'asc' ? 1 : -1;
    
    switch (sortBy) {
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
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};