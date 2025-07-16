// src/types/index.ts

// تعریف نوع کاربر
export interface User {
  id: string;
  username: string;
  balance: number;
  lotteryWon: number;
  lotteryCreated: number;
  walletAddress?: string; // مثلا برای کیف پول داخلی (اختیاری)
}

// تعریف نوع لاتاری
export interface Lottery {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'user-generated' | 'standard';
  category: string;
  status: 'active' | 'ended' | 'cancelled';
  visibility: 'public' | 'private';
  creatorId: string;
  creatorName: string;
  prizePool: number;
  ticketPrice: number;
  ticketsSold: number;
  maxTickets?: number;
  startDate: Date;
  endDate: Date;
  winnerNames: string[];
}

// تعریف نوع تراکنش
export interface Transaction {
  id: string;
  userId: string;
  type: 'ticket-purchase' | 'lottery-creation' | 'deposit' | 'withdrawal';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  description?: string;
  lotteryId?: string;
  hash?: string; // هش تراکنش بلاکچین
}

// تعریف نوع اعلان
export interface Notification {
  id: string;
  userId: string;
  type: 'ticket-purchase' | 'lottery-creation' | 'system';
  message: string;
  isRead: boolean;
  timestamp: Date;
  lotteryId?: string;
}
