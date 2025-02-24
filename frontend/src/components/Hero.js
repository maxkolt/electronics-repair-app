import React, { useState } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import mainImage from '../assets/главная.jpg'; // Импортируем картинку

const Hero = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formVisible, setFormVisible] = useState(true);  // Состояние для формы
  const [buttonVisible, setButtonVisible] = useState(true);  // Состояние для кнопки
  const [notificationVisible, setNotificationVisible] = useState(false);  // Состояние для уведомления

  const onSubmit = async (data) => {
    try {
      // Отправка данных на сервер
      const response = await fetch('http://localhost:5000/api/saveUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Логируем ответ от сервера
      const result = await response.json();
      console.log('Ответ от сервера:', result);

      if (!response.ok) {
        throw new Error('Ошибка при отправке данных');
      }

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
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const formVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <section
      id="hero"
      className="relative bg-center"
      style={{
        backgroundImage: `url(${mainImage})`,
        backgroundSize: 'cover', // Растягиваем изображение, сохраняя пропорции
        backgroundPosition: 'center 60%', // Центрируем изображение по горизонтали и вертикали
        height: 'calc(75vh + 40px)', // Увеличиваем высоту блока
      }}
    >
      {/* Затемняем фон */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <Parallax speed={-10}>
        <motion.div
          className="container mx-auto text-center relative z-10 text-white flex flex-col justify-between py-8 sm:py-4 h-full sm:h-auto"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          {/* Заголовок */}
          <h2 className="text-4xl sm:text-5xl font-bold sm:font-semibold -mt-12">
            Вернем жизнь вашей технике быстро и с гарантией!
          </h2>
        </motion.div>
      </Parallax>

      {/* Контейнер для формы и кнопки */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col justify-center w-full items-center pl-3 pr-3 sm:px-4 md:w-96">
        {/* Форма */}
        {formVisible && (
          <motion.div
            className="bg-gray-800 bg-opacity-80 p-6 rounded-md text-white shadow-lg w-full md:w-96"
            initial="hidden"
            animate="visible"
            variants={formVariants}
          >
            <h3 className="text-2xl mb-4 text-center">Оставьте заявку</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2">Имя</label>
                <input
                  id="name"
                  type="text"
                  className="w-full p-3 bg-gray-700 text-white rounded-md"
                  {...register('name', { required: 'Имя обязательно' })}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block mb-2">Ваш номер</label>
                <input
                  id="phone"
                  type="text"
                  className="w-full p-3 bg-gray-700 text-white rounded-md"
                  {...register('phone', { required: 'Номер обязателен' })}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>
            </form>
          </motion.div>
        )}

        {/* Кнопка "Заказать мастера", расположенная внизу */}
        {buttonVisible && (
          <motion.div
            className="mt-6"
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
          >
            <button
              className="bg-gray-900 text-white py-3 px-6 rounded-full text-xl hover:bg-orange-600 transition duration-300"
              onClick={handleSubmit(onSubmit)} // Обработчик для отправки данных
            >
              Заказать мастера
            </button>
          </motion.div>
        )}

        {/* Уведомление о успешной отправке */}
        {notificationVisible && (
          <motion.div
            className="mt-4 bg-green-500 bg-opacity-50 text-white p-8 rounded-md shadow-lg text-3xl"
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <p className="text-center">Вам перезвонят!</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero;
