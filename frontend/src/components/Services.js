import React, { useState } from 'react';

// Импортируем изображения из папки assets
import boilerImage from '../assets/бойлер.png';
import exhaustImage from '../assets/вытяжка.png';
import inductionImage from '../assets/индукционаяплита.png';
import conditionerImage from '../assets/кондиционер.png';
import coffeeMachineImage from '../assets/кофемашина.png'; // Кофемашина
import vacuumImage from '../assets/пылесос.png';
import washingMachineImage from '../assets/стиралка.png';
import tvImage from '../assets/телевизор.png';
import installationImage from '../assets/установка.png';
import fridgeImage from '../assets/холодильник.png';

const services = [
  {
    title: "Ремонт стиральных машин",
    price: "от 330 ₽",
    imageUrl: washingMachineImage, // Ссылка на изображение стиральной машины
  },
  {
    title: "Ремонт холодильников",
    price: "от 500 ₽",
    imageUrl: fridgeImage, // Ссылка на изображение холодильника
  },
  {
    title: "Ремонт варочных панелей",
    price: "от 670 ₽",
    imageUrl: inductionImage, // Ссылка на изображение индукционной плиты
  },
  {
    title: "Ремонт климатической техники",
    price: "от 400 ₽",
    imageUrl: conditionerImage, // Ссылка на изображение кондиционера
  },
  {
    title: "Ремонт пылесосов",
    price: "от 330 ₽",
    imageUrl: vacuumImage, // Ссылка на изображение пылесоса
  },
  {
    title: "Ремонт водонагревателей",
    price: "от 670 ₽",
    imageUrl: boilerImage, // Ссылка на изображение бойлера
  },
  {
    title: "Ремонт вытяжки",
    price: "от 330 ₽",
    imageUrl: exhaustImage, // Используем изображение вытяжки
  },
  {
    title: "Ремонт кофемашин",
    price: "от 500 ₽",
    imageUrl: coffeeMachineImage, // Используем изображение кофемашины
  },
  {
    title: "Ремонт телевизоров",
    price: "от 500 ₽",
    imageUrl: tvImage, // Ссылка на изображение телевизора
  },
  {
    title: "Установка бытовой техники",
    price: "от 500 ₽",
    imageUrl: installationImage, // Ссылка на изображение установки
  },
];

const brands = [
  "Samsung", "LG", "Bosch", "Whirlpool", "Siemens", "Electrolux",
  "AEG", "Miele", "Panasonic", "Philips", "Sharp", "Toshiba",
  "Sony", "Kenwood", "Daewoo"
];

const Services = () => {
  const [flipped, setFlipped] = useState(Array(services.length).fill(false));

  const handleFlip = (index) => {
    const updatedFlipped = [...flipped];

    // Если какая-либо карточка уже перевернута, то она возвращается в состояние 1
    updatedFlipped.forEach((flipState, idx) => {
      if (idx !== index && flipState) {
        updatedFlipped[idx] = false;
      }
    });

    // Переворачиваем только выбранную карточку
    updatedFlipped[index] = !updatedFlipped[index];

    setFlipped(updatedFlipped);
  };

  return (
    <section id="services" className="py-12 bg-gray-800">
      <div className="container mx-auto text-center mb-14 px-4">
        <h2 className="text-3xl text-white mb-8">Виды техники для ремонта</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 mt-12 px-4 md:px-40">
        {services.map((service, index) => (
            <div
              key={index}
              onClick={() => handleFlip(index)}
              className={`bg-gray-200 rounded-lg shadow-lg overflow-hidden relative transition-transform duration-700 ease-in-out transform hover:scale-y-105 ${
                flipped[index] ? 'rotate-y-180' : ''
              }`}
            >
              <div className="flex flex-col h-full p-4">
                {/* Если карточка не перевернута, показываем основное содержимое */}
                {!flipped[index] ? (
                  <>
                    <h3 className="text-sm font-semibold text-gray-800 text-center">{service.title}</h3>
                    <p className="text-sm text-gray-800 font-bold mt-4 text-center">{service.price}</p>
                    <div className="flex justify-center mt-4">
                      <img src={service.imageUrl} alt={service.title} className="w-32 h-32 object-cover"/>
                    </div>
                  </>
                ) : (
                  // Если карточка перевернута, показываем список брендов в 3 колонки
                  <div className="grid grid-cols-2 sm:gap-3  sm:grid-cols-2 md:grid-cols-3 gap-2 p-4 rotate-y-180">
                    {brands.map((brand, idx) => (
                      <div key={idx} className="text-center text-gray-700 text-xs sm:text-lg">
                        <p>{brand}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Services;
