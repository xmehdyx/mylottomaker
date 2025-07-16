import { User, Lottery, Transaction, Notification } from '../types';

export const mockUser: User = {
  id: '',
  username: '',
  balance: 0,
  lotteryWon: 0,
  lotteryCreated: 0,
};

export const mockLotteries: Lottery[] = [
  {
    id: '1',
    title: '',
    description: '',
    type: 'daily',
    category: 'daily',
    status: 'active',
    visibility: 'public',
    creatorId: '',
    creatorName: '',
    prizePool: 0,
    ticketPrice: 0,
    ticketsSold: 0,
    maxTickets: 0,
    startDate: new Date(),
    endDate: new Date(),
    winnerNames: [],
  },
];

export const mockTransactions: Transaction[] = [];

export const mockNotifications: Notification[] = [];
