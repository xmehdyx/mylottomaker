// src/components/common/Card.tsx
import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'solid' | 'glass';
}

export const Card: React.FC<CardProps> = ({ children, className, variant = 'solid' }) => {
  return (
    <div
      className={clsx(
        'rounded-2xl p-5 shadow-md transition duration-300',
        variant === 'solid' ? 'bg-dark-700 border border-dark-600' : 'bg-dark-600/50 backdrop-blur-md border border-dark-500/30',
        className
      )}
    >
      {children}
    </div>
  );
};
