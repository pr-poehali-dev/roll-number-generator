import React, { useEffect, useRef } from 'react';
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
  common: 'border-gray-400 shadow-sm',
  uncommon: 'border-blue-400 shadow-blue-900/20',
  rare: 'border-purple-500 shadow-purple-900/30',
  legendary: 'border-[3px] border-yellow-400 shadow-yellow-400/30'
};

const countryFlags: Record<PlateCountry, React.ReactNode> = {
  russia: (
    <div className="flex flex-col h-full relative overflow-hidden rounded-sm shadow-inner">
      <div className="h-1/3 bg-white"></div>
      <div className="h-1/3 bg-blue-600"></div>
      <div className="h-1/3 bg-red-600"></div>
      <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
    </div>
  ),
  china: (
    <div className="bg-red-600 h-full flex items-center justify-center relative overflow-hidden rounded-sm shadow-inner">
      <div className="relative flex">
        <div className="h-3 w-3 bg-yellow-400"></div>
        <div className="absolute top-0 left-1 h-1 w-1 bg-yellow-400 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
    </div>
  ),
  japan: (
    <div className="bg-white h-full flex items-center justify-center relative overflow-hidden rounded-sm shadow-inner">
      <div className="h-4 w-4 rounded-full bg-red-600 shadow-sm"></div>
      <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
    </div>
  ),
  ukraine: (
    <div className="flex flex-col h-full relative overflow-hidden rounded-sm shadow-inner">
      <div className="h-1/2 bg-blue-500"></div>
      <div className="h-1/2 bg-yellow-400"></div>
      <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
    </div>
  ),
  belarus: (
    <div className="bg-red-600 h-full relative overflow-hidden rounded-sm shadow-inner">
      <div className="absolute left-0 top-0 bottom-0 w-2/5 bg-green-700"></div>
      <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
    </div>
  ),
  kazakhstan: (
    <div className="bg-sky-500 h-full flex items-center justify-center relative overflow-hidden rounded-sm shadow-inner">
      <div className="h-4 w-4 text-yellow-400 flex items-center justify-center">★</div>
      <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
    </div>
  ),
  spain: (
    <div className="flex flex-col h-full relative overflow-hidden rounded-sm shadow-inner">
      <div className="h-1/4 bg-red-600"></div>
      <div className="h-2/4 bg-yellow-400"></div>
      <div className="h-1/4 bg-red-600"></div>
      <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
    </div>
  ),
  bashkortostan: (
    <div className="flex flex-col h-full relative overflow-hidden rounded-sm shadow-inner">
      <div className="h-1/3 bg-blue-600"></div>
      <div className="h-1/3 bg-white"></div>
      <div className="h-1/3 bg-green-600"></div>
      <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
    </div>
  ),
  tatarstan: (
    <div className="flex flex-col h-full relative overflow-hidden rounded-sm shadow-inner">
      <div className="h-1/3 bg-green-600"></div>
      <div className="h-1/3 bg-white"></div>
      <div className="h-1/3 bg-red-600"></div>
      <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
    </div>
  ),
  korea: (
    <div className="bg-white h-full flex items-center justify-center relative overflow-hidden rounded-sm shadow-inner">
      <div className="h-4 w-4 rounded-full bg-red-600 relative">
        <div className="absolute h-4 w-2 left-1 top-0 bg-blue-800"></div>
      </div>
      <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
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
  const plateRef = useRef<HTMLDivElement>(null);
  
  // Apply special styling for legendary plates
  const textClass = rarityLevel === 'legendary' ? 'animate-shine font-bold' : '';
  
  // Apply random scratches and imperfections
  useEffect(() => {
    if (plateRef.current && !isRolling) {
      // We'll add dirt and scratches only when not rolling
      const plateElement = plateRef.current;
      
      // Random slight rotation
      const randomRotate = (Math.random() - 0.5) * 0.5;
      plateElement.style.transform = `rotateX(${randomRotate}deg) rotateY(${randomRotate * 1.5}deg)`;
      
      // Random slight discoloration for aging effect
      const randomHue = Math.random() * 5;
      const randomSaturation = 90 + Math.random() * 10;
      const randomLightness = 93 + Math.random() * 4;
      plateElement.style.background = `hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`;
    }
  }, [plateNumber, isRolling]);
  
  // 3D effect classes
  const plateClasses = cn(
    "license-plate relative flex items-center justify-center rounded-md border-2 py-3 px-2 font-mono transition-all bg-[hsl(var(--plate-background))] text-[hsl(var(--plate-text))]",
    rarityClasses[rarityLevel],
    isRolling ? "plate-rolling" : "",
    className
  );

  // Create wear patterns on bolts
  const getBoltClass = () => {
    const randomWear = Math.floor(Math.random() * 3);
    const baseClass = "absolute w-2 h-2 rounded-full shadow-inner";
    
    switch(randomWear) {
      case 0:
        return `${baseClass} bg-gray-400`;
      case 1:
        return `${baseClass} bg-gray-500`;
      default:
        return `${baseClass} bg-gray-400/90`;
    }
  };
  
  return (
    <div className="plate-container">
      <div className={plateClasses} ref={plateRef} style={{
        boxShadow: '0 6px 12px -2px rgba(0,0,0,0.4), 0 3px 6px -3px rgba(0,0,0,0.3), 0 -1px 1px rgba(255,255,255,0.1) inset',
      }}>
        <div className="flex items-center gap-2">
          {/* First letter */}
          <span className={`text-2xl font-bold ${textClass} drop-shadow-sm`} style={{
            textShadow: '0px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.2)'
          }}>{plateNumber.slice(0, 1)}</span>
          
          {/* Three digits */}
          <span className={`text-3xl font-bold ${textClass} tracking-wider drop-shadow-sm`} style={{
            textShadow: '0px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.2)'
          }}>{plateNumber.slice(1, 4)}</span>
          
          {/* Last two letters */}
          <span className={`text-2xl font-bold ${textClass} drop-shadow-sm`} style={{
            textShadow: '0px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.2)'
          }}>{plateNumber.slice(4, 6)}</span>
          
          {/* Region code and country code */}
          <div className="ml-2 text-xs flex flex-col items-center justify-center border-l border-black/10 pl-2">
            <span className="font-bold text-sm drop-shadow-sm" style={{
              textShadow: '0px 1px 1px rgba(0,0,0,0.15)'
            }}>{regionCode}</span>
            <span className="text-[10px] mt-1 opacity-70">{getCountryCode(country)}</span>
          </div>
        </div>
        
        {/* Country flag */}
        <div className="absolute right-2 top-1 bottom-1 w-6 flex flex-col rounded-sm overflow-hidden shadow-sm ring-1 ring-black/10">
          {countryFlags[country]}
        </div>
        
        {/* Enhanced plate shine effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 rounded-md">
          <div className="h-full w-full bg-gradient-to-br from-white via-transparent to-transparent" 
               style={{ transform: 'rotate(-30deg) translateY(-60%) translateX(-20%)', mixBlendMode: 'overlay' }}></div>
        </div>
        
        {/* Secondary shine effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 rounded-md">
          <div className="h-full w-full bg-gradient-to-br from-white via-transparent to-transparent" 
               style={{ transform: 'rotate(45deg) translateY(60%) translateX(20%)', mixBlendMode: 'overlay' }}></div>
        </div>
        
        {/* Plate bolts with realistic wear patterns */}
        <div className={getBoltClass() + " top-1 left-1"} style={{ boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.3), inset 1px 1px 1px rgba(255,255,255,0.2)' }}></div>
        <div className={getBoltClass() + " top-1 right-1"} style={{ boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.3), inset 1px 1px 1px rgba(255,255,255,0.2)' }}></div>
        <div className={getBoltClass() + " bottom-1 left-1"} style={{ boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.3), inset 1px 1px 1px rgba(255,255,255,0.2)' }}></div>
        <div className={getBoltClass() + " bottom-1 right-1"} style={{ boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.3), inset 1px 1px 1px rgba(255,255,255,0.2)' }}></div>
        
        {/* Enhanced dust particles - more realistic and varied */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 mix-blend-overlay">
          {[...Array(15)].map((_, i) => {
            const size = Math.random() * 2.5 + 0.5;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const opacity = Math.random() * 0.4;
            const blur = Math.random() > 0.7 ? 'blur-[0.5px]' : '';
            
            return (
              <div 
                key={i}
                className={`absolute bg-gray-900/40 rounded-full ${blur}`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  top: `${top}%`,
                  opacity: opacity
                }}
              />
            );
          })}
        </div>
        
        {/* Enhanced random scratches - more varied and realistic */}
        {!isRolling && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-overlay">
            {[...Array(rarityLevel === 'legendary' ? 1 : 5)].map((_, i) => {
              const length = Math.random() * 40 + 5;
              const width = Math.random() * 1 + 0.2;
              const left = Math.random() * 100;
              const top = Math.random() * 100;
              const angle = Math.random() * 360;
              const opacity = Math.random() * 0.2;
              const blur = Math.random() > 0.5 ? 'blur-[0.3px]' : '';
              
              return (
                <div 
                  key={i}
                  className={`absolute ${blur}`}
                  style={{
                    width: `${length}px`,
                    height: `${width}px`,
                    left: `${left}%`,
                    top: `${top}%`,
                    transform: `rotate(${angle}deg)`,
                    opacity: opacity,
                    background: Math.random() > 0.7 ? 'white' : 'rgba(0,0,0,0.3)'
                  }}
                />
              );
            })}
          </div>
        )}
        
        {/* Dirt and smudges */}
        {!isRolling && rarityLevel !== 'legendary' && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => {
              const size = Math.random() * 30 + 10;
              const left = Math.random() * 100;
              const top = Math.random() * 100;
              const opacity = Math.random() * 0.1;
              
              return (
                <div 
                  key={`smudge-${i}`}
                  className="absolute rounded-full blur-sm"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${left}%`,
                    top: `${top}%`,
                    opacity: opacity,
                    background: 'rgba(0,0,0,0.3)',
                    mixBlendMode: 'multiply'
                  }}
                />
              );
            })}
          </div>
        )}
        
        {/* Edge wear */}
        {!isRolling && rarityLevel !== 'legendary' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/20 to-transparent opacity-40"></div>
            <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-30"></div>
            <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-black/20 to-transparent opacity-40"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LicensePlate;
