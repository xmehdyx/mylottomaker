import React from 'react';
import { Ticket, Trophy, CoinsIcon, BarChart3 } from 'lucide-react';
import { User } from '../../types';
import { Card } from '../common/Card';
import { formatCurrency } from '../../utils/helpers';

interface StatCardProps {
  title: string;
  value: string | number | null;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  if (value === null || value === undefined) return null; // اگر داده نیست کارت رو نشون نده
  return (
    <Card variant="glass" padding="md" className="flex items-start">
      <div className={`mr-4 p-3 rounded-lg ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-lg font-bold text-white">{value}</p>
      </div>
    </Card>
  );
};

interface UserStatsProps {
  user?: User | null;
}

export const UserStats: React.FC<UserStatsProps> = ({ user }) => {
  if (!user) {
    return <p className="text-gray-400">No user data available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Balance"
        value={user.balance !== undefined ? `${formatCurrency(user.balance)} ETH` : null}
        icon={<CoinsIcon size={24} className="text-accent-500" />}
        color="bg-accent-900/30"
      />
      <StatCard
        title="Lotteries Won"
        value={user.lotteryWon !== undefined ? user.lotteryWon : null}
        icon={<Trophy size={24} className="text-primary-500" />}
        color="bg-primary-900/30"
      />
      <StatCard
        title="Lotteries Created"
        value={user.lotteryCreated !== undefined ? user.lotteryCreated : null}
        icon={<Ticket size={24} className="text-secondary-500" />}
        color="bg-secondary-900/30"
      />
      <StatCard
        title="Win Rate"
        value={null}  {/* این رو حذف کردم چون داده ثابت و نمایشی بود */}
        icon={<BarChart3 size={24} className="text-success-500" />}
        color="bg-success-900/30"
      />
    </div>
  );
};
