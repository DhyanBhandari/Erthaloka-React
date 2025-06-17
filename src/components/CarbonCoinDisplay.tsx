import React from 'react';
import { Coins, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.tsx';

interface CarbonCoinDisplayProps {
  showTooltip?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const CarbonCoinDisplay: React.FC<CarbonCoinDisplayProps> = ({ 
  showTooltip = true, 
  size = 'md',
  onClick 
}) => {
  const { user } = useAuth();
  
  // If no user or no carbon coins data, don't render
  if (!user || user.carbonCoins === undefined) {
    return null;
  }

  const formatCoins = (amount: number): string => {
    return `${amount.toLocaleString()} CC`;
  };

  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-2',
    lg: 'text-lg px-4 py-3'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div 
      className={`inline-flex items-center gap-2 bg-yellow-600/20 text-yellow-400 rounded-lg border border-yellow-600/30 ${
        onClick ? 'cursor-pointer hover:bg-yellow-600/30 transition-colors' : ''
      } ${sizeClasses[size]}`}
      onClick={onClick}
      title={showTooltip ? "Carbon Coins - Use for eco-friendly purchases and space bookings" : undefined}
    >
      <Coins className={`${iconSizes[size]} animate-pulse`} />
      <span className="font-bold">{formatCoins(user.carbonCoins)}</span>
      {showTooltip && (
        <Info className="w-4 h-4 text-yellow-400/60" />
      )}
    </div>
  );
};

export default CarbonCoinDisplay;