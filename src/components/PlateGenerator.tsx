import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import LicensePlate, { RarityLevel, PlateCountry } from './LicensePlate';
import { Play, PauseCircle, Gift } from 'lucide-react';
import { Language } from './LanguageSelector';

// Доступные буквы для номеров в РФ (те, которые есть и в латинице, и в кириллице)
const AVAILABLE_LETTERS = ['А', 'В', 'Е', 'К', 'М', 'Н', 'О', 'Р', 'С', 'Т', 'У', 'Х'];

// Список легендарных номеров
const LEGENDARY_PLATES = ['О000ОО', 'А777АА', 'Р999РР', 'Е777ВА', 'М666ММ'];

// Тексты на разных языках
const translations: Record<Language, {
  title: string;
  subtitle: string;
  info: string;
  rollButton: string;
  stopButton: string;
  generateNew: string;
  rarityHeader: string;
  legendary: string;
  rare: string;
  uncommon: string;
  common: string;
  cost: string;
  legendaryDesc: string;
  rareDesc: string;
  uncommonDesc: string;
}> = {
  english: {
    title: "License Plate Roller",
    subtitle: "Try your luck and get a rare license plate!",
    info: "The rarer the combination of numbers and letters, the more valuable the plate. Legendary plates are extremely rare!",
    rollButton: "Roll",
    stopButton: "Stop",
    generateNew: "Generate New",
    rarityHeader: "Plate Rarity:",
    legendary: "Legendary",
    rare: "Rare",
    uncommon: "Uncommon",
    common: "Common",
    cost: "Cost: ",
    legendaryDesc: "О000ОО, А777АА, Р999РР, Е777ВА, М666ММ and others with identical letters and numbers",
    rareDesc: "plates with identical numbers (А777BC)",
    uncommonDesc: "plates with identical letters (КОО123КО)"
  },
  russian: {
    title: "Роллер Номеров",
    subtitle: "Испытай удачу и получи редкий автомобильный номер!",
    info: "Чем реже комбинация цифр и букв, тем ценнее номер. Легендарные номера выпадают крайне редко!",
    rollButton: "Роллить",
    stopButton: "Остановить",
    generateNew: "Сгенерировать новый",
    rarityHeader: "Редкость номеров:",
    legendary: "Легендарные",
    rare: "Редкие",
    uncommon: "Необычные",
    common: "Обычные",
    cost: "Стоимость: ",
    legendaryDesc: "О000ОО, А777АА, Р999РР, Е777ВА, М666ММ и другие с одинаковыми буквами и цифрами",
    rareDesc: "номера с одинаковыми цифрами (А777ВС)",
    uncommonDesc: "номера с одинаковыми буквами (КОО123КО)"
  },
  chinese: {
    title: "车牌轮盘",
    subtitle: "试试你的运气，获得一个稀有的车牌！",
    info: "数字和字母组合越稀有，车牌越有价值。传奇车牌极为罕见！",
    rollButton: "滚动",
    stopButton: "停止",
    generateNew: "生成新的",
    rarityHeader: "车牌稀有度：",
    legendary: "传奇",
    rare: "稀有",
    uncommon: "不常见",
    common: "普通",
    cost: "价格: ",
    legendaryDesc: "О000ОО, А777АА, Р999РР 等相同字母和数字的组合",
    rareDesc: "相同数字的车牌 (А777BC)",
    uncommonDesc: "相同字母的车牌 (КОО123КО)"
  },
  japanese: {
    title: "ナンバープレートローラー",
    subtitle: "運試しをして、希少なナンバープレートを獲得しよう！",
    info: "数字と文字の組み合わせが希少であるほど、プレートの価値は高くなります。伝説のプレートは極めて希少です！",
    rollButton: "回す",
    stopButton: "停止",
    generateNew: "新しく生成",
    rarityHeader: "プレートの希少性：",
    legendary: "伝説級",
    rare: "レア",
    uncommon: "珍しい",
    common: "一般的",
    cost: "価格: ",
    legendaryDesc: "О000ОО, А777АА, Р999РР、同じ文字と数字を持つ他のプレート",
    rareDesc: "同じ数字のプレート (А777BC)",
    uncommonDesc: "同じ文字のプレート (КОО123КО)"
  },
  ukrainian: {
    title: "Ролер Номерів",
    subtitle: "Випробуй удачу та отримай рідкісний автомобільний номер!",
    info: "Чим рідше комбінація цифр і літер, тим цінніший номер. Легендарні номери випадають вкрай рідко!",
    rollButton: "Крутити",
    stopButton: "Зупинити",
    generateNew: "Згенерувати новий",
    rarityHeader: "Рідкість номерів:",
    legendary: "Легендарні",
    rare: "Рідкісні",
    uncommon: "Незвичайні",
    common: "Звичайні",
    cost: "Вартість: ",
    legendaryDesc: "О000ОО, А777АА, Р999РР, та інші з однаковими літерами та цифрами",
    rareDesc: "номери з однаковими цифрами (А777ВС)",
    uncommonDesc: "номери з однаковими літерами (КОО123КО)"
  },
  belarusian: {
    title: "Ролер Нумароў",
    subtitle: "Выпрабуй удачу і атрымай рэдкі аўтамабільны нумар!",
    info: "Чым радзей камбінацыя лічбаў і літар, тым каштоўней нумар. Легендарныя нумары выпадаюць вельмі рэдка!",
    rollButton: "Круціць",
    stopButton: "Спыніць",
    generateNew: "Згенераваць новы",
    rarityHeader: "Рэдкасць нумароў:",
    legendary: "Легендарныя",
    rare: "Рэдкія",
    uncommon: "Незвычайныя",
    common: "Звычайныя",
    cost: "Кошт: ",
    legendaryDesc: "О000ОО, А777АА, Р999РР, і іншыя з аднолькавымі літарамі і лічбамі",
    rareDesc: "нумары з аднолькавымі лічбамі (А777ВС)",
    uncommonDesc: "нумары з аднолькавымі літарамі (КОО123КО)"
  },
  kazakh: {
    title: "Нөмір Роллері",
    subtitle: "Бағыңды сынап, сирек кездесетін автокөлік нөмірін ал!",
    info: "Сандар мен әріптердің тіркесімі сирек болған сайын, нөмір құндырақ болады. Аңызға айналған нөмірлер өте сирек кездеседі!",
    rollButton: "Айналдыру",
    stopButton: "Тоқтату",
    generateNew: "Жаңасын жасау",
    rarityHeader: "Нөмірлердің сирек түрлері:",
    legendary: "Аңызға айналған",
    rare: "Сирек",
    uncommon: "Әдеттен тыс",
    common: "Қарапайым",
    cost: "Құны: ",
    legendaryDesc: "О000ОО, А777АА, Р999РР және басқа да бірдей әріптер мен сандары бар нөмірлер",
    rareDesc: "бірдей сандары бар нөмірлер (А777ВС)",
    uncommonDesc: "бірдей әріптері бар нөмірлер (КОО123КО)"
  },
  spanish: {
    title: "Rodillo de Matrículas",
    subtitle: "¡Prueba tu suerte y obtén una matrícula rara!",
    info: "Cuanto más rara sea la combinación de números y letras, más valiosa será la matrícula. ¡Las matrículas legendarias son extremadamente raras!",
    rollButton: "Girar",
    stopButton: "Detener",
    generateNew: "Generar nueva",
    rarityHeader: "Rareza de matrículas:",
    legendary: "Legendarias",
    rare: "Raras",
    uncommon: "Poco comunes",
    common: "Comunes",
    cost: "Coste: ",
    legendaryDesc: "О000ОО, А777АА, Р999РР y otras con letras y números idénticos",
    rareDesc: "matrículas con números idénticos (А777BC)",
    uncommonDesc: "matrículas con letras idénticas (КОО123КО)"
  },
  bashkir: {
    title: "Номерҙар Роллеры",
    subtitle: "Бәхетеңде һына һәм һирәк осрай торған автомобиль номерын ал!",
    info: "Һан һәм хәрефтәрҙең комбинацияһы һирәгерәк булған һайын, номер ҡиммәтерәк була. Легендар номерҙар бик һирәк осрай!",
    rollButton: "Әйләндерергә",
    stopButton: "Туҡтатырға",
    generateNew: "Яңыны яһарға",
    rarityHeader: "Номерҙарҙың һирәклеге:",
    legendary: "Легендар",
    rare: "Һирәк",
    uncommon: "Ғәҙәти булмаған",
    common: "Ғәҙәти",
    cost: "Хаҡы: ",
    legendaryDesc: "О000ОО, А777АА, Р999РР һәм башҡа ла бер үк хәрефтәр һәм һандар менән",
    rareDesc: "бер үк һандар менән номерҙар (А777ВС)",
    uncommonDesc: "бер үк хәрефтәр менән номерҙар (КОО123КО)"
  },
  tatar: {
    title: "Номерлар Роллеры",
    subtitle: "Бәхетеңне сына һәм сирәк очрый торган автомобиль номерын ал!",
    info: "Сан һәм хәрефләрнең комбинациясе сирәгрәк булган саен, номер кыйммәтрәк була. Легендар номерлар бик сирәк очрый!",
    rollButton: "Әйләндерергә",
    stopButton: "Туктатырга",
    generateNew: "Яңаны ясарга",
    rarityHeader: "Номерларның сирәклеге:",
    legendary: "Легендар",
    rare: "Сирәк",
    uncommon: "Гадәти булмаган",
    common: "Гадәти",
    cost: "Бәясе: ",
    legendaryDesc: "О000ОО, А777АА, Р999РР һәм башка да бер үк хәрефләр һәм саннар белән",
    rareDesc: "бер үк саннар белән номерлар (А777ВС)",
    uncommonDesc: "бер үк хәрефләр белән номерлар (КОО123КО)"
  },
  korean: {
    title: "번호판 롤러",
    subtitle: "운을 시험하고 희귀한 번호판을 얻으세요!",
    info: "숫자와 문자의 조합이 희귀할수록 번호판의 가치가 높아집니다. 전설적인 번호판은 극히 드물게 나타납니다!",
    rollButton: "돌리기",
    stopButton: "정지",
    generateNew: "새로 생성",
    rarityHeader: "번호판 희귀도:",
    legendary: "전설급",
    rare: "희귀",
    uncommon: "비일반적",
    common: "일반",
    cost: "가격: ",
    legendaryDesc: "О000ОО, А777АА, Р999РР 및 동일한 문자와 숫자가 있는 기타 번호판",
    rareDesc: "동일한 숫자가 있는 번호판 (А777BC)",
    uncommonDesc: "동일한 문자가 있는 번호판 (КОО123КО)"
  }
};

