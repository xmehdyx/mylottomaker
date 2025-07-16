import { User, Lottery, Transaction, Notification } from '../types';

export const mockUser: User = {
  id: 'u1',
  username: 'guest',
  balance: 1.5,
  lotteryWon: 0,
  lotteryCreated: 0,
};

export const mockLotteries: Lottery[] = [
  {
    id: '1',
    title: 'Daily ETH Draw',
    description: 'Enter the daily draw to win ETH!',
    type: 'standard',
    category: 'daily',
    status: 'active',
    visibility: 'public',
    creatorId: 'admin',
    creatorName: 'Admin',
    prizePool: 0.3,
    ticketPrice: 0.05,
    ticketsSold: 6,
    maxTickets: 100,
    startDate: new Date(Date.now() - 3600 * 1000),
    endDate: new Date(Date.now() + 6 * 3600 * 1000),
    winnerNames: [],
  },
];

export const mockTransactions: Transaction[] = [];

export const mockNotifications: Notification[] = [];

export const mockLeaderboard = [
  {
    id: 'w1',
    username: 'winner123',
    avatar: '/avatars/avatar1.png',
    winnings: 2.5,
    lotteryWon: 'Daily ETH Draw',
  },
  {
    id: 'w2',
    username: 'luckyUser',
    avatar: '/avatars/avatar2.png',
    winnings: 1.2,
    lotteryWon: 'Weekly Mega Draw',
  },
  {
    id: 'w3',
    username: 'cryptoQueen',
    avatar: '/avatars/avatar3.png',
    winnings: 0.95,
    lotteryWon: 'Monthly Jackpot',
  },
];
