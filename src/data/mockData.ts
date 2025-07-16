import { User, Lottery, Transaction, Notification, Wallet } from '../types';

// نمونه کیف پول برای کاربر دمو
const mockWallet: Wallet = {
  userId: 'user1',
  balances: {
    solana: 50, // 50 USDT روی Solana
    tron: 30,   // 30 USDT روی Tron
    bsc: 100,   // 100 USDT روی BSC
  },
};

// کاربر آزمایشی
export const mockUser: User = {
  id: 'user1',
  username: 'demoUser',
  balance: 0, // اگر از سیستم جدید کیف‌پول داخلی استفاده می‌کنی این فیلد فقط برای سازگاری نگه داشته شده
  wallet: mockWallet,
  lotteryWon: 2,
  lotteryCreated: 1,
};

// یک لاتاری نمونه
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
    startDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // دو ساعت پیش
    endDate: new Date(Date.now() + 6 * 60 * 60 * 1000),   // شش ساعت دیگه
    currency: 'USDT',
    network: 'solana',
    winnerNames: [],
  },
];

// تراکنش‌های تستی (در صورت نیاز)
export const mockTransactions: Transaction[] = [];

// نوتیفیکیشن‌ها (در صورت نیاز)
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
