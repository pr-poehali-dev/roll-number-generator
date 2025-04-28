import React from 'react';
import { cn } from "@/lib/utils";

export type RarityLevel = 'common' | 'uncommon' | 'rare' | 'legendary';
export type PlateCountry = 'russia' | 'china' | 'japan' | 'ukraine' | 'belarus' | 'kazakhstan' | 'spain' | 'bashkortostan' | 'tatarstan' | 'korea';

export interface LicensePlateProps {
  plateNumber: string;
  isRolling?: boolean;
  rarityLevel?: RarityLevel;
  country?: PlateCountry;
  className?: string;
}

const rarityClasses: Record<RarityLevel, string> = {
  common: 'border-gray-400',
  uncommon: 'border-blue-400',
  rare: 'border-purple-500',
  legendary: 'border-[3px] border-yellow-400'
};

const countryFlags: Record<PlateCountry, React.ReactNode> = {
  russia: (
    <div className="flex flex-col h-full">
      <div className="h-1/3 bg-white"></div>
      <div className="h-1/3 bg-blue-600"></div>
      <div className="h-1/3 bg-red-600"></div>
    </div>
  ),
  china: (
    <div className="bg-red-600 h-full flex items-center justify-center">
      <div className="relative flex">
        <div className="h-3 w-3 bg-yellow-400"></div>
        <div className="absolute top-0 left-1 h-1 w-1 bg-yellow-400 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  ),
  japan: (
    <div className="bg-white h-full flex items-center justify-center">
      <div className="h-4 w-4 rounded-full bg-red-600"></div>
    </div>
  ),
  ukraine: (
    <div className="flex flex-col h-full">
      <div className="h-1/2 bg-blue-500"></div>
      <div className="h-1/2 bg-yellow-400"></div>
    </div>
  ),
  belarus: (
    <div className="bg-red-600 h-full relative">
      <div className="absolute left-0 top-0 bottom-0 w-2/5 bg-green-700"></div>
    </div>
  ),
  kazakhstan: (
    <div className="bg-sky-500 h-full flex items-center justify-center">
      <div className="h-4 w-4 text-yellow-400 flex items-center justify-center">★</div>
    </div>
  ),
  spain: (
    <div className="flex flex-col h-full">
      <div className="h-1/4 bg-red-600"></div>
      <div className="h-2/4 bg-yellow-400"></div>
      <div className="h-1/4 bg-red-600"></div>
    </div>
  ),
  bashkortostan: (
    <div className="flex flex-col h-full">
      <div className="h-1/3 bg-blue-600"></div>
      <div className="h-1/3 bg-white"></div>
      <div className="h-1/3 bg-green-600"></div>
    </div>
  ),
  tatarstan: (
    <div className="flex flex-col h-full">
      <div className="h-1/3 bg-green-600"></div>
      <div className="h-1/3 bg-white"></div>
      <div className="h-1/3 bg-red-600"></div>
    </div>
  ),
  korea: (
    <div className="bg-white h-full flex items-center justify-center">
      <div className="h-4 w-4 rounded-full bg-red-600 relative">
        <div className="absolute h-4 w-2 left-1 top-0 bg-blue-800"></div>
      </div>
    </div>
  )
};

const getCountryCode = (country: PlateCountry): string => {
  const codes: Record<PlateCountry, string> = {
    russia: 'RUS',
    china: 'CHN',
    japan: 'JPN',
    ukraine: 'UKR',
    belarus: 'BLR',
    kazakhstan: 'KAZ',
    spain: 'ESP',
    bashkortostan: 'BSH',
    tatarstan: 'TAT',
    korea: 'KOR'
  };
  
  return codes[country];
};

const LicensePlate: React.FC<LicensePlateProps> = ({
  plateNumber,
  isRolling = false,
  rarityLevel = 'common',
  country = 'russia',
  className
}) => {
  const [regionCode] = React.useState(Math.floor(Math.random() * 199) + 1);
  
  // Apply special styling for legendary plates
  const textClass = rarityLevel === 'legendary' ? 'animate-shine font-bold' : '';
  
  // 3D effect classes
  const plateClasses = cn(
    "license-plate relative flex items-center justify-center rounded-md border-2 py-3 px-2 font-mono transition-all bg-[hsl(var(--plate-background))] text-[hsl(var(--plate-text))]",
    rarityClasses[rarityLevel],
    isRolling ? "plate-rolling" : "",
    className
  );
  
  return (
    <div className="plate-container">
      <div className={plateClasses}>
        <div className="flex items-center gap-2">
          {/* First letter */}
          <span className={`text-2xl font-bold ${textClass}`}>{plateNumber.slice(0, 1)}</span>
          
          {/* Three digits */}
          <span className={`text-3xl font-bold ${textClass}`}>{plateNumber.slice(1, 4)}</span>
          
          {/* Last two letters */}
          <span className={`text-2xl font-bold ${textClass}`}>{plateNumber.slice(4, 6)}</span>
          
          {/* Region code and country code */}
          <div className="ml-2 text-xs flex flex-col items-center justify-center">
            <span className="font-bold text-sm">{regionCode}</span>
            <span className="text-[10px] mt-1">{getCountryCode(country)}</span>
          </div>
        </div>
        
        {/* Country flag */}
        <div className="absolute right-2 top-1 bottom-1 w-6 flex flex-col">
          {countryFlags[country]}
        </div>
        
        {/* Plate shine effect */}
        <div className="plate-shine"></div>
        
        {/* Plate bolts */}
        <div className="absolute top-1 left-1 w-2 h-2 bg-gray-400 rounded-full"></div>
        <div className="absolute top-1 right-1 w-2 h-2 bg-gray-400 rounded-full"></div>
        <div className="absolute bottom-1 left-1 w-2 h-2 bg-gray-400 rounded-full"></div>
        <div className="absolute bottom-1 right-1 w-2 h-2 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default LicensePlate;
