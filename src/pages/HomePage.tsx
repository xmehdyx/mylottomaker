import React, { useContext, useMemo, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Card from '../components/Card';
import Button from '../components/Button';
import LotteryGrid from '../components/LotteryGrid';
import Tabs from '../components/Tabs';

const HomePage: React.FC = () => {
  const { user, mockLotteries } = useContext(AppContext);

  const totalPrizePool = useMemo(() => {
    return mockLotteries.reduce((sum, lottery) => sum + (lottery.prizePool || 0), 0);
  }, [mockLotteries]);

  const totalParticipants = useMemo(() => {
    return mockLotteries.reduce((sum, lottery) => sum + (lottery.participants || 0), 0);
  }, [mockLotteries]);

  const mostActiveLotteries = useMemo(() => {
    return [...mockLotteries]
      .sort((a, b) => (b.participants || 0) - (a.participants || 0))
      .slice(0, 3);
  }, [mockLotteries]);

  const standardLotteries = useMemo(
    () => mockLotteries.filter(lottery => lottery.type === 'standard'),
    [mockLotteries]
  );
  const customLotteries = useMemo(
    () => mockLotteries.filter(lottery => lottery.type === 'custom'),
    [mockLotteries]
  );

  const [activeTab, setActiveTab] = useState<'standard' | 'custom'>('standard');

  return (
    <div className="container mx-auto p-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <h3 className="text-lg font-semibold">Total Prize Pool</h3>
          <p className="text-3xl font-bold mt-2">${totalPrizePool}</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Total Participants</h3>
          <p className="text-3xl font-bold mt-2">{totalParticipants}</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Most Active Lotteries</h3>
          <ul className="list-disc list-inside mt-2 space-y-1">
            {mostActiveLotteries.map(lottery => (
              <li key={lottery.id}>
                {lottery.name} ({lottery.participants} participants)
              </li>
            ))}
          </ul>
          <Button className="mt-4">View All</Button>
        </Card>
      </div>

      {/* Lottery Tabs */}
      <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
        <div label="Standard">
          <LotteryGrid lotteries={standardLotteries} />
        </div>
        <div label="Custom">
          <LotteryGrid lotteries={customLotteries} />
        </div>
      </Tabs>
    </div>
  );
};

export default HomePage;
