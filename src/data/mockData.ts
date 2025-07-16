// src/data/mockData.ts

import { User, Lottery, Transaction, Notification, Wallet, Network } from '../types';

// نمونه کیف پول برای کاربر آزمایشی
const mockWallet: Wallet = {
  userId: 'user1',
  balances: {
    solana: 50,
    tron: 30,
    bsc: 100,
  },
};

// کاربر آزمایشی
export const mockUser: User = {
  id: 'user1',
  username: 'demoUser',
  balance: 0, // legacy balance, می‌تونه صفر باشه
  wallet: mockWallet,
  lotteryWon: 2,
  lotteryCreated: 1,
};

// نمونه قرعه‌کشی
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
    startDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 ساعت پیش
    endDate: new Date(Date.now() + 6 * 60 * 60 * 1000),   // 6 ساعت بعد
    currency: 'USDT',
    network: 'solana',
    winnerNames: [],
  },
];

// تراکنش‌ها
export const mockTransactions: Transaction[] = [];

// نوتیفیکیشن‌ها
export const mockNotifications: Notification[] = [];

// لیدربرد آزمایشی
export const mockLeaderboard = [
  {
    id: '1',
    username: 'winner123',
    avatar: '/avatars/user1.png',
    winnings: 250,
    lotteryWon: 'Daily USDT Draw',
  },
  {
    id: '2',
    username: 'luckyUser',
    avatar: '/avatars/user2.png',
    winnings: 120,
    lotteryWon: 'Weekly Mega Draw',
  },
  {
    id: '3',
    username: 'cryptoQueen',
    avatar: '/avatars/user3.png',
    winnings: 95,
    lotteryWon: 'Monthly Jackpot',
  },
];
