import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'solid' | 'glass' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'solid',
  padding = 'md',
  hover = false,
}) => {
  const variantClasses = {
    solid: 'bg-dark-700 border border-dark-600',
    glass: 'bg-dark-700/70 backdrop-blur-glass border border-dark-600/50',
    outlined: 'bg-transparent border border-dark-600',
  };

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7',
  };

  return (
    <div
      className={`
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        rounded-xl
        ${hover ? 'transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};