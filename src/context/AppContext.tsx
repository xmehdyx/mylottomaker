import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppState, User, Lottery, Transaction, Notification } from '../types';
import { mockUser, mockLotteries, mockTransactions, mockNotifications } from '../data/mockData';

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

  // Auto-login with mock user for demo
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode !== null) {
      setState((prev) => ({ ...prev, darkMode: storedDarkMode === 'true' }));
    }
    
    setState((prev) => ({ 
      ...prev, 
      user: mockUser,
      isAuthenticated: true 
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
    const lottery = lotteries.find(l => l.id === lotteryId);
    if (!lottery || !state.user) return false;

    const totalCost = lottery.ticketPrice * quantity;
    if (state.user.balance < totalCost) return false;

    // Update user balance
    setState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, balance: prev.user.balance - totalCost } : null
    }));

    // Update lottery tickets sold
    setLotteries(prev => prev.map(l => 
      l.id === lotteryId 
        ? { ...l, ticketsSold: l.ticketsSold + quantity, prizePool: l.prizePool + totalCost }
        : l
    ));

    // Add transaction
    const transaction: Transaction = {
      id: Date.now().toString(),
      userId: state.user.id,
      type: 'ticket-purchase',
      amount: totalCost,
      status: 'completed',
      timestamp: new Date(),
      description: `Purchased ${quantity} ticket${quantity > 1 ? 's' : ''} for ${lottery.title}`,
      lotteryId: lotteryId,
      hash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
    };
    setTransactions(prev => [transaction, ...prev]);

    // Add notification
    const notification: Notification = {
      id: Date.now().toString(),
      userId: state.user.id,
      type: 'ticket-purchase',
      message: `Successfully purchased ${quantity} ticket${quantity > 1 ? 's' : ''} for ${lottery.title}`,
      isRead: false,
      timestamp: new Date(),
      lotteryId: lotteryId,
    };
    setNotifications(prev => [notification, ...prev]);

    return true;
  };

  const createLottery = async (lotteryData: Partial<Lottery>): Promise<boolean> => {
    if (!state.user) return false;

    const creationFee = 0.01; // 0.01 ETH creation fee
    if (state.user.balance < creationFee) return false;

    const newLottery: Lottery = {
      id: Date.now().toString(),
      title: lotteryData.title || '',
      description: lotteryData.description || '',
      type: 'user-generated',
      category: lotteryData.category || 'custom',
      status: 'active',
      visibility: lotteryData.visibility || 'public',
      creatorId: state.user.id,
      creatorName: state.user.username,
      prizePool: 0,
      ticketPrice: lotteryData.ticketPrice || 0.1,
      ticketsSold: 0,
      maxTickets: lotteryData.maxTickets,
      startDate: new Date(),
      endDate: lotteryData.endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    // Update user balance and lottery count
    setState(prev => ({
      ...prev,
      user: prev.user ? { 
        ...prev.user, 
        balance: prev.user.balance - creationFee,
        lotteryCreated: prev.user.lotteryCreated + 1
      } : null
    }));

    // Add lottery
    setLotteries(prev => [newLottery, ...prev]);

    // Add transaction
    const transaction: Transaction = {
      id: Date.now().toString(),
      userId: state.user.id,
      type: 'lottery-creation',
      amount: creationFee,
      status: 'completed',
      timestamp: new Date(),
      description: `Created lottery: ${newLottery.title}`,
      lotteryId: newLottery.id,
      hash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
    };
    setTransactions(prev => [transaction, ...prev]);

    return true;
  };

  const updateBalance = (amount: number) => {
    setState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, balance: prev.user.balance + amount } : null
    }));
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    ));
  };

  const addTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(),
    };
    setTransactions(prev => [transaction, ...prev]);
  };

  return (
    <AppContext.Provider value={{ 
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
    }}>
      {children}
    </AppContext.Provider>
  );
};