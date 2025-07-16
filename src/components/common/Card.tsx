// src/components/common/Card.tsx
import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'solid' | 'glass';
};

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'solid',
}) => {
  // کلاس‌های پایه
  let base = 'rounded-2xl p-5 shadow transition duration-300';
  // واریانت‌ها
  base +=
    variant === 'glass'
      ? ' bg-dark-600/50 backdrop-blur-md border border-dark-500/30'
      : ' bg-dark-700 border border-dark-600';
  // اضافه کردن کلاس‌های سفارشی
  const classes = `${base} ${className}`;
  return <div className={classes}>{children}</div>;
};
