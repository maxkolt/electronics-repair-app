import React from 'react';
import { CheckIcon } from '@heroicons/react/outline';

const Advantages = () => {
  return (
    <section className="bg-gray-50 py-20" id="advantages">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-semibold mb-6" data-aos="fade-up">Наши преимущества</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="bg-white p-6 shadow-lg rounded-lg" data-aos="fade-up">
            <CheckIcon className="w-10 h-10 text-green-500 mb-3" />
            <h4 className="text-xl font-bold mb-3">Бесплатная диагностика</h4>
            <p>Мы бесплатно проведем диагностику вашей техники.</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg" data-aos="fade-up">
            <CheckIcon className="w-10 h-10 text-green-500 mb-3" />
            <h4 className="text-xl font-bold mb-3">Ремонт за 24 часа</h4>
            <p>Мы быстро устраним все неисправности!</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg" data-aos="fade-up">
            <CheckIcon className="w-10 h-10 text-green-500 mb-3" />
            <h4 className="text-xl font-bold mb-3">Гарантия до 1 года</h4>
            <p>Предоставляем гарантию на все выполненные работы.</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg" data-aos="fade-up">
            <CheckIcon className="w-10 h-10 text-green-500 mb-3" />
            <h4 className="text-xl font-bold mb-3">Выезд мастера на дом</h4>
            <p>Наши специалисты приедут к вам в любое время.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
