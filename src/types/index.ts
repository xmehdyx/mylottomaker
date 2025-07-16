export interface User {
  id: string;
  username: string;
  email: string;
  walletAddress: string;
  avatar?: string;
  createdAt: Date;
  balance: number;
  lotteryCreated: number;
  lotteryWon: number;
}

export interface Lottery {
  id: string;
  title: string;
  description: string;
  type: 'standard' | 'user-generated';
  category: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
  status: 'active' | 'completed' | 'cancelled';
  visibility: 'public' | 'private';
  creatorId?: string;
  creatorName?: string;
  prizePool: number;
  ticketPrice: number;
  ticketsSold: number;
  maxTickets?: number;
  startDate: Date;
  endDate: Date;
  winnerIds?: string[];
  winnerNames?: string[];
}

export interface Ticket {
  id: string;
  lotteryId: string;
  userId: string;
  purchaseDate: Date;
  ticketNumber: string;
  isWinner: boolean;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'ticket-purchase' | 'lottery-win' | 'lottery-creation';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  description: string;
  lotteryId?: string;
  hash?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'lottery-win' | 'lottery-result' | 'ticket-purchase' | 'lottery-ending-soon' | 'system';
  message: string;
  isRead: boolean;
  timestamp: Date;
  lotteryId?: string;
}

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  darkMode: boolean;
  sidebarOpen: boolean;
}

export interface LotteryFilters {
  type?: 'standard' | 'user-generated' | 'all';
  category?: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom' | 'all';
  status?: 'active' | 'completed' | 'cancelled' | 'all';
  visibility?: 'public' | 'private' | 'all';
  sortBy?: 'endDate' | 'prizePool' | 'ticketPrice' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}