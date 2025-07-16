```ts
// شبکه‌های USDT
export type Network = 'solana' | 'tron' | 'bsc';

// کیف‌پول داخلی هر کاربر
export interface Wallet {
  network: Network;
  address: string;
  balance: number; // موجودی USDT
}

// گسترش User
export interface User {
  id: string;
  username: string;
  email?: string;
  wallets: Wallet[];      // ← این خط را اضافه کن
  lotteryWon: number;
  lotteryCreated: number;
}
```
