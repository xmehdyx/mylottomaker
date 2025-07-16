import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { ChevronDown, HelpCircle, MessageCircle, Mail } from 'lucide-react';
import { Button } from '../components/common/Button';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-dark-600 last:border-b-0">
      <button
        className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-white">{question}</span>
        <ChevronDown 
          size={18} 
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </button>
      
      <div className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}>
        <p className="text-gray-300">{answer}</p>
      </div>
    </div>
  );
};

export const HelpPage: React.FC = () => {
  const faqs = [
    {
      question: "How do the lotteries work?",
      answer: "Our lotteries operate on smart contracts deployed on the blockchain. When you purchase a ticket, your entry is recorded on the blockchain, ensuring transparent and tamper-proof participation. Random winners are selected using a verifiable random function, providing fair and unpredictable results for all participants."
    },
    {
      question: "How are winners selected?",
      answer: "Winners are selected through a provably fair random selection process based on blockchain technology. We use a combination of on-chain randomness sources to ensure that no one, not even us, can predict or manipulate the outcome. The smart contract automatically handles winner selection and prize distribution when the lottery ends."
    },
    {
      question: "What fees are involved?",
      answer: "Standard platform lotteries have a 10% fee that goes to the platform for maintenance and development. For user-created lotteries, 5% goes to the creator and 5% to the platform. Additionally, there are small gas fees for blockchain transactions, which vary depending on network congestion."
    },
    {
      question: "Can I create my own lottery?",
      answer: "Yes! Registered users can create and manage their own lottery events. You can choose between public lotteries (visible to all users) and private lotteries (invitation-only). You earn 5% of the total pot when creating your own lottery, with the rest going to the winner(s) after platform fees."
    },
    {
      question: "How do I withdraw my winnings?",
      answer: "Winnings are automatically sent to your connected wallet when a lottery ends. If the automatic transfer fails for any reason, you can manually withdraw from your profile page. All transactions are recorded on the blockchain for transparency."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take security very seriously. Your personal information is encrypted and stored securely. Your crypto transactions are conducted directly on the blockchain, ensuring maximum security and transparency. We never store your private keys or seed phrases."
    },
    {
      question: "What cryptocurrencies do you accept?",
      answer: "Currently, we support Ethereum (ETH) for all lottery transactions. We plan to add support for additional cryptocurrencies in the future based on user demand and technical feasibility."
    },
    {
      question: "How can I contact support?",
      answer: "You can reach our support team via email at support@cryptolotto.com or through the chat support button in the bottom right corner of the page. Our team is available 24/7 to assist with any questions or issues you may encounter."
    }
  ];
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Help & FAQ</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <Card variant="glass" className="text-center hover:border-primary-500 transition-colors duration-200">
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-primary-900/50 flex items-center justify-center mb-4">
              <HelpCircle size={30} className="text-primary-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">FAQs</h3>
            <p className="text-gray-400 mb-4">Find answers to commonly asked questions about our platform.</p>
            <Button variant="ghost" size="sm">
              Browse FAQs
            </Button>
          </div>
        </Card>
        
        <Card variant="glass" className="text-center hover:border-secondary-500 transition-colors duration-200">
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-secondary-900/50 flex items-center justify-center mb-4">
              <MessageCircle size={30} className="text-secondary-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-400 mb-4">Chat with our support team for immediate assistance.</p>
            <Button variant="ghost" size="sm">
              Start Chat
            </Button>
          </div>
        </Card>
        
        <Card variant="glass" className="text-center hover:border-accent-500 transition-colors duration-200">
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-accent-900/50 flex items-center justify-center mb-4">
              <Mail size={30} className="text-accent-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email Support</h3>
            <p className="text-gray-400 mb-4">Send us an email and we'll get back to you promptly.</p>
            <Button variant="ghost" size="sm">
              Contact Us
            </Button>
          </div>
        </Card>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
        <Card variant="glass">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </Card>
      </div>
    </div>
  );
};