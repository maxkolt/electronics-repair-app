import React from 'react';
import { PhoneIcon, MailIcon, LocationMarkerIcon } from '@heroicons/react/outline';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto text-center space-y-4">
        <p>&copy; 2025 OnORem. Все права защищены.</p>

        {/* Ссылка на политику */}
        <a href="/privacy-policy.pdf" className="text-sm text-gray-200 hover:text-gray-400" target="_blank" rel="noopener noreferrer">
          Политика конфиденциальности
        </a>

        <div className="flex justify-center space-x-6">
          <a href="tel:+79255961151" className="text-white hover:text-orange-500">
            <PhoneIcon className="w-6 h-6" />
          </a>
          <a href="mailto:12345kolt@gmail.com" className="text-white hover:text-orange-500">
            <MailIcon className="w-6 h-6" />
          </a>
          <a href="https://goo.gl/maps" className="text-white hover:text-orange-500">
            <LocationMarkerIcon className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
