import React, { createContext, useContext, useState } from 'react';
import {
  mockUser,
  mockLotteries,
  mockTransactions,
  mockNotifications,
} from '../data/mockData';
import { AppState, Lottery, User } from '../types';

interface AppContextProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  createLottery: (lottery: Partial<Lottery>) => Promise<boolean>;
}

const defaultState: AppState = {
  user: mockUser,
  lotteries: mockLotteries,
  transactions: mockTransactions,
  notifications: mockNotifications,
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(defaultState);

  const createLottery = async (lotteryData: Partial<Lottery>) => {
    try {
      const newLottery: Lottery = {
        id: `lottery-${Date.now()}`,
        creatorId: state.user?.id || 'unknown',
        creatorName: state.user?.username || 'Unknown',
        ticketsSold: 0,
        maxTickets: 100,
        startDate: new Date(),
        endDate: new Date(),
        status: 'active',
        visibility: 'public',
        prizePool: 0,
        ticketPrice: 1,
        winnerNames: [],
        currency: 'USDT',
        network: 'bsc',
        category: 'custom',
        type: 'user-generated',
        ...lotteryData,
      };

      setState(prev => ({
        ...prev,
        lotteries: [...prev.lotteries, newLottery],
      }));

      return true;
    } catch (err) {
      console.error('Failed to create lottery:', err);
      return false;
    }
  };

  return (
    <AppContext.Provider value={{ state, setState, createLottery }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
