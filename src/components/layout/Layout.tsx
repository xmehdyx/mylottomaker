import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { HomePage } from '../../pages/HomePage';
import { CreateLotteryPage } from '../../pages/CreateLotteryPage';
import { ProfilePage } from '../../pages/ProfilePage';
import { TransactionsPage } from '../../pages/TransactionsPage';
import { TicketsPage } from '../../pages/TicketsPage';
import { LeaderboardPage } from '../../pages/LeaderboardPage';
import { HelpPage } from '../../pages/HelpPage';
import { useAppContext } from '../../context/AppContext';

export const Layout: React.FC = () => {
  const [activePage, setActivePage] = useState('home');
  const { state } = useAppContext();

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'create':
        return <CreateLotteryPage />;
      case 'profile':
        return <ProfilePage />;
      case 'transactions':
        return <TransactionsPage />;
      case 'tickets':
        return <TicketsPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'help':
        return <HelpPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-800 to-dark-900 text-gray-100">
      <Header />
      <div className="flex min-h-screen">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <main className="flex-1 lg:ml-64 pt-16">
          <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
};