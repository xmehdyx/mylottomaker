// src/components/common/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: strin// src/components/common/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'solid' | 'glass';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'solid',
}) => {
  let base = 'rounded-2xl p-5 shadow transition';
  base +=
    variant === 'glass'
      ? ' bg-dark-600/50 backdrop-blur-md border border-dark-500/30'
      : ' bg-dark-700 border border-dark-600';
  return <div className={`${base} ${className}`}>{children}</div>;
};
g;
  variant?: 'solid' | 'glass';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'solid',
}) => {
  // کلاس‌های پایه
  let baseClasses =
    'rounded-2xl p-5 shadow-md transition duration-300';

  // بسته به واریانت
  if (variant === 'solid') {
    baseClasses += ' bg-dark-700 border border-dark-600';
  } else {
    baseClasses +=
      ' bg-dark-600/50 backdrop-blur-md border border-dark-500/30';
  }

  // جمع نهایی
  const classes = `${baseClasses} ${className}`;

  return <div className={classes}>{children}</div>;
};
