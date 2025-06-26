import React, { useState, useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import mainImage from '../assets/главная.jpg';

const Hero = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formVisible, setFormVisible] = useState(true);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState("");
  const [consentGiven, setConsentGiven] = useState(true); // согласие по умолчанию

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 300);
      return () => clearInterval(interval);
    } else {
      setLoadingDots("");
    }
  }, [isLoading]);

  const handleClick = async () => {
    if (!consentGiven) return;
    setIsLoading(true);
    await handleSubmit(onSubmit)();
    setIsLoading(false);
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://onorrem.ru/api/saveUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Ошибка при отправке');

      console.log('Ответ от сервера:', result);

      setFormVisible(false);
      setButtonVisible(false);
      setNotificationVisible(true);
      setTimeout(() => setNotificationVisible(false), 2000);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut', delay: 0.5 } },
  };

  const formVariants = {
    hidden: { opacity: 0, y: -70 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut', delay: 0.3 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.7 } },
  };

  const notificationVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
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
          variants={titleVariants}
        >
          <h2 className="text-3xl text-gray-200 sm:text-5xl font-bold sm:font-semibold sm:mb-0 lg:mb-24 mb-20">
            Вернем жизнь вашей технике быстро и с гарантией!
          </h2>
        </motion.div>
      </Parallax>

      <div className="flex flex-col justify-center items-center lg:mt-32 w-full px-5">
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

              {/* Чекбокс согласия */}
              <div
                onClick={() => setConsentGiven(!consentGiven)}
                className="flex items-center mb-4 cursor-pointer select-none whitespace-nowrap"
              >
                <div className="w-5 h-5 flex items-center justify-center rounded border border-gray-400 mr-2 bg-gray-900">
                  {consentGiven && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <p className="text-xs text-gray-300 underline decoration-gray-400 underline-offset-2 leading-snug">
                  Я даю согласие на обработку персональных данных
                </p>
              </div>
            </form>
          </motion.div>
        )}

        {buttonVisible && (
          <motion.div
            className="mt-8 mb-8"
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
          >
            <button
              className={`relative z-10 py-3 px-6 rounded-full text-xl transition duration-300 ${
                consentGiven
                  ? 'bg-gray-900 text-gray-200 hover:bg-orange-600'
                  : 'bg-gray-800 bg-opacity-80 text-gray-300 cursor-not-allowed'
              }`}
              onClick={handleClick}
              disabled={isLoading || !consentGiven}
            >
              {isLoading ? `Загрузка${loadingDots}` : "Заказать мастера"}
            </button>
          </motion.div>
        )}

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
