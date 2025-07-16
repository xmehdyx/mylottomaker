// شبکه‌های پشتیبانی‌شده
export type Network = 'solana' | 'tron' | 'bsc';

// ساختار یک کیف‌پول در هر شبکه
export interface Wallet {
  network: Network;
  address: string;       // آدرس on‑chain
  balance: number;       // موجودی USDT
}

// گسترش نوع User برای نگه‌داشتن کیف‌پول‌های داخلی
export interface User {
  id: string;
  username: string;
  email?: string;
  wallets: Wallet[];     // کیف‌پول‌های درون‌برنامه‌ای
  lotteryWon: number;
  lotteryCreated: number;
}

