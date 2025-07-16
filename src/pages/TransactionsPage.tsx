import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { TransactionItem } from '../components/transactions/TransactionItem';
import { Filter, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useAppContext } from '../context/AppContext';

export const TransactionsPage: React.FC = () => {
  const { transactions } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const transactionsPerPage = 10;
  
  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });
  
  // Calculate transactions for current page
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
  
  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterType, searchTerm]);
  
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transaction History</h1>
        
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-dark-600 border border-dark-500 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 w-48"
            />
          </div>
          
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-dark-600 border border-dark-500 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
          >
            <option value="all">All Transactions</option>
            <option value="deposit">Deposits</option>
            <option value="withdrawal">Withdrawals</option>
            <option value="ticket-purchase">Ticket Purchases</option>
            <option value="lottery-win">Lottery Wins</option>
            <option value="lottery-creation">Lottery Creations</option>
          </select>
        </div>
      </div>
      
      <Card variant="glass">
        {currentTransactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">
              {filteredTransactions.length === 0 
                ? (searchTerm || filterType !== 'all' 
                    ? 'No transactions match your filters' 
                    : 'No transactions yet')
                : 'No transactions on this page'
              }
            </p>
            {filteredTransactions.length === 0 && !searchTerm && filterType === 'all' && (
              <Button variant="primary" size="md">
                Make Your First Transaction
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="divide-y divide-dark-600">
              {currentTransactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-6 pt-6 border-t border-dark-600">
                <div className="text-sm text-gray-400">
                  Showing {indexOfFirstTransaction + 1}-{Math.min(indexOfLastTransaction, filteredTransactions.length)} of {filteredTransactions.length}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<ChevronLeft size={16} />}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}
                  >
                    Previous
                  </Button>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                            currentPage === pageNum
                              ? 'bg-primary-600 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-dark-600'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<ChevronRight size={16} />}
                    iconPosition="right"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};