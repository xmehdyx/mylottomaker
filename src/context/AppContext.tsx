import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppState, User, Lottery, Transaction, Notification } from '../types';
import {
  mockUser,
  mockLotteries,
  mockTransactions,
  mockNotifications,
} from '../data/mockData';

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  darkMode: true,
  sidebarOpen: false,
};

interface AppContextType {
  state: AppState;
  lotteries: Lottery[];
  transactions: Transaction[];
  notifications: Notification[];
  login: (user: User) => void;
  logout: () => void;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  purchaseTicket: (lotteryId: string, quantity: number) => Promise<boolean>;
  createLottery: (lotteryData: Partial<Lottery>) => Promise<boolean>;
  updateBalance: (amount: number) => void;
  markNotificationAsRead: (notificationId: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const AppContext = createContext<AppContextType>({
  state: initialState,
  lotteries: [],
  transactions: [],
  notifications: [],
  login: () => {},
  logout: () => {},
  toggleDarkMode: () => {},
  toggleSidebar: () => {},
  purchaseTicket: async () => false,
  createLottery: async () => false,
  updateBalance: () => {},
  markNotificationAsRead: () => {},
  addTransaction: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);
  const [lotteries, setLotteries] = useState<Lottery[]>(mockLotteries);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  // Load dark mode and auto-login mock user
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode !== null) {
      setState((prev) => ({ ...prev, darkMode: storedDarkMode === 'true' }));
    }

    setState((prev) => ({
      ...prev,
      user: mockUser,
      isAuthenticated: true,
    }));
  }, []);

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', state.darkMode.toString());
  }, [state.darkMode]);

  const login = (user: User) => {
    setState((prev) => ({ ...prev, user, isAuthenticated: true }));
  };

  const logout = () => {
    setState((prev) => ({ ...prev, user: null, isAuthenticated: false }));
  };

  const toggleDarkMode = () => {
    setState((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const toggleSidebar = () => {
    setState((prev) => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
  };

  const purchaseTicket = async (lotteryId: string, quantity: number = 1): Promise<boolean> => {
    const lottery = lotteries.find((l) => l.id === lotteryId);
    if (!lottery || !state.user) return false;

    const totalCost = lottery.ticketPrice * quantity;
    if (state.user.wallet.usdt < totalCost) return false;

    // Update balance
    setState((prev) => ({
      ...prev,
      user: {
        ...prev.user!,
        wallet: {
          ...prev.user!.wallet,
          usdt: prev.user!.wallet.usdt - totalCost,
        },
      },
    }));

    // Update lottery
    setLotteries((prev) =>
      prev.map((l) =>
        l.id === lotteryId
          ? {
              ...l,
              ticketsSold: l.ticketsSold + quantity,
              prizePool: l.prizePool + totalCost,
            }
          : l
      )
    );

    // Add transaction
    const transaction: Transaction = {
      id: Date.now().toString(),
      userId: state.user.id,
      type: 'ticket-purchase',
      amount: totalCost,
      status: 'completed',
      timestamp: new Date(),
      description: `Purchased ${quantity} ticket${quantity > 1 ? 's' : ''} for ${lottery.title}`,
      lotteryId,
      hash: `0x${Math.random().toString(16).slice(2, 8)}`,
    };
    setTransactions((prev) => [transaction, ...prev]);

    return true;
  };

  const createLottery = async (data: Partial<Lottery>): Promise<boolean> => {
    if (!state.user) return false;
    const fee = 0.01;

    if (state.user.wallet.usdt < fee) return false;

    const newLottery: Lottery = {
      id: Date.now().toString(),
      title: data.title || '',
      description: data.description || '',
      type: 'user-generated',
      category: data.category || 'custom',
      status: 'active',
      visibility: data.visibility || 'public',
      creatorId: state.user.id,
      creatorName: state.user.username,
      prizePool: 0,
      ticketPrice: data.ticketPrice || 1,
      ticketsSold: 0,
      maxTickets: data.maxTickets || 100,
      startDate: new Date(),
      endDate: data.endDate || new Date(Date.now() + 7 * 86400000),
      winnerNames: [],
    };

    setState((prev) => ({
      ...prev,
      user: {
        ...prev.user!,
        wallet: {
          ...prev.user!.wallet,
          usdt: prev.user!.wallet.usdt - fee,
        },
        lotteryCreated: prev.user!.lotteryCreated + 1,
      },
    }));

    setLotteries((prev) => [newLottery, ...prev]);

    return true;
  };

  const updateBalance = (amount: number) => {
    setState((prev) => ({
      ...prev,
      user: {
        ...prev.user!,
        wallet: {
          ...prev.user!.wallet,
          usdt: prev.user!.wallet.usdt + amount,
        },
      },
    }));
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
    );
  };

  const addTransaction = (data: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...data,
      id: Date.now().toString(),
    };
    setTransactions((prev) => [transaction, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        lotteries,
        transactions,
        notifications,
        login,
        logout,
        toggleDarkMode,
        toggleSidebar,
        purchaseTicket,
        createLottery,
        updateBalance,
        markNotificationAsRead,
        addTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
