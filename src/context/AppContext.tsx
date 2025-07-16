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
  sidebarOpen: boolean;
}

interface AppContextProps extends AppState {
  toggleSidebar: () => void;
  createLottery: (data: Partial<Lottery>) => Promise<boolean>;
}

const mockUser: User = {
  id: 'user_123',
  username: 'Mehdy',
  balance: 10,
  email: 'mehdy@example.com',
};

const mockLotteries: Lottery[] = [
  // ... نمونه‌های اولیه
];

const initialState: AppState = {
  user: mockUser,
  lotteries: mockLotteries,
  sidebarOpen: false,
};

const AppContext = createContext<AppContextProps>({
  ...initialState,
  toggleSidebar: () => {},
  createLottery: async () => false,
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user] = useState<User | null>(initialState.user);
  const [lotteries, setLotteries] = useState<Lottery[]>(initialState.lotteries);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(initialState.sidebarOpen);

  const toggleSidebar = () => setSidebarOpen(open => !open);

  const createLottery = async (data: Partial<Lottery>) => {
    // ... پیاده‌سازی افزودن لاتاری
    return true;
  };

  return (
    <AppContext.Provider value={{ user, lotteries, sidebarOpen, toggleSidebar, createLottery }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
