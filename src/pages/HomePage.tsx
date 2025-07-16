// src/pages/HomePage.tsx
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/common/Tabs';
import { LotteryGrid } from '../components/lotteries/LotteryGrid';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { ChevronRight, Trophy, Search, Filter, TrendingUp, Clock, Users } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../utils/helpers';

export const HomePage: React.FC = () => {
  const { lotteries } = useAppContext();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const activeLotteries = lotteries?.filter(
    lottery =>
      lottery.status === 'active' &&
      lottery.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const standardLotteries = activeLotteries.filter(lottery => lottery.type === 'standard');
  const userLotteries = activeLotteries.filter(lottery => lottery.type === 'user-generated');

  const endingSoonLotteries = activeLotteries
    .filter(lottery => {
      const timeLeft = new Date(lottery.endDate).getTime() - Date.now();
      return timeLeft > 0 && timeLeft <= 24 * 60 * 60 * 1000;
    })
    .slice(0, 2);

  const totalPrizePool = activeLotteries.reduce((sum, lottery) => sum + lottery.prizePool, 0);

  const highestPrizeLottery = activeLotteries.reduce(
    (max, lottery) => (lottery.prizePool > (max?.prizePool || 0) ? lottery : max),
    null as typeof lotteries[0] | null
  );

  const totalParticipants = activeLotteries.reduce((sum, lottery) => sum + lottery.ticketsSold, 0);

  return (
    <div className="p-4">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <TrendingUp size={32} className="mx-auto text-primary-400 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-1">Active Lotteries</h3>
          <p className="text-2xl font-bold text-primary-400">{activeLotteries.length}</p>
        </Card>

        <Card className="text-center">
          <Trophy size={32} className="mx-auto text-accent-400 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-1">Biggest Prize</h3>
          <p className="text-2xl font-bold text-accent-400">
            {formatCurrency(highestPrizeLottery?.prizePool || 0)} USDT
          </p>
        </Card>

        <Card className="text-center">
          <Users size={32} className="mx-auto text-secondary-400 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-1">Total Participants</h3>
          <p className="text-2xl font-bold text-secondary-400">{totalParticipants}</p>
        </Card>
      </div>

      {/* Lotteries Tabs */}
      <div className="mb-8">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <h2 className="text-xl font-bold">Active Lotteries</h2>
            <div className="flex space-x-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search lotteries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-dark-600 border border-dark-500 rounded-lg text-sm w-full md:w-48 lg:w-64"
                />
              </div>
              <Button variant="ghost" size="sm" icon={<Filter size={16} />}>Filter</Button>
            </div>
          </div>

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

      {/* Ending Soon Section */}
      <div className="mb-8">
        <Card>
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

export default HomePage;
