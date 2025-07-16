import { Lottery, Notification, Transaction, User } from '../types';

export const mockUser: User = {
  id: '1',
  username: 'crypto_enthusiast',
  email: 'user@example.com',
  walletAddress: '0x1234...5678',
  avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
  createdAt: new Date('2023-01-15'),
  balance: 5.75,
  lotteryCreated: 3,
  lotteryWon: 2,
};

export const mockLotteries: Lottery[] = [
  {
    id: '1',
    title: 'Daily Crypto Jackpot',
    description: 'A daily draw with a guaranteed minimum prize of $100. Join now for your chance to win!',
    type: 'standard',
    category: 'daily',
    status: 'active',
    visibility: 'public',
    prizePool: 425.50,
    ticketPrice: 0.01,
    ticketsSold: 350,
    startDate: new Date(Date.now() - 86400000), // Yesterday
    endDate: new Date(Date.now() + 43200000), // 12 hours from now
  },
  {
    id: '2',
    title: 'Weekly Mega Millions',
    description: 'Our biggest weekly lottery with massive prizes and better odds!',
    type: 'standard',
    category: 'weekly',
    status: 'active',
    visibility: 'public',
    prizePool: 12750.25,
    ticketPrice: 0.05,
    ticketsSold: 2250,
    startDate: new Date(Date.now() - 345600000), // 4 days ago
    endDate: new Date(Date.now() + 345600000), // 4 days from now
  },
  {
    id: '3',
    title: 'Monthly Blockchain Bonanza',
    description: 'Once a month, one winner takes it all! Will you be the lucky one this month?',
    type: 'standard',
    category: 'monthly',
    status: 'active',
    visibility: 'public',
    prizePool: 45000,
    ticketPrice: 0.1,
    ticketsSold: 4200,
    startDate: new Date(Date.now() - 1296000000), // 15 days ago
    endDate: new Date(Date.now() + 1296000000), // 15 days from now
  },
  {
    id: '4',
    title: 'Yearly Grand Prize',
    description: 'Our annual lottery event with life-changing prizes. Don\'t miss your chance!',
    type: 'standard',
    category: 'yearly',
    status: 'active',
    visibility: 'public',
    prizePool: 500000,
    ticketPrice: 0.5,
    ticketsSold: 9500,
    startDate: new Date(Date.now() - 15768000000), // 6 months ago
    endDate: new Date(Date.now() + 15768000000), // 6 months from now
  },
  {
    id: '5',
    title: 'Crypto Club Private Draw',
    description: 'Exclusive lottery for crypto enthusiasts with amazing odds!',
    type: 'user-generated',
    category: 'custom',
    status: 'active',
    visibility: 'private',
    creatorId: '2',
    creatorName: 'crypto_whale',
    prizePool: 2500,
    ticketPrice: 0.25,
    ticketsSold: 95,
    maxTickets: 100,
    startDate: new Date(Date.now() - 172800000), // 2 days ago
    endDate: new Date(Date.now() + 172800000), // 2 days from now
  },
  {
    id: '6',
    title: 'NFT Collectors Lottery',
    description: 'Special lottery for NFT collectors with crypto prizes!',
    type: 'user-generated',
    category: 'custom',
    status: 'active',
    visibility: 'public',
    creatorId: '3',
    creatorName: 'nft_master',
    prizePool: 3750,
    ticketPrice: 0.15,
    ticketsSold: 210,
    startDate: new Date(Date.now() - 259200000), // 3 days ago
    endDate: new Date(Date.now() + 86400000), // 1 day from now
  },
  {
    id: '7',
    title: 'Last Week\'s Daily Draw',
    description: 'Previous daily lottery that has completed.',
    type: 'standard',
    category: 'daily',
    status: 'completed',
    visibility: 'public',
    prizePool: 150,
    ticketPrice: 0.01,
    ticketsSold: 165,
    startDate: new Date(Date.now() - 1123200000), // 13 days ago
    endDate: new Date(Date.now() - 1036800000), // 12 days ago
    winnerIds: ['1'],
    winnerNames: ['crypto_enthusiast'],
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: '1',
    type: 'deposit',
    amount: 2,
    status: 'completed',
    timestamp: new Date(Date.now() - 604800000), // 7 days ago
    description: 'Wallet deposit',
    hash: '0xabcd...1234',
  },
  {
    id: '2',
    userId: '1',
    type: 'ticket-purchase',
    amount: 0.05,
    status: 'completed',
    timestamp: new Date(Date.now() - 518400000), // 6 days ago
    description: 'Ticket purchase for Weekly Mega Millions',
    lotteryId: '2',
    hash: '0xefgh...5678',
  },
  {
    id: '3',
    userId: '1',
    type: 'lottery-win',
    amount: 150,
    status: 'completed',
    timestamp: new Date(Date.now() - 1036800000), // 12 days ago
    description: 'Win from Daily Crypto Jackpot',
    lotteryId: '7',
    hash: '0xijkl...9012',
  },
  {
    id: '4',
    userId: '1',
    type: 'lottery-creation',
    amount: 5,
    status: 'completed',
    timestamp: new Date(Date.now() - 259200000), // 3 days ago
    description: 'Created custom lottery',
    lotteryId: '6',
    hash: '0xmnop...3456',
  },
  {
    id: '5',
    userId: '1',
    type: 'withdrawal',
    amount: 100,
    status: 'completed',
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    description: 'Withdrawal to external wallet',
    hash: '0xqrst...7890',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'lottery-win',
    message: 'Congratulations! You won 150 ETH in Daily Crypto Jackpot!',
    isRead: true,
    timestamp: new Date(Date.now() - 1036800000), // 12 days ago
    lotteryId: '7',
  },
  {
    id: '2',
    userId: '1',
    type: 'ticket-purchase',
    message: 'Your ticket purchase for Weekly Mega Millions was successful.',
    isRead: true,
    timestamp: new Date(Date.now() - 518400000), // 6 days ago
    lotteryId: '2',
  },
  {
    id: '3',
    userId: '1',
    type: 'lottery-ending-soon',
    message: 'NFT Collectors Lottery is ending in 24 hours. Last chance to participate!',
    isRead: false,
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    lotteryId: '6',
  },
  {
    id: '4',
    userId: '1',
    type: 'system',
    message: 'Welcome to CryptoLotto! Start your winning journey today.',
    isRead: true,
    timestamp: new Date(Date.now() - 604800000), // 7 days ago
  },
];

export const mockLeaderboard = [
  { id: '5', username: 'crypto_king', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150', winnings: 25000, lotteryWon: 5 },
  { id: '6', username: 'lucky_trader', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150', winnings: 12500, lotteryWon: 3 },
  { id: '1', username: 'crypto_enthusiast', avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150', winnings: 8750, lotteryWon: 2 },
  { id: '7', username: 'blockchain_guru', avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150', winnings: 5000, lotteryWon: 1 },
  { id: '8', username: 'nft_collector', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', winnings: 3500, lotteryWon: 1 },
];