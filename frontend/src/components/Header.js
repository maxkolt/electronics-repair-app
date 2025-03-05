import React from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon } from '@heroicons/react/outline';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-8 space-y-2 md:space-y-0">
        {/* Логотип */}
        <h1 className="text-2xl font-bold flex-shrink-0">
          <a href="#hero" className="flex items-center">
            <span className="font-bold text-primary">OnO</span>
            <span className="font-normal text-gray-200 text-secondary">Rem</span>
          </a>
        </h1>

        {/* Плашка скидки */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="w-full md:w-auto flex items-center justify-center px-4 py-2 border border-gray-200 text-gray-200 text-xs md:text-sm rounded-lg overflow-hidden"
        >
          Скидка 15% при заказе с сайта
        </motion.div>

        {/* Контакты */}
        <div className="flex space-x-4 md:space-x-6">
          <a
            href="https://t.me/OnORepair"
            className="text-white hover:text-gray-400 transform hover:scale-110 transition duration-300"
            aria-label="Telegram"
          >
            <FaTelegramPlane className="w-5 h-5 md:w-6 md:h-6" />
          </a>
          <a
            href="https://wa.me/+79255961151"
            className="text-white hover:text-gray-400 transform hover:scale-110 transition duration-300"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="w-5 h-5 md:w-6 md:h-6" />
          </a>
          <a
            href="tel:+79255961151"
            className="text-white hover:text-gray-400 transform hover:scale-110 transition duration-300"
            aria-label="Позвонить"
          >
            <PhoneIcon className="w-5 h-5 md:w-6 md:h-6" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
