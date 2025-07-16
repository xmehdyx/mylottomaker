import { User, Lottery, Transaction, Notification } from '../types';

export const mockUser: User = {
  id: 'user1',
  username: 'demoUser',
  balance: 1.5,
  lotteryWon: 2,
  lotteryCreated: 1,
};

export const mockLotteries: Lottery[] = [
  {
    id: 'lottery1',
    title: 'Daily ETH Draw',
    description: 'Enter the daily draw to win ETH!',
    type: 'daily',
    category: 'daily',
    status: 'active',
    visibility: 'public',
    creatorId: 'admin',
    creatorName: 'Admin',
    prizePool: 0.3,
    ticketPrice: 0.05,
    ticketsSold: 6,
    maxTickets: 100,
    startDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    endDate: new Date(Date.now() + 6 * 60 * 60 * 1000),   // in 6 hours
    winnerNames: [],
  },
];

export const mockTransactions: Transaction[] = [];

export const mockNotifications: Notification[] = [];

export const mockLeaderboard = [
  {
    id: '1',
    username: 'winner123',
    avatar: '/avatars/user1.png', // مسیر آواتار را در پروژه‌تان تنظیم کنید
    winnings: 2.5,
    lotteryWon: 'Daily ETH Draw',
  },
  {
    id: '2',
    username: 'luckyUser',
    avatar: '/avatars/user2.png',
    winnings: 1.2,
    lotteryWon: 'Weekly Mega Draw',
  },
  {
    id: '3',
    username: 'cryptoQueen',
    avatar: '/avatars/user3.png',
    winnings: 0.95,
    lotteryWon: 'Monthly Jackpot',
  },
];
