import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/common/Tabs';
import { Ticket, Clock, CheckCircle, XCircle } from 'lucide-react';
import { mockLotteries } from '../data/mockData';
import { formatTimeLeft, formatCurrency } from '../utils/helpers';

// Mock ticket data
const mockTickets = [
  { id: '1', lotteryId: '1', status: 'active', purchaseDate: new Date(Date.now() - 86400000) },
  { id: '2', lotteryId: '2', status: 'active', purchaseDate: new Date(Date.now() - 172800000) },
  { id: '3', lotteryId: '7', status: 'won', purchaseDate: new Date(Date.now() - 1036800000) },
  { id: '4', lotteryId: '6', status: 'active', purchaseDate: new Date(Date.now() - 259200000) },
];

interface TicketItemProps {
  ticket: {
    id: string;
    lotteryId: string;
    status: 'active' | 'won' | 'lost';
    purchaseDate: Date;
  };
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket }) => {
  const lottery = mockLotteries.find(l => l.id === ticket.lotteryId);
  
  if (!lottery) return null;
  
  const getStatusIcon = () => {
    switch (ticket.status) {
      case 'active':
        return <Clock size={18} className="text-primary-400" />;
      case 'won':
        return <CheckCircle size={18} className="text-success-500" />;
      case 'lost':
        return <XCircle size={18} className="text-error-500" />;
      default:
        return null;
    }
  };
  
  const getStatusText = () => {
    switch (ticket.status) {
      case 'active':
        return (
          <span className="text-primary-400">
            Active • {formatTimeLeft(lottery.endDate)}
          </span>
        );
      case 'won':
        return <span className="text-success-500">Won • {formatCurrency(lottery.prizePool)} ETH</span>;
      case 'lost':
        return <span className="text-error-500">Lost</span>;
      default:
        return null;
    }
  };
  
  return (
    <Card variant="glass" className="mb-4 transition-transform duration-200 hover:-translate-y-1">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <Ticket size={16} className="mr-2 text-accent-400" />
            <span className="text-xs text-gray-400">Ticket #{ticket.id}</span>
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-1">{lottery.title}</h3>
          
          <div className="flex items-center text-sm">
            {getStatusIcon()}
            <span className="ml-2">{getStatusText()}</span>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 md:ml-4">
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-400 mb-1">
              Purchased on {ticket.purchaseDate.toLocaleDateString()}
            </span>
            <span className="font-medium">{formatCurrency(lottery.ticketPrice)} ETH</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const TicketsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter tickets based on tab
  const getFilteredTickets = () => {
    switch (activeTab) {
      case 'active':
        return mockTickets.filter(ticket => ticket.status === 'active');
      case 'won':
        return mockTickets.filter(ticket => ticket.status === 'won');
      case 'all':
      default:
        return mockTickets;
    }
  };
  
  const filteredTickets = getFilteredTickets();
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Tickets</h1>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-dark-700 p-1 rounded-lg mb-6">
          <TabsTrigger value="all" active={activeTab === 'all'}>All Tickets</TabsTrigger>
          <TabsTrigger value="active" active={activeTab === 'active'}>Active</TabsTrigger>
          <TabsTrigger value="won" active={activeTab === 'won'}>Won</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {filteredTickets.length > 0 ? (
            <div>
              {filteredTickets.map(ticket => (
                <TicketItem key={ticket.id} ticket={ticket} />
              ))}
            </div>
          ) : (
            <Card variant="glass">
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">You don't have any tickets yet.</p>
                <Button variant="primary" size="md">
                  Browse Lotteries
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="active">
          {filteredTickets.length > 0 ? (
            <div>
              {filteredTickets.map(ticket => (
                <TicketItem key={ticket.id} ticket={ticket} />
              ))}
            </div>
          ) : (
            <Card variant="glass">
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">You don't have any active tickets.</p>
                <Button variant="primary" size="md">
                  Enter a Lottery
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="won">
          {filteredTickets.length > 0 ? (
            <div>
              {filteredTickets.map(ticket => (
                <TicketItem key={ticket.id} ticket={ticket} />
              ))}
            </div>
          ) : (
            <Card variant="glass">
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">You haven't won any lotteries yet. Keep trying!</p>
                <Button variant="primary" size="md">
                  Enter More Lotteries
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};