import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import LicensePlate, { RarityLevel } from './LicensePlate';
import { Play, PauseCircle } from 'lucide-react';

// Доступные буквы для номеров в РФ (те, которые есть и в латинице, и в кириллице)
const AVAILABLE_LETTERS = ['А', 'В', 'Е', 'К', 'М', 'Н', 'О', 'Р', 'С', 'Т', 'У', 'Х'];

// Список легендарных номеров
const LEGENDARY_PLATES = ['ООО000', 'ААА777', 'РРР999', 'ЕВА777', 'МММ666'];

const generateRandomPlate = (): string => {
  const firstLetter = AVAILABLE_LETTERS[Math.floor(Math.random() * AVAILABLE_LETTERS.length)];
  const number = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const lastTwoLetters = 
    AVAILABLE_LETTERS[Math.floor(Math.random() * AVAILABLE_LETTERS.length)] +
    AVAILABLE_LETTERS[Math.floor(Math.random() * AVAILABLE_LETTERS.length)];
  
  return `${firstLetter}${number}${lastTwoLetters}`;
};

// Определение редкости номера
const getRarityLevel = (plateNumber: string): RarityLevel => {
  // Проверка на легендарные номера
  if (LEGENDARY_PLATES.includes(plateNumber)) {
    return 'legendary';
  }
  
  // Проверка на номера с одинаковыми цифрами
  const numbers = plateNumber.slice(1, 4);
  const allSameDigits = numbers[0] === numbers[1] && numbers[1] === numbers[2];
  
  // Проверка на номера с одинаковыми буквами
  const letters = [plateNumber[0], plateNumber[4], plateNumber[5]];
  const allSameLetters = letters[0] === letters[1] && letters[1] === letters[2];
  
  if (allSameDigits && allSameLetters) {
    return 'legendary';
  } else if (allSameDigits) {
    return 'rare';
  } else if (allSameLetters) {
    return 'uncommon';
  }
  
  return 'common';
};

const PlateGenerator: React.FC = () => {
  const [currentPlate, setCurrentPlate] = useState<string>(generateRandomPlate());
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [rollSpeed, setRollSpeed] = useState<number>(50);
  const [visiblePlates, setVisiblePlates] = useState<string[]>([]);
  const [rarityLevel, setRarityLevel] = useState<RarityLevel>('common');
  const rollIntervalRef = useRef<number | null>(null);
  
  // Эффект для генерации номеров при вращении
  useEffect(() => {
    if (isRolling) {
      // Создаем интервал для обновления номеров
      rollIntervalRef.current = window.setInterval(() => {
        const newPlate = generateRandomPlate();
        setCurrentPlate(newPlate);
        
        // Обновляем список видимых номеров для анимации
        setVisiblePlates(prev => {
          const newPlates = [newPlate, ...prev.slice(0, 5)];
          return newPlates;
        });
        
        // Постепенно замедляем вращение
        setRollSpeed(prev => {
          if (prev < 300) {
            return prev + 5;
          }
          return prev;
        });
        
        // Останавливаем вращение после определенного времени
        if (rollSpeed > 290) {
          stopRolling();
        }
      }, rollSpeed);
    }
    
    return () => {
      if (rollIntervalRef.current) {
        clearInterval(rollIntervalRef.current);
      }
    };
  }, [isRolling, rollSpeed]);
  
  // Начать вращение
  const startRolling = () => {
    setIsRolling(true);
    setRollSpeed(50);
    setVisiblePlates([currentPlate]);
  };
  
  // Остановить вращение
  const stopRolling = () => {
    if (rollIntervalRef.current) {
      clearInterval(rollIntervalRef.current);
    }
    setIsRolling(false);
    
    // Определяем редкость финального номера
    const rarity = getRarityLevel(currentPlate);
    setRarityLevel(rarity);
  };
  
  // Функция для отображения цены номера
  const getPlatePrice = (): string => {
    switch (rarityLevel) {
      case 'legendary':
        return '1 000 000 ₽';
      case 'rare':
        return '300 000 ₽';
      case 'uncommon':
        return '100 000 ₽';
      default:
        return '10 000 ₽';
    }
  };
  
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative h-28 w-full max-w-md overflow-hidden rounded-xl border border-[hsl(var(--plate-border))] bg-[hsl(var(--plate-background))]">
        {/* Текущий номер */}
        <div className={isRolling ? "plate-roll" : ""}>
          {visiblePlates.map((plate, index) => (
            <div key={`${plate}-${index}`} className="py-2">
              <LicensePlate 
                plateNumber={plate} 
                isRolling={isRolling}
                rarityLevel={index === 0 && !isRolling ? rarityLevel : 'common'}
              />
            </div>
          ))}
        </div>
      </div>
      
      {!isRolling && (
        <div className="text-center">
          <p className="font-medium">
            {rarityLevel !== 'common' ? (
              <>
                <span className={
                  rarityLevel === 'legendary' ? 'text-yellow-400 font-bold' : 
                  rarityLevel === 'rare' ? 'text-purple-500 font-semibold' : 
                  'text-blue-400'
                }>
                  {rarityLevel === 'legendary' ? 'Легендарный' : 
                   rarityLevel === 'rare' ? 'Редкий' : 
                   'Необычный'} номер!
                </span>
                <br />
              </>
            ) : null}
            <span>Стоимость: {getPlatePrice()}</span>
          </p>
        </div>
      )}
      
      <Button 
        size="lg"
        onClick={isRolling ? stopRolling : startRolling}
        className="w-48 text-lg font-semibold"
      >
        {isRolling ? (
          <>
            <PauseCircle />
            Остановить
          </>
        ) : (
          <>
            <Play />
            Роллить
          </>
        )}
      </Button>
      
      {!isRolling && (
        <Button 
          variant="outline" 
          onClick={() => {
            setCurrentPlate(generateRandomPlate());
            const rarity = getRarityLevel(currentPlate);
            setRarityLevel(rarity);
            setVisiblePlates([currentPlate]);
          }}
        >
          Сгенерировать новый
        </Button>
      )}
    </div>
  );
};

export default PlateGenerator;
