import React, { useState } from 'react';
import Link from 'next/link'; // فرض Next.js برای روتینگ
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/common/Tabs';
import { LotteryGrid } from '../components/lotteries/LotteryGrid';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { ChevronRight, Trophy, Search, Filter, TrendingUp, Clock, Users } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

// فرمت کردن عدد با کاما و اضافه کردن واحد USDT
const formatUSDT = (num: number) =>
  num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' USDT';

export const HomePage: React.FC = () => {
  const { lotteries } = useAppContext();

  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [networkFilter, setNetworkFilter] = useState<'all' | 'solana' | 'tron' | 'bsc'>('all');

  // فیلتر بر اساس فعال بودن، جستجو، و شبکه
  const activeLotteries = lotteries.filter((lottery) => {
    if (lottery.status !== 'active') return false;
    if (!lottery.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (networkFilter !== 'all' && lottery.network !== networkFilter) return false;
    return true;
  });

  // دسته‌بندی براساس نوع قرعه‌کشی
  const standardLotteries = activeLotteries.filter(lottery => lottery.type === 'standard');
  const userLotteries = activeLotteries.filter(lottery => lottery.type === 'user-generated');

  // قرعه‌کشی‌هایی که تا 24 ساعت آینده تموم میشن (حداکثر 2تا)
  const endingSoonLotteries = activeLotteries
    .filter(lottery => {
      const timeLeft = new Date(lottery.endDate).getTime() - Date.now();
      return timeLeft > 0 && timeLeft <= 24 * 60 * 60 * 1000;
    })
    .slice(0, 2);

  // محاسبه کل جایزه‌ها و کل شرکت‌کننده‌ها
  const totalPrizePool = activeLotteries.reduce((sum, lottery) => sum + lottery.prizePool, 0);
  const highestPrizeLottery = activeLotteries.reduce(
    (max, lottery) => (lottery.prizePool > (max?.prizePool || 0) ? lottery : max),
    null as typeof lotteries[0] | null
  );
  const totalParticipants = activeLotteries.reduce((sum, lottery) => sum + lottery.ticketsSold, 0);

  return (
    <div>
      {/* بخش هِرو */}
      <div className="mb-8">
        <Card variant="glass" className="bg-gradient-to-r from-primary-900/60 to-dark-800 border-primary-800/30 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
                Win Big with Blockchain Transparency
              </h1>
              <p className="text-gray-300 mb-6">
                Join the most trusted crypto lottery platform. Enter daily, weekly, and monthly draws or create your own lottery events.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="accent" size="lg" icon={<ChevronRight size={18} />} iconPosition="right" onClick={() => setActiveTab('all')}>
                  Browse Lotteries
                </Button>
                <Button variant="ghost" size="lg" onClick={() => alert('How It Works: Smart contract-based crypto lotteries with transparent results.')}>
                  How It Works
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative">
                <div className="w-56 h-56 bg-primary-600/20 rounded-full absolute animate-pulse-slow"></div>
                <div className="w-40 h-40 bg-accent-500/20 rounded-full absolute top-8 left-8 animate-spin-slow"></div>
                <div className="relative z-10 text-center">
                  <Trophy size={80} className="text-accent-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-300 mb-1">Total Prize Pool</p>
                  <p className="text-3xl font-bold text-accent-400 animate-glow">{formatUSDT(totalPrizePool)}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* آمار کلیدی */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card variant="glass" className="text-center cursor-default">
          <TrendingUp size={32} className="mx-auto text-primary-400 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-1">Active Lotteries</h3>
          <p className="text-2xl font-bold text-primary-400">{activeLotteries.length}</p>
        </Card>

        <Card variant="glass" className="text-center cursor-default">
          <Trophy size={32} className="mx-auto text-accent-400 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-1">Biggest Prize</h3>
          <p className="text-2xl font-bold text-accent-400">
            {highestPrizeLottery ? formatUSDT(highestPrizeLottery.prizePool) : '0.00 USDT'}
          </p>
          {highestPrizeLottery && (
            <p className="text-gray-400 text-sm mt-1">
              {highestPrizeLottery.title}
            </p>
          )}
        </Card>

        <Card variant="glass" className="text-center cursor-default">
          <Users size={32} className="mx-auto text-secondary-400 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-1">Total Participants</h3>
          <p className="text-2xl font-bold text-secondary-400">{totalParticipants}</p>
        </Card>
      </div>

      {/* فیلتر شبکه و تب‌های قرعه‌کشی */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <div className="flex space-x-2 items-center">
            <label htmlFor="networkFilter" className="text-white font-medium">
              Network:
            </label>
            <select
              id="networkFilter"
              value={networkFilter}
              onChange={(e) => setNetworkFilter(e.target.value as typeof networkFilter)}
              className="bg-dark-600 border border-dark-500 rounded-lg px-3 py-1 text-white"
            >
              <option value="all">All</option>
              <option value="solana">Solana</option>
              <option value="tron">Tron</option>
              <option value="bsc">BSC</option>
            </select>
          </div>

          <div className="relative w-full md:w-auto">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search lotteries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-dark-600 border border-dark-500 rounded-lg text-sm w-full md:w-64"
            />
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-dark-700 p-1 rounded-lg">
            <TabsTrigger value="all" active={activeTab === 'all'}>All ({activeLotteries.length})</TabsTrigger>
            <TabsTrigger value="standard" active={activeTab === 'standard'}>Standard ({standardLotteries.length})</TabsTrigger>
            <TabsTrigger value="user" active={activeTab === 'user'}>User Created ({userLotteries.length})</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="all">
              <LotteryGrid
                lotteries={activeLotteries}
                emptyMessage={searchTerm ? `No lotteries found for "${searchTerm}"` : 'No active lotteries available.'}
                renderLottery={(lottery) => (
                  <Link key={lottery.id} href={`/lottery/${lottery.id}`} passHref>
                    <a className="block hover:bg-dark-700 p-4 rounded-lg transition-colors">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">{lottery.title}</h3>
                        <Trophy size={20} className="text-accent-400" />
                      </div>
                      <p className="text-gray-400 mt-1">{lottery.description}</p>
                      <div className="mt-2 flex justify-between text-sm text-gray-400">
                        <span>Prize Pool: {formatUSDT(lottery.prizePool)}</span>
                        <span>Tickets Sold: {lottery.ticketsSold}/{lottery.maxTickets}</span>
                      </div>
                    </a>
                  </Link>
                )}
              />
            </TabsContent>
            <TabsContent value="standard">
              <LotteryGrid
                lotteries={standardLotteries}
                emptyMessage="No standard lotteries available."
              />
            </TabsContent>
            <TabsContent value="user">
              <LotteryGrid
                lotteries={userLotteries}
                emptyMessage="No user-created lotteries available."
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* بخش قرعه‌کشی‌های در حال اتمام */}
      <div className="mb-8">
        <Card variant="glass">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Clock size={20} className="mr-2 text-warning-400" />
              <h2 className="text-xl font-bold">Ending Soon</h2>
            </div>
            <Button variant="ghost" size="sm" icon={<ChevronRight size={16} />} iconPosition="right">
              View All
            </Button>
          </div>
          {endingSoonLotteries.length > 0 ? (
            <LotteryGrid lotteries={endingSoonLotteries} emptyMessage="" />
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Clock size={48} className="mx-auto mb-4 opacity-50" />
              <p>No lotteries ending in the next 24 hours</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