const countryMapping: Record<Language, PlateCountry> = {
  english: 'russia', // Default
  russian: 'russia',
  chinese: 'china',
  japanese: 'japan',
  ukrainian: 'ukraine',
  belarusian: 'belarus',
  kazakh: 'kazakhstan',
  spanish: 'spain',
  bashkir: 'bashkortostan',
  tatar: 'tatarstan',
  korean: 'korea'
};

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

interface PlateGeneratorProps {
  language: Language;
}

const PlateGenerator: React.FC<PlateGeneratorProps> = ({ language }) => {
  const [currentPlate, setCurrentPlate] = useState<string>(generateRandomPlate());
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [rollSpeed, setRollSpeed] = useState<number>(50);
  const [visiblePlates, setVisiblePlates] = useState<string[]>([]);
  const [rarityLevel, setRarityLevel] = useState<RarityLevel>('common');
  const rollIntervalRef = useRef<number | null>(null);
  const rollingSoundRef = useRef<HTMLAudioElement | null>(null);
  const winSoundRef = useRef<HTMLAudioElement | null>(null);
  
  const t = translations[language]; // Get translations for current language
  const country = countryMapping[language]; // Map language to country for plate design
  
  // Эффект для инициализации звуковых эффектов
  useEffect(() => {
    rollingSoundRef.current = new Audio('/sounds/rolling.mp3'); // Предполагаем, что звуковой файл есть
    rollingSoundRef.current.loop = true;
    
    winSoundRef.current = new Audio('/sounds/win.mp3'); // Предполагаем, что звуковой файл есть
    
    return () => {
      if (rollingSoundRef.current) {
        rollingSoundRef.current.pause();
      }
      if (winSoundRef.current) {
        winSoundRef.current.pause();
      }
    };
  }, []);
  
  // Эффект для генерации номеров при вращении
  useEffect(() => {
    if (isRolling) {
      // Играем звук вращения
      if (rollingSoundRef.current) {
        rollingSoundRef.current.play().catch(e => console.log("Audio play error:", e));
      }
      
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
      
      // Останавливаем звук вращения
      if (rollingSoundRef.current) {
        rollingSoundRef.current.pause();
        rollingSoundRef.current.currentTime = 0;
      }
      
      // Определяем редкость финального номера
      const rarity = getRarityLevel(currentPlate);
      setRarityLevel(rarity);
      
      // Воспроизводим звук выигрыша для редких номеров
      if (rarity !== 'common' && winSoundRef.current) {
        winSoundRef.current.play().catch(e => console.log("Win audio play error:", e));
      }
    }
    setIsRolling(false);
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
      <div className="relative h-28 w-full max-w-md overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-inner">
        {/* Текущий номер */}
        <div className={isRolling ? "plate-roll" : ""}>
          {visiblePlates.map((plate, index) => (
            <div key={`${plate}-${index}`} className="py-2">
              <LicensePlate 
                plateNumber={plate} 
                isRolling={isRolling}
                rarityLevel={index === 0 && !isRolling ? rarityLevel : 'common'}
                country={country}
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
                  {rarityLevel === 'legendary' ? t.legendary : 
                   rarityLevel === 'rare' ? t.rare : 
                   t.uncommon}!
                </span>
                <br />
              </>
            ) : null}
            <span>{t.cost}{getPlatePrice()}</span>
          </p>
        </div>
      )}
      
      <div className="flex gap-4">
        <Button 
          size="lg"
          onClick={isRolling ? stopRolling : startRolling}
          className="w-48 text-lg font-semibold bg-gradient-to-br from-purple-600 to-blue-700 hover:from-purple-700 hover:to-blue-800 shadow-lg"
        >
          {isRolling ? (
            <>
              <PauseCircle className="mr-2" />
              {t.stopButton}
            </>
          ) : (
            <>
              <Play className="mr-2" />
              {t.rollButton}
            </>
          )}
        </Button>
        
        {!isRolling && rarityLevel !== 'common' && (
          <Button 
            variant="outline" 
            className="border-green-500 text-green-400 hover:bg-green-900/20"
          >
            <Gift className="mr-2" />
            Take
          </Button>
        )}
      </div>
      
      {!isRolling && (
        <Button 
          variant="outline" 
          onClick={() => {
            const newPlate = generateRandomPlate();
            setCurrentPlate(newPlate);
            const rarity = getRarityLevel(newPlate);
            setRarityLevel(rarity);
            setVisiblePlates([newPlate]);
          }}
          className="text-gray-400 border-gray-700 hover:bg-gray-800"
        >
          {t.generateNew}
        </Button>
      )}
    </div>
  );
};

export default PlateGenerator;
