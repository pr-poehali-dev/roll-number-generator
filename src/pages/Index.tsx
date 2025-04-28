import PlateGenerator from '@/components/PlateGenerator';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white py-10">
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-primary">Роллер Номеров</h1>
          <p className="text-lg text-gray-300 mb-4">
            Испытай удачу и получи редкий автомобильный номер!
          </p>
          <p className="text-sm text-gray-400">
            Чем реже комбинация цифр и букв, тем ценнее номер. 
            Легендарные номера выпадают крайне редко!
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 shadow-2xl mb-6">
          <PlateGenerator />
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4 text-sm">
          <h3 className="font-semibold text-primary mb-2">Редкость номеров:</h3>
          <ul className="space-y-2">
            <li>
              <span className="text-yellow-400 font-bold">Легендарные</span>: 
              ООО000, ААА777, РРР999, ЕВА777, МММ666 и другие с тремя одинаковыми буквами и цифрами
            </li>
            <li>
              <span className="text-purple-500 font-semibold">Редкие</span>: 
              номера с одинаковыми цифрами (А777BC)
            </li>
            <li>
              <span className="text-blue-400">Необычные</span>: 
              номера с одинаковыми буквами (КОО123КО)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
