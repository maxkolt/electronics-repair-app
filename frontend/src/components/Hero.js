import React, { useState } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import mainImage from '../assets/главная.jpg'; // Импортируем картинку

const Hero = () => {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const [formVisible, setFormVisible] = useState(true);  // Состояние для формы
  const [buttonVisible, setButtonVisible] = useState(true);  // Состояние для кнопки
  const [notificationVisible, setNotificationVisible] = useState(false);  // Состояние для уведомления

  const onSubmit = async (data) => {
    try {
      // Отправка данных на сервер
      const response = await fetch('https://electronics-repair-app.onrender.com/api/saveUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Получаем результат от сервера
      const result = await response.json();

      // Проверяем успешность ответа
      if (!response.ok) {
        throw new Error(`Ошибка при отправке данных: ${result.message || 'Неизвестная ошибка'}`);
      }

      console.log('Ответ от сервера:', result);

      // После успешной отправки, скрываем форму и показываем уведомление
      setFormVisible(false);
      setButtonVisible(false);
      setNotificationVisible(true);

      // Скрываем уведомление через 3 секунды
      setTimeout(() => setNotificationVisible(false), 2000);

    } catch (error) {
      console.error('Ошибка:', error);
    }
  };


  // Элементы анимации
  const titleVariants = {
    hidden: {opacity: 0, y: -50},
    visible: {
      opacity: 1,
      y: 0,
      transition: {duration: 1, ease: 'easeOut', delay: 0.5} // Добавили задержку и смягчение
    },
  };

  const formVariants = {
    hidden: {opacity: 0, y: -70},
    visible: {
      opacity: 1,
      y: 0,
      transition: {duration: 0.8, ease: 'easeInOut', delay: 0.3} // Сделали форму чуть быстрее
    },
  };

  const buttonVariants = {
    hidden: {opacity: 0, y: 50},
    visible: {
      opacity: 1,
      y: 0,
      transition: {duration: 0.8, ease: 'easeOut', delay: 0.7} // Кнопку делаем самой последней
    },
  };

  const notificationVariants = {
    hidden: {opacity: 0, scale: 0.9},
    visible: {
      opacity: 1,
      scale: 1,
      transition: {duration: 0.5, ease: 'easeOut'} // Быстрое появление уведомления
    },
  };


  return (
    <section
      id="hero"
      className="relative bg-center"
      style={{
        backgroundImage: `url(${mainImage})`,
        backgroundSize: 'cover', // Растягиваем изображение, сохраняя пропорции
        backgroundPosition: 'center 60%',
      }}
    >
      {/* Затемняем фон */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <Parallax speed={-10}>
        <motion.div
          className="container text-gray-200 mx-auto text-center relative z-10 text-white flex flex-col justify-between py-8 sm:py-4 h-full sm:h-auto"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          {/* Заголовок */}
          <h2 className="text-3xl text-gray-200 sm:text-5xl font-bold sm:font-semibold sm:mb-0 lg:mb-24 mb-20">
            Вернем жизнь вашей технике быстро и с гарантией!
          </h2>
        </motion.div>
      </Parallax>

      {/* Контейнер для формы и кнопки */}
      <div className="flex flex-col justify-center items-center lg:mt-32 w-full px-3 sm:px-3">
        {/* Форма */}
        {formVisible && (
          <motion.div
            className="relative z-10 bg-gray-800 bg-opacity-80 p-6 rounded-md text-white shadow-lg w-full md:w-96"
            initial="hidden"
            animate="visible"
            variants={formVariants}
          >
            <h3 className="text-2xl text-gray-200 mb-6 text-center">Оставьте заявку</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5">
                <input
                  id="name"
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full p-3 bg-gray-700 text-white rounded-md"
                  {...register('name', {required: 'Имя обязательно'})}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div className="mb-4">
                <input
                  id="phone"
                  type="tel"
                  placeholder="Ваш телефон"
                  className="w-full p-3 bg-gray-700 text-white rounded-md"
                  {...register('phone', {required: 'Номер обязателен'})}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>
            </form>
          </motion.div>
        )}

        {/* Кнопка "Заказать мастера", расположенная внизу */}
        {buttonVisible && (
          <motion.div
            className="mt-8 mb-8"
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
          >
            <button
              className="relative z-10 bg-gray-900 text-gray-200 py-3 px-6 rounded-full text-xl hover:bg-orange-600 transition duration-300"
              onClick={handleSubmit(onSubmit)} // Обработчик для отправки данных
            >
              Заказать мастера
            </button>
          </motion.div>
        )}

        {/* Уведомление о успешной отправке */}
        {notificationVisible && (
          <motion.div
            className="mb-8 z-10 bg-green-500 bg-opacity-50 text-white p-8 rounded-md shadow-lg text-3xl"
            initial="hidden"
            animate="visible"
            variants={notificationVariants}
          >
            <p className="text-center">Вам перезвонят!</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero;
