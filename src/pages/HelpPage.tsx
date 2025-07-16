// src/pages/HelpPage.tsx

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
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <p className="text-gray-300">{answer}</p>
      </div>
    </div>
  );
};

export const HelpPage: React.FC = () => {
  const faqs = [
    {
      question: 'How do the lotteries work?',
      answer:
        'Lotteries run using blockchain-based smart contracts. You purchase tickets using USDT on supported networks (Solana, Tron, BSC). When the draw ends, winners are picked randomly using secure verifiable methods.',
    },
    {
      question: 'How are winners selected?',
      answer:
        'Winners are selected through a provably fair random selection process on-chain. Our system uses a randomness oracle or secure algorithm depending on the network.',
    },
    {
      question: 'What fees are involved?',
      answer:
        'For platform lotteries, a 10% fee is applied (5% to platform, 5% to creator if user-generated). Additionally, users pay small gas fees based on the selected blockchain (e.g., Solana gas is lower than BSC or Tron).',
    },
    {
      question: 'Can I create my own lottery?',
      answer:
        'Yes! Registered users can create public or private lotteries. You’ll earn 5% of the prize pool if your lottery is successful.',
    },
    {
      question: 'How do I withdraw my winnings?',
      answer:
        'Winnings are added to your internal wallet per network (USDT-Solana, USDT-Tron, etc.). You can withdraw to an external wallet anytime via your profile page.',
    },
    {
      question: 'What networks are supported?',
      answer:
        'Currently, we support USDT transactions on Solana, Tron, and Binance Smart Chain (BSC). You can choose the network when depositing, buying tickets, or withdrawing.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Absolutely. Your wallet and data are encrypted, and we never store private keys. All transactions are recorded on the blockchain for transparency.',
    },
    {
      question: 'How can I contact support?',
      answer:
        'Reach out to us anytime via email at support@cryptolotto.com or use the chat bubble on the site. We’re here to help 24/7.',
    },
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
            <p className="text-gray-400 mb-4">Answers to most common questions about USDT lotteries.</p>
            <Button variant="ghost" size="sm">Browse FAQs</Button>
          </div>
        </Card>

        <Card variant="glass" className="text-center hover:border-secondary-500 transition-colors duration-200">
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-secondary-900/50 flex items-center justify-center mb-4">
              <MessageCircle size={30} className="text-secondary-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-400 mb-4">Talk to our team instantly via live support chat.</p>
            <Button variant="ghost" size="sm">Start Chat</Button>
          </div>
        </Card>

        <Card variant="glass" className="text-center hover:border-accent-500 transition-colors duration-200">
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-accent-900/50 flex items-center justify-center mb-4">
              <Mail size={30} className="text-accent-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email Support</h3>
            <p className="text-gray-400 mb-4">Prefer email? We’re quick to respond.</p>
            <Button variant="ghost" size="sm">Contact Us</Button>
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
