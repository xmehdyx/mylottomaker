// types.ts

// Supported networks for USDT
export type Network = 'solana' | 'tron' | 'bsc';

// Wallet interface
export interface Wallet {
  userId: string;
  balances: {
    [network in Network]: number;
  };
}

// User model
export interface User {
  id: string;
  username: string;
  balance: number; // Optional legacy ETH balance
  wallet: Wallet;
  lotteryWon: number;
  lotteryCreated: number;
}

// Lottery model
export interface Lottery {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'standard' | 'user-generated';
  category: string;
  status: 'active' | 'ended';
  visibility: 'public' | 'private';
  creatorId: string;
  creatorName: string;
  prizePool: number;
  ticketPrice: number;
  ticketsSold: number;
  maxTickets: number;
  startDate: Date;
  endDate: Date;
  currency?: string; // e.g. USDT
  network?: Network;
  winnerNames: string[];
}

// Transaction model
export interface Transaction {
  id: string;
  userId: string;
  type: 'ticket-purchase' | 'lottery-creation' | 'deposit' | 'withdraw';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  description: string;
  lotteryId?: string;
  hash?: string;
  network?: Network;
}

// Notification model
export interface Notification {
  id: string;
  userId: string;
  type: 'ticket-purchase' | 'lottery-creation' | 'general' | 'balance-update';
  message: string;
  isRead: boolean;
  timestamp: Date;
  lotteryId?: string;
}
