import React from 'react';
import { Coins, Info } from 'lucide-react';
import { useCarbonCoins } from '../hooks/useCarbonCoins.ts';

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
  const { balance, formatCoins } = useCarbonCoins();

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div 
      className={`inline-flex items-center gap-2 bg-yellow-600/20 text-yellow-400 px-3 py-2 rounded-lg border border-yellow-600/30 ${
        onClick ? 'cursor-pointer hover:bg-yellow-600/30 transition-colors' : ''
      } ${sizeClasses[size]}`}
      onClick={onClick}
      title={showTooltip ? "Carbon Coins - Use for eco-friendly purchases and space bookings" : undefined}
    >
      <Coins className={`${iconSizes[size]} animate-pulse`} />
      <span className="font-bold">{formatCoins(balance)}</span>
      {showTooltip && (
        <Info className="w-4 h-4 text-yellow-400/60" />
      )}
    </div>
  );
};

export default CarbonCoinDisplay;