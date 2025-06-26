import React from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon } from '@heroicons/react/outline';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-8 space-y-2 md:space-y-0">
        {/* Логотип */}
        <h1 className="text-4xl font-bold flex-shrink-0">
          <a href="#hero" className="flex items-center">
            <span className="font-bold text-primary">OnO</span>
            <span className="font-normal text-gray-200 text-secondary">Rem</span>
          </a>
        </h1>

        {/* Плашка скидки с эффектом падения через 2 секунды */}
        <motion.div
          initial={{y: -100, opacity: 0, scale: 0.8}}
          animate={{y: 0, opacity: 1, scale: 1}}
          transition={{delay: 1.3, type: "spring", stiffness: 100, damping: 10, duration: 1}}
            className="font-secondary relative flex items-center justify-center px-3 tracking-widest text-gray-400 text-base md:text-lg shadow-inner"
        >
          Скидка&nbsp;<span className="text-gray-300 font-semibold md:font-bold">10%</span>&nbsp;при заказе с сайта
        </motion.div>

        {/* Контакты */}
        <div className="flex space-x-8 md:space-x-8">
          <a
            href="https://t.me/OnORepair"
            className="text-white hover:text-gray-400 transform hover:scale-110 transition duration-300"
            aria-label="Telegram"
          >
            <FaTelegramPlane className="w-7 h-7 md:w-8 md:h-8" />
          </a>
          <a
            href="https://wa.me/+79255961151"
            className="text-white hover:text-gray-400 transform hover:scale-110 transition duration-300"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="w-7 h-7 md:w-8 md:h-8" />
          </a>
          <a
            href="tel:+79255961151"
            className="text-white hover:text-gray-400 transform hover:scale-110 transition duration-300"
            aria-label="Позвонить"
          >
            <PhoneIcon className="w-7 h-7 md:w-8 md:h-8" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
