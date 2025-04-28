import React from 'react';
import { cn } from "@/lib/utils";

export type RarityLevel = 'common' | 'uncommon' | 'rare' | 'legendary';

export interface LicensePlateProps {
  plateNumber: string;
  isRolling?: boolean;
  rarityLevel?: RarityLevel;
  className?: string;
}

const rarityClasses: Record<RarityLevel, string> = {
  common: 'bg-[hsl(var(--plate-background))] text-[hsl(var(--plate-text))]',
  uncommon: 'bg-[hsl(var(--plate-background))] text-[hsl(var(--plate-text))] border-blue-400',
  rare: 'bg-[hsl(var(--plate-background))] text-[hsl(var(--plate-text))] border-purple-500',
  legendary: 'bg-[hsl(var(--plate-background))] border-[3px] border-yellow-400'
};

const LicensePlate: React.FC<LicensePlateProps> = ({
  plateNumber,
  isRolling = false,
  rarityLevel = 'common',
  className
}) => {
  const [regionCode] = React.useState(Math.floor(Math.random() * 199) + 1);
  
  // Parse plate number format (Russian format: A000AA)
  const letters = plateNumber.match(/[A-ZА-Я]/g) || [];
  const numbers = plateNumber.match(/\d/g) || [];
  
  // For legendary plates, use animated text
  const textClass = rarityLevel === 'legendary' ? 'animate-shine font-bold' : '';
  
  return (
    <div 
      className={cn(
        "relative flex items-center justify-center rounded-md border-2 py-3 px-2 font-mono transition-all",
        rarityClasses[rarityLevel],
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className={textClass}>{plateNumber.slice(0, 1)}</span>
        <span className={textClass}>{plateNumber.slice(1, 4)}</span>
        <span className={textClass}>{plateNumber.slice(4, 6)}</span>
        <div className="ml-1 text-xs flex flex-col items-center justify-center">
          <span className="font-bold">{regionCode}</span>
          <span className="text-[10px] mt-1">RUS</span>
        </div>
      </div>
      
      {/* Country flag */}
      <div className="absolute right-2 top-1 bottom-1 w-6 flex flex-col">
        <div className="h-1/3 bg-white"></div>
        <div className="h-1/3 bg-blue-600"></div>
        <div className="h-1/3 bg-red-600"></div>
      </div>
    </div>
  );
};

export default LicensePlate;
