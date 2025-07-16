// src/data/mockData.ts

import { User, Lottery, Transaction, Notification, Wallet } from '../types';

// کیف پول داخلی کاربر
const mockWallet: Wallet = {
  userId: 'user1',
  balances: {
    solana: 12.4,
    tron: 45.8,
    bsc: 78.0,
  },
};

// کاربر نمونه
export const mockUser: User = {
  id: 'user1',
  username: 'demoUser',
  balance: 0, // فیلد قدیمی
  wallet: mockWallet,
  lotteryWon: 3,
  lotteryCreated: 2,
};

// یک قرعه‌کشی واقعی USDT روی سولانا
export const mockLotteries: Lottery[] = [
  {
    id: 'lottery1',
    title: 'Daily USDT Draw',
    description: 'Enter the daily draw to win USDT!',
    type: 'daily',
    category: 'daily',
    status: 'active',
    visibility: 'public',
    creatorId: 'admin',
    creatorName: 'Admin',
    prizePool: 100,
    ticketPrice: 5,
    ticketsSold: 20,
    maxTickets: 100,
    startDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 6 * 60 * 60 * 1000),
    currency: 'USDT',
    network: 'solana',
    winnerNames: [],
  },
];

// تراکنش‌های کاربر
export const mockTransactions: Transaction[] = [
  {
    id: 'tx1',
    userId: 'user1',
    amount: 5,
    type: 'ticketPurchase',
    lotteryId: 'lottery1',
    network: 'solana',
    currency: 'USDT',
    timestamp: new Date(),
  },
];

// نوتیفیکیشن‌ها
export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    userId: 'user1',
    message: 'You successfully entered Daily USDT Draw',
    timestamp: new Date(),
    read: false,
  },
];

// لیدربرد
export const mockLeaderboard = [
  {
    id: '1',
    username: 'winner123',
    avatar: '/avatars/user1.png',
    winnings: 250,
    lotteryWon: 'Daily USDT Draw',
  },
];
