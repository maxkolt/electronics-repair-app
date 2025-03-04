import React, { useState, useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import mainImage from '../assets/главная.jpg'; // Импортируем картинку

const Hero = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formVisible, setFormVisible] = useState(true);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState("");

  // Анимация точек "..." во время загрузки
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 300); // Интервал 0.3 сек

      return () => clearInterval(interval);
    } else {
      setLoadingDots(""); // Сброс после загрузки
    }
  }, [isLoading]);

  const onSubmit = async (data) => {
    setIsLoading(true); // Устанавливаем состояние загрузки

    try {
      const response = await fetch('https://api.onorrem.ru/api/saveUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(`Ошибка при отправке данных: ${result.message || 'Неизвестная ошибка'}`);
      }

      console.log('Ответ от сервера:', result);

      // Скрываем форму и кнопку после успешной отправки
      setTimeout(() => {
        setFormVisible(false);
        setButtonVisible(false);
        setNotificationVisible(true);
      }, 500); // Даем небольшой промежуток для завершения анимации

      // Через 2 сек скрываем уведомление
      setTimeout(() => setNotificationVisible(false), 2000);

    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setIsLoading(false); // Завершаем загрузку
    }
  };

  return (
    <section
      id="hero"
      className="relative bg-center"
      style={{
        backgroundImage: `url(${mainImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 60%',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <Parallax speed={-10}>
        <motion.div
          className="container text-gray-200 mx-auto text-center relative z-10 text-white flex flex-col justify-between py-8 sm:py-4 h-full sm:h-auto"
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl text-gray-200 sm:text-5xl font-bold sm:font-semibold sm:mb-0 lg:mb-24 mb-20">
            Вернем жизнь вашей технике быстро и с гарантией!
          </h2>
        </motion.div>
      </Parallax>

      <div className="flex flex-col justify-center items-center lg:mt-32 w-full px-5">
        {/* Форма */}
        {formVisible && (
          <motion.div
            className="relative z-10 bg-gray-800 bg-opacity-80 p-6 rounded-md text-white shadow-lg w-full md:w-96"
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-2xl text-gray-200 mb-6 text-center">Оставьте заявку</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5">
                <input
                  id="name"
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full p-3 bg-gray-700 text-white rounded-md"
                  {...register('name', { required: 'Имя обязательно' })}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div className="mb-4">
                <input
                  id="phone"
                  type="tel"
                  placeholder="Ваш телефон"
                  className="w-full p-3 bg-gray-700 text-white rounded-md"
                  {...register('phone', { required: 'Номер обязателен' })}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>
            </form>
          </motion.div>
        )}

        {/* Кнопка "Заказать мастера" */}
        {buttonVisible && (
          <motion.div className="mt-8 mb-8">
            <button
              className="relative z-10 bg-gray-900 w-[180px] text-gray-200 py-3 px-6 rounded-full text-xl hover:bg-orange-600 transition duration-300"
              onClick={handleSubmit(onSubmit)} // Теперь handleSubmit сразу вызывает onSubmit
              disabled={isLoading}
            >
              {isLoading ? `Загрузка${loadingDots}` : "Заказать мастера"}
            </button>
          </motion.div>
        )}

        {/* Уведомление о успешной отправке */}
        {notificationVisible && (
          <motion.div
            className="mb-8 z-10 bg-green-500 bg-opacity-50 text-white p-8 rounded-md shadow-lg text-3xl"
            initial="hidden"
            animate="visible"
          >
            <p className="text-center">Вам перезвонят!</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero;
