// src/context/AppContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Lottery {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'standard' | 'user-generated';
  status: 'active' | 'ended' | 'cancelled';
  visibility: 'public' | 'private';
  creatorId: string;
  creatorName: string;
  prizePool: number;
  ticketPrice: number;
  ticketsSold: number;
  maxTickets: number;
  startDate: Date;
  endDate: Date;
  currency: string;
  network: string;
  winnerNames: string[];
}

export interface User {
  id: string;
  username: string;
  balance: number;
  email?: string;
}

interface AppState {
  user: User | null;
  lotteries: Lottery[];
}

interface AppContextProps extends AppState {
  createLottery: (lotteryData: Partial<Lottery>) => Promise<boolean>;
}

const mockUser: User = {
  id: 'user_123',
  username: 'Mehdy',
  balance: 10, // فرض موجودی اولیه کاربر 10 USDT
  email: 'mehdy@example.com',
};

const mockLotteries: Lottery[] = [
  {
    id: 'lottery_1',
    title: 'Standard Lottery 1',
    description: 'This is a standard lottery',
    category: 'custom',
    type: 'standard',
    status: 'active',
    visibility: 'public',
    creatorId: 'admin',
    creatorName: 'Admin',
    prizePool: 100,
    ticketPrice: 1,
    ticketsSold: 50,
    maxTickets: 100,
    startDate: new Date(Date.now() - 3600 * 1000 * 24),
    endDate: new Date(Date.now() + 3600 * 1000 * 48),
    currency: 'USDT',
    network: 'solana',
    winnerNames: [],
  },
  {
    id: 'lottery_2',
    title: 'User Lottery 1',
    description: 'User created lottery',
    category: 'custom',
    type: 'user-generated',
    status: 'active',
    visibility: 'private',
    creatorId: 'user_123',
    creatorName: 'Mehdy',
    prizePool: 50,
    ticketPrice: 0.5,
    ticketsSold: 30,
    maxTickets: 100,
    startDate: new Date(Date.now() - 3600 * 1000 * 12),
    endDate: new Date(Date.now() + 3600 * 1000 * 36),
    currency: 'USDT',
    network: 'solana',
    winnerNames: [],
  },
];

const initialState: AppState = {
  user: mockUser,
  lotteries: mockLotteries,
};

const AppContext = createContext<AppContextProps>({
  ...initialState,
  createLottery: async () => false,
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(initialState.user);
  const [lotteries, setLotteries] = useState<Lottery[]>(initialState.lotteries);

  const createLottery = async (lotteryData: Partial<Lottery>): Promise<boolean> => {
    try {
      const newLottery: Lottery = {
        id: `lottery_${Date.now()}`,
        title: lotteryData.title || 'Untitled Lottery',
        description: lotteryData.description || '',
        category: lotteryData.category || 'custom',
        type: lotteryData.type || 'user-generated',
        status: 'active',
        visibility: lotteryData.visibility || 'public',
        creatorId: user?.id || 'unknown',
        creatorName: user?.username || 'Unknown',
        prizePool: (lotteryData.ticketPrice || 0) * (lotteryData.maxTickets || 0),
        ticketPrice: lotteryData.ticketPrice || 0,
        ticketsSold: 0,
        maxTickets: lotteryData.maxTickets || 100,
        startDate: new Date(),
        endDate: lotteryData.endDate || new Date(Date.now() + 24 * 60 * 60 * 1000),
        currency: lotteryData.currency || 'USDT',
        network: lotteryData.network || 'solana',
        winnerNames: [],
      };

      setLotteries((prev) => [...prev, newLottery]);

      // در صورت نیاز می‌تونی setUser و یا بقیه state ها رو هم اینجا به‌روزرسانی کنی

      return true;
    } catch (error) {
      console.error('Error creating lottery:', error);
      return false;
    }
  };

  return (
    <AppContext.Provider value={{ user, lotteries, createLottery }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
