import { User, Lottery, Transaction, Notification } from '../types';

export const mockUser: User = {
  id: '',
  username: '',
  balance: 0,
  lotteryWon: 0,
  lotteryCreated: 0,
};

export const mockLotteries: Lottery[] = [];

export const mockTransactions: Transaction[] = [];

export const mockNotifications: Notification[] = [];

// آرایه خالی برای لیدربورد تا هیچ برنده‌ای نمایش داده نشود
export const mockLeaderboard: {
  id: string;
  username: string;
  avatar?: string;
  winnings: number;
  lotteryWon: string;
}[] = [];
