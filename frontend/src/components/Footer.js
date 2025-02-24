import React from 'react';
import { PhoneIcon, MailIcon, LocationMarkerIcon } from '@heroicons/react/outline';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Ремонт техники. Все права защищены.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="tel:+1234567890" className="text-white hover:text-orange-500">
            <PhoneIcon className="w-6 h-6" />
          </a>
          <a href="mailto:info@repair.com" className="text-white hover:text-orange-500">
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
