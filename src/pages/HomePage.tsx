// src/pages/HomePage.tsx
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { LotteryGrid } from '../components/lotteries/LotteryGrid';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/common/Tabs';
import {
  ChevronRight,
  Trophy,
  Search,
  Filter,
  TrendingUp,
  Clock,
  Users,
} from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const HomePage: React.FC = () => {
  const { lotteries = [] } = useAppContext();
  const [activeTab, setActiveTab] = useState<'all' | 'standard' | 'user'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // ایمن‌سازی فیلتر با default آرایه
  const filtered = useMemo(
    () =>
      (lotteries || []).filter(
        l =>
          l.status === 'active' &&
          l.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [lotteries, searchTerm]
  );
  const standard = useMemo(() => filtered.filter(l => l.type === 'standard'), [filtered]);
  const userGen = useMemo(() => filtered.filter(l => l.type === 'user-generated'), [filtered]);
  const endingSoon = useMemo(
    () =>
      filtered
        .filter(l => {
          const left = new Date(l.endDate).getTime() - Date.now();
          return left > 0 && left <= 24 * 60 * 60 * 1000;
        })
        .slice(0, 2),
    [filtered]
  );
  const totalPrize = useMemo(() => filtered.reduce((sum, l) => sum + l.prizePool, 0), [filtered]);
  const highestPrize = useMemo(
    () => filtered.reduce((max, l) => (l.prizePool > max ? l.prizePool : max), 0),
    [filtered]
  );
  const totalParticipants = useMemo(
    () => filtered.reduce((sum, l) => sum + l.ticketsSold, 0),
    [filtered]
  );

  return (
    <div className="p-6">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <TrendingUp size={32} className="mx-auto text-primary-400 mb-2" />
          <p className="text-white">Active Lotteries</p>
          <p className="text-2xl font-bold text-primary-400">{filtered.length}</p>
        </Card>
        <Card className="text-center">
          <Trophy size={32} className="mx-auto text-accent-400 mb-2" />
          <p className="text-white">Biggest Prize</p>
          <p className="text-2xl font-bold text-accent-400">{formatCurrency(highestPrize)} USDT</p>
        </Card>
        <Card className="text-center">
          <Users size={32} className="mx-auto text-secondary-400 mb-2" />
          <p className="text-white">Total Participants</p>
          <p className="text-2xl font-bold text-secondary-400">{totalParticipants}</p>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-white">Active Lotteries</h2>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search…"
                className="pl-9 pr-4 py-2 bg-dark-600 border border-dark-500 rounded-lg text-white"
              />
            </div>
          </div>
          <Button variant="ghost" size="sm" icon={<Filter size={16} />}>
            Filter
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All ({filtered.length})</TabsTrigger>
            <TabsTrigger value="standard">Standard ({standard.length})</TabsTrigger>
            <TabsTrigger value="user">User ({userGen.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <LotteryGrid lotteries={filtered} />
          </TabsContent>
          <TabsContent value="standard">
            <LotteryGrid lotteries={standard} />
          </TabsContent>
          <TabsContent value="user">
            <LotteryGrid lotteries={userGen} />
          </TabsContent>
        </Tabs>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Clock size={20} className="mr-2 text-warning-400" />
            <p className="text-lg font-semibold text-white">Ending Soon</p>
          </div>
          <Button variant="ghost" size="sm" icon={<ChevronRight size={16} />}>
            View All
          </Button>
        </div>
        {endingSoon.length > 0 ? (
          <LotteryGrid lotteries={endingSoon} />
        ) : (
          <p className="text-center text-gray-400 py-8">No lotteries ending soon.</p>
        )}
      </Card>
    </div>
  );
};

export default HomePage;
