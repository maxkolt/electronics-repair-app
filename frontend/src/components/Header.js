import React from 'react';
import { PhoneIcon, MailIcon } from '@heroicons/react/outline';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'; // Иконки для Telegram и WhatsApp

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-5 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Название компании слева */}
        <h1 className="text-2xl font-bold">
          <a href="#hero" className="flex items-center">
            <span className="font-bold text-primary">OnO</span>
            <span className="font-normal text-secondary">Repair</span>
          </a>
        </h1>

        {/* Иконки справа */}
        <div className="flex space-x-8">
          {/* Иконки для Telegram и WhatsApp */}
          <a
            href="https://t.me/OnORepair"
            className="text-white hover:text-gray-400 transform hover:scale-110 transition duration-300"
            aria-label="Telegram"
          >
            <FaTelegramPlane className="w-6 h-6"/>
          </a>
          <a
            href="https://wa.me/+79255961151"
            className="text-white hover:text-gray-400 transform hover:scale-110 transition duration-300"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="w-6 h-6"/>
          </a>
          <a
            href="tel:+79255961151"
            className="text-white hover:text-gray-400 transform hover:scale-110 transition duration-300"
            aria-label="Позвонить"
          >
            <PhoneIcon className="w-6 h-6"/>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
