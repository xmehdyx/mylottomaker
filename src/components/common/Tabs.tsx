import React from 'react';

interface TabsProps {
  children: React.ReactNode;
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  children,
  defaultValue,
  value,
  onValueChange,
}) => {
  const [localValue, setLocalValue] = React.useState(defaultValue);
  
  const currentValue = value !== undefined ? value : localValue;
  
  const handleValueChange = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setLocalValue(newValue);
    }
  };
  
  return (
    <div className="tabs-container">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === TabsList || child.type === TabsContent) {
            return React.cloneElement(child as React.ReactElement<any>, {
              value: currentValue,
              onValueChange: handleValueChange,
            });
          }
          return child;
        }
        return child;
      })}
    </div>
  );
};

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const TabsList: React.FC<TabsListProps> = ({
  children,
  className = '',
  value,
  onValueChange,
}) => {
  return (
    <div className={`inline-flex rounded-md ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === TabsTrigger) {
          return React.cloneElement(child as React.ReactElement<any>, {
            active: value === child.props.value,
            onClick: () => onValueChange?.(child.props.value),
          });
        }
        return child;
      })}
    </div>
  );
};

interface TabsTriggerProps {
  children: React.ReactNode;
  value: string;
  active?: boolean;
  onClick?: () => void;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  children,
  value,
  active = false,
  onClick,
}) => {
  return (
    <button
      role="tab"
      aria-selected={active}
      data-value={value}
      className={`
        px-4 py-2 text-sm font-medium transition-all duration-200
        ${active ? 'bg-primary-700 text-white' : 'text-gray-400 hover:text-white'}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  children: React.ReactNode;
  value: string;
  currentValue?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({
  children,
  value,
  currentValue,
}) => {
  const isActive = value === currentValue;
  
  if (!isActive) return null;
  
  return (
    <div role="tabpanel" data-value={value}>
      {children}
    </div>
  );
};