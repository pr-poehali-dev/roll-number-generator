import React, { useState } from 'react';
import PlateGenerator from '@/components/PlateGenerator';
import LanguageSelector, { Language } from '@/components/LanguageSelector';
import { Separator } from '@/components/ui/separator';

// Переводы для главной страницы
const translations: Record<Language, {
  title: string;
  subtitle: string;
  info: string;
  rarityHeader: string;
  legendary: string;
  rare: string;
  uncommon: string;
  legendaryDesc: string;
  rareDesc: string;
  uncommonDesc: string;
}> = {
  english: {
    title: "License Plate Roller",
    subtitle: "Try your luck and get a rare license plate!",
    info: "The rarer the combination of numbers and letters, the more valuable the plate. Legendary plates are extremely rare!",
    rarityHeader: "Plate Rarity:",
    legendary: "Legendary",
    rare: "Rare",
    uncommon: "Uncommon",
    legendaryDesc: "О000ОО, А777АА, Р999РР, Е777ВА, М666ММ and others with identical letters and numbers",
    rareDesc: "plates with identical numbers (А777BC)",
    uncommonDesc: "plates with identical letters (КОО123КО)"
  },
  russian: {
    title: "Роллер Номеров",
    subtitle: "Испытай удачу и получи редкий автомобильный номер!",
    info: "Чем реже комбинация цифр и букв, тем ценнее номер. Легендарные номера выпадают крайне редко!",
    rarityHeader: "Редкость номеров:",
    legendary: "Легендарные",
    rare: "Редкие",
    uncommon: "Необычные",
    legendaryDesc: "О000ОО, А777АА, Р999РР, Е777ВА, М666ММ и другие с одинаковыми буквами и цифрами",
    rareDesc: "номера с одинаковыми цифрами (А777ВС)",
    uncommonDesc: "номера с одинаковыми буквами (КОО123КО)"
  },
  chinese: {
    title: "车牌轮盘",
    subtitle: "试试你的运气，获得一个稀有的车牌！",
    info: "数字和字母组合越稀有，车牌越有价值。传奇车牌极为罕见！",
    rarityHeader: "车牌稀有度：",
    legendary: "传奇",
    rare: "稀有",
    uncommon: "不常见",
    legendaryDesc: "О000ОО, А777АА, Р999РР 等相同字母和数字的组合",
    rareDesc: "相同数字的车牌 (А777BC)",
    uncommonDesc: "相同字母的车牌 (КОО123КО)"
  },
  japanese: {
    title: "ナンバープレートローラー",
    subtitle: "運試しをして、希少なナンバープレートを獲得しよう！",
    info: "数字と文字の組み合わせが希少であるほど、プレートの価値は高くなります。伝説のプレートは極めて希少です！",
    rarityHeader: "プレートの希少性：",
    legendary: "伝説級",
    rare: "レア",
    uncommon: "珍しい",
    legendaryDesc: "О000ОО, А777АА, Р999РР、同じ文字と数字を持つ他のプレート",
    rareDesc: "同じ数字のプレート (А777BC)",
    uncommonDesc: "同じ文字のプレート (КОО123КО)"
  },
  ukrainian: {
    title: "Ролер Номерів",
    subtitle: "Випробуй удачу та отримай рідкісний автомобільний номер!",
    info: "Чим рідше комбінація цифр і літер, тим цінніший номер. Легендарні номери випадають вкрай рідко!",
    rarityHeader: "Рідкість номерів:",
    legendary: "Легендарні",
    rare: "Рідкісні",
    uncommon: "Незвичайні",
    legendaryDesc: "О000ОО, А777АА, Р999РР, та інші з однаковими літерами та цифрами",
    rareDesc: "номери з однаковими цифрами (А777ВС)",
    uncommonDesc: "номери з однаковими літерами (КОО123КО)"
  },
  belarusian: {
    title: "Ролер Нумароў",
    subtitle: "Выпрабуй удачу і атрымай рэдкі аўтамабільны нумар!",
    info: "Чым радзей камбінацыя лічбаў і літар, тым каштоўней нумар. Легендарныя нумары выпадаюць вельмі рэдка!",
    rarityHeader: "Рэдкасць нумароў:",
    legendary: "Легендарныя",
    rare: "Рэдкія",
    uncommon: "Незвычайныя",
    legendaryDesc: "О000ОО, А777АА, Р999РР, і іншыя з аднолькавымі літарамі і лічбамі",
    rareDesc: "нумары з аднолькавымі лічбамі (А777ВС)",
    uncommonDesc: "нумары з аднолькавымі літарамі (КОО123КО)"
  },
  kazakh: {
    title: "Нөмір Роллері",
    subtitle: "Бағыңды сынап, сирек кездесетін автокөлік нөмірін ал!",
    info: "Сандар мен әріптердің тіркесімі сирек болған сайын, нөмір құндырақ болады. Аңызға айналған нөмірлер өте сирек кездеседі!",
    rarityHeader: "Нөмірлердің сирек түрлері:",
    legendary: "Аңызға айналған",
    rare: "Сирек",
    uncommon: "Әдеттен тыс",
    legendaryDesc: "О000ОО, А777АА, Р999РР және басқа да бірдей әріптер мен сандары бар нөмірлер",
    rareDesc: "бірдей сандары бар нөмірлер (А777ВС)",
    uncommonDesc: "бірдей әріптері бар нөмірлер (КОО123КО)"
  },
  spanish: {
    title: "Rodillo de Matrículas",
    subtitle: "¡Prueba tu suerte y obtén una matrícula rara!",
    info: "Cuanto más rara sea la combinación de números y letras, más valiosa será la matrícula. ¡Las matrículas legendarias son extremadamente raras!",
    rarityHeader: "Rareza de matrículas:",
    legendary: "Legendarias",
    rare: "Raras",
    uncommon: "Poco comunes",
    legendaryDesc: "О000ОО, А777АА, Р999РР y otras con letras y números idénticos",
    rareDesc: "matrículas con números idénticos (А777BC)",
    uncommonDesc: "matrículas con letras idénticas (КОО123КО)"
  },
  bashkir: {
    title: "Номерҙар Роллеры",
    subtitle: "Бәхетеңде һына һәм һирәк осрай торған автомобиль номерын ал!",
    info: "Һан һәм хәрефтәрҙең комбинацияһы һирәгерәк булған һайын, номер ҡиммәтерәк була. Легендар номерҙар бик һирәк осрай!",
    rarityHeader: "Номерҙарҙың һирәклеге:",
    legendary: "Легендар",
    rare: "Һирәк",
    uncommon: "Ғәҙәти булмаған",
    legendaryDesc: "О000ОО, А777АА, Р999РР һәм башҡа ла бер үк хәрефтәр һәм һандар менән",
    rareDesc: "бер үк һандар менән номерҙар (А777ВС)",
    uncommonDesc: "бер үк хәрефтәр менән номерҙар (КОО123КО)"
  },
  tatar: {
    title: "Номерлар Роллеры",
    subtitle: "Бәхетеңне сына һәм сирәк очрый торган автомобиль номерын ал!",
    info: "Сан һәм хәрефләрнең комбинациясе сирәгрәк булган саен, номер кыйммәтрәк була. Легендар номерлар бик сирәк очрый!",
    rarityHeader: "Номерларның сирәклеге:",
    legendary: "Легендар",
    rare: "Сирәк",
    uncommon: "Гадәти булмаган",
    legendaryDesc: "О000ОО, А777АА, Р999РР һәм башка да бер үк хәрефләр һәм саннар белән",
    rareDesc: "бер үк саннар белән номерлар (А777ВС)",
    uncommonDesc: "бер үк хәрефләр белән номерлар (КОО123КО)"
  },
  korean: {
    title: "번호판 롤러",
    subtitle: "운을 시험하고 희귀한 번호판을 얻으세요!",
    info: "숫자와 문자의 조합이 희귀할수록 번호판의 가치가 높아집니다. 전설적인 번호판은 극히 드물게 나타납니다!",
    rarityHeader: "번호판 희귀도:",
    legendary: "전설급",
    rare: "희귀",
    uncommon: "비일반적",
    legendaryDesc: "О000ОО, А777АА, Р999РР 및 동일한 문자와 숫자가 있는 기타 번호판",
    rareDesc: "동일한 숫자가 있는 번호판 (А777BC)",
    uncommonDesc: "동일한 문자가 있는 번호판 (КОО123КО)"
  }
};

const Index = () => {
  const [language, setLanguage] = useState<Language>('english');
  const t = translations[language];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header with language selector */}
      <header className="px-4 py-3 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h2 className="text-xl font-bold text-primary">{t.title}</h2>
          <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          {/* Hero section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">{t.title}</h1>
            <p className="text-lg text-gray-300 mb-4">
              {t.subtitle}
            </p>
            <p className="text-sm text-gray-400">
              {t.info}
            </p>
          </div>
          
          {/* License plate generator */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-2xl mb-8 border border-gray-700">
            <PlateGenerator language={language} />
          </div>
          
          {/* Rarity information */}
          <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 border border-gray-700/50">
            <h3 className="font-semibold text-primary mb-3 text-lg">{t.rarityHeader}</h3>
            <Separator className="mb-4 bg-gray-700" />
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-yellow-400 text-xs">★★★</span>
                </div>
                <div>
                  <span className="text-yellow-400 font-bold block mb-1">{t.legendary}</span>
                  <p className="text-sm text-gray-400">{t.legendaryDesc}</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-purple-400 text-xs">★★</span>
                </div>
                <div>
                  <span className="text-purple-500 font-semibold block mb-1">{t.rare}</span>
                  <p className="text-sm text-gray-400">{t.rareDesc}</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-blue-400 text-xs">★</span>
                </div>
                <div>
                  <span className="text-blue-400 block mb-1">{t.uncommon}</span>
                  <p className="text-sm text-gray-400">{t.uncommonDesc}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-4 px-4 border-t border-gray-800 text-center text-sm text-gray-500">
        <p>© 2025 {t.title} | {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
