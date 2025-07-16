import React from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { UserStats } from '../components/profile/UserStats';
import { LotteryGrid } from '../components/lotteries/LotteryGrid';
import { Edit, Copy, ExternalLink, Key } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { mockLotteries } from '../data/mockData';

export const ProfilePage: React.FC = () => {
  const { state } = useAppContext();
  const { user } = state;
  
  if (!user) return null;
  
  // Get user's active lotteries
  const userLotteries = mockLotteries.filter(lottery => 
    lottery.creatorId === user.id && lottery.status === 'active'
  );
  
  // Get user's completed lotteries (lottery won)
  const completedLotteries = mockLotteries.filter(lottery => 
    lottery.status === 'completed' && lottery.winnerIds?.includes(user.id)
  );
  
  return (
    <div>
      <div className="mb-8">
        <Card variant="glass" padding="none" className="overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-primary-900 to-dark-800"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 mb-6">
              <div className="h-32 w-32 rounded-xl overflow-hidden border-4 border-dark-700 mb-4 md:mb-0">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.username} 
                    className="h-full w-full object-cover" 
                  />
                ) : (
                  <div className="h-full w-full bg-primary-700 flex items-center justify-center">
                    <span className="text-3xl text-white font-medium">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="md:ml-6 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-white">{user.username}</h1>
                    <p className="text-gray-400">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Edit size={16} />}
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="bg-dark-600 rounded-lg py-1.5 px-3 flex items-center">
                  <span className="text-sm text-gray-400 mr-2">Wallet:</span>
                  <span className="text-sm font-medium text-white mr-2">{user.walletAddress}</span>
                  <button className="text-primary-400 hover:text-primary-300">
                    <Copy size={14} />
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<ExternalLink size={14} />}
                  >
                    View on Etherscan
                  </Button>
                  
                  <Button
                    variant="accent"
                    size="sm"
                    icon={<Key size={14} />}
                  >
                    Connect Wallet
                  </Button>
                </div>
              </div>
            </div>
            
            <UserStats user={user} />
          </div>
        </Card>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">My Created Lotteries</h2>
        {userLotteries.length > 0 ? (
          <LotteryGrid 
            lotteries={userLotteries}
            emptyMessage="You haven't created any lotteries yet."
          />
        ) : (
          <Card variant="glass">
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">You haven't created any lotteries yet.</p>
              <Button
                variant="primary"
                size="md"
              >
                Create Your First Lottery
              </Button>
            </div>
          </Card>
        )}
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4">Lotteries Won</h2>
        {completedLotteries.length > 0 ? (
          <LotteryGrid 
            lotteries={completedLotteries}
            emptyMessage="You haven't won any lotteries yet."
          />
        ) : (
          <Card variant="glass">
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">You haven't won any lotteries yet. Keep trying!</p>
              <Button
                variant="accent"
                size="md"
              >
                Browse Active Lotteries
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};