import React from 'react';
import { 
  Home, 
  Ticket, 
  User, 
  History, 
  PlusCircle, 
  Trophy, 
  HelpCircle, 
  LogOut, 
  Menu, 
  ChevronLeft 
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ 
  icon, 
  label, 
  active = false, 
  onClick 
}) => {
  return (
    <div 
      className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 ${
        active 
          ? 'bg-primary-700 text-white' 
          : 'text-gray-300 hover:bg-primary-800/50 hover:text-white'
      }`}
      onClick={onClick}
    >
      <div className="mr-3 text-lg">{icon}</div>
      <span className="font-medium">{label}</span>
    </div>
  );
};

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const { state, toggleSidebar, logout } = useAppContext();
  
  const handleLinkClick = (page: string) => {
    setActivePage(page);
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };
  
  return (
    <>
      {/* Sidebar overlay */}
      {state.sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-screen w-64 bg-dark-700/95 backdrop-blur-lg text-white z-50 transform transition-transform duration-300 ease-in-out border-r border-dark-600 pt-16 ${
          state.sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } lg:z-40`}
      >
        <div className="p-4 flex justify-between items-center border-b border-dark-600 lg:hidden">
          <div className="flex items-center">
            <div className="h-9 w-9 rounded-full bg-primary-600 flex items-center justify-center mr-3">
              <Ticket size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 text-transparent bg-clip-text">
              CryptoLotto
            </h1>
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-dark-600 lg:hidden"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto">
          <div className="mb-6">
            <p className="text-xs uppercase text-gray-400 font-semibold mb-2 tracking-wider">
              Main Menu
            </p>
            <SidebarLink 
              icon={<Home size={20} />} 
              label="Home" 
              active={activePage === 'home'}
              onClick={() => handleLinkClick('home')}
            />
            <SidebarLink 
              icon={<Ticket size={20} />} 
              label="My Tickets" 
              active={activePage === 'tickets'}
              onClick={() => handleLinkClick('tickets')}
            />
            <SidebarLink 
              icon={<PlusCircle size={20} />} 
              label="Create Lottery" 
              active={activePage === 'create'}
              onClick={() => handleLinkClick('create')}
            />
            <SidebarLink 
              icon={<Trophy size={20} />} 
              label="Leaderboard" 
              active={activePage === 'leaderboard'}
              onClick={() => handleLinkClick('leaderboard')}
            />
          </div>

          <div className="mb-6">
            <p className="text-xs uppercase text-gray-400 font-semibold mb-2 tracking-wider">
              Account
            </p>
            <SidebarLink 
              icon={<User size={20} />} 
              label="Profile" 
              active={activePage === 'profile'}
              onClick={() => handleLinkClick('profile')}
            />
            <SidebarLink 
              icon={<History size={20} />} 
              label="Transactions" 
              active={activePage === 'transactions'}
              onClick={() => handleLinkClick('transactions')}
            />
          </div>

          <div className="mb-6">
            <p className="text-xs uppercase text-gray-400 font-semibold mb-2 tracking-wider">
              Support
            </p>
            <SidebarLink 
              icon={<HelpCircle size={20} />} 
              label="Help & FAQ" 
              active={activePage === 'help'}
              onClick={() => handleLinkClick('help')}
            />
          </div>

          <div className="mt-auto pt-6 border-t border-dark-600">
            <SidebarLink 
              icon={<LogOut size={20} />} 
              label="Logout" 
              onClick={logout}
            />
          </div>
        </div>
      </div>
    </>
  );
};