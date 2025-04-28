import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type Language = 'english' | 'russian' | 'chinese' | 'japanese' | 'ukrainian' | 'belarusian' | 'kazakh' | 'spanish' | 'bashkir' | 'tatar' | 'korean';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const languageNames: Record<Language, string> = {
  english: 'English',
  russian: 'Русский',
  chinese: '中文',
  japanese: '日本語',
  ukrainian: 'Українська',
  belarusian: 'Беларуская',
  kazakh: 'Қазақша',
  spanish: 'Español',
  bashkir: 'Башҡортса',
  tatar: 'Татарча',
  korean: '한국어'
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="flex items-center">
      <Select
        value={currentLanguage}
        onValueChange={(value) => onLanguageChange(value as Language)}
      >
        <SelectTrigger className="w-36 h-8 text-sm bg-gray-800 border-gray-700">
          <SelectValue placeholder={languageNames[currentLanguage]} />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          {Object.entries(languageNames).map(([code, name]) => (
            <SelectItem 
              key={code} 
              value={code}
              className="text-sm hover:bg-gray-700 cursor-pointer"
            >
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
