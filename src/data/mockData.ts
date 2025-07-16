```ts
import { User, Lottery, Transaction, Notification } from '../types';

export const mockUser: User = {
  id: '',
  username: '',
  email: '',
  wallets: [],         // ← خالی
  lotteryWon: 0,
  lotteryCreated: 0,
};

export const mockLotteries: Lottery[] = [];
export const mockTransactions: Transaction[] = [];
export const mockNotifications: Notification[] = [];
export const mockLeaderboard: any[] = [];
```
