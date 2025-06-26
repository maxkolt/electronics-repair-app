import React, { useState, useEffect } from 'react';

const ContactForm = () => {
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState("");
  const [consentGiven, setConsentGiven] = useState(true); // По умолчанию: согласие дано

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);
      return () => clearInterval(interval);
    } else {
      setLoadingDots("");
    }
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consentGiven) return alert("Необходимо согласие на обработку персональных данных");

    setIsLoading(true);
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
    };

    try {
      const response = await fetch('https://electronics-repair-app.onrender.com/api/saveUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('Ответ от сервера:', result);

      if (!response.ok) throw new Error('Ошибка при отправке данных');

      setNotificationVisible(true);
      setTimeout(() => setNotificationVisible(false), 2000);
      e.target.reset();
      setConsentGiven(true); // Возвращаем флаг в true

    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-gray-50 py-10" data-aos="fade-up">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-semibold mb-6">Оставьте заявку</h3>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">

          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Ваш телефон"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            required
          />

          {/* Кастомный чекбокс */}
          <label onClick={() => setConsentGiven(!consentGiven)} className="flex items-center mb-4 cursor-pointer select-none">
            <div
              className={`w-5 h-5 flex items-center justify-center rounded border border-gray-300 mr-2 ${
                consentGiven ? 'bg-gray-900' : 'bg-white'
              }`}
            >
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
            <p className="text-xs text-gray-900 underline decoration-gray-400 underline-offset-2 leading-snug">
              Я даю согласие на обработку персональных данных
            </p>
          </label>

          <button
            type="submit"
            className={`py-2 px-6 rounded-full text-lg transition duration-300 w-auto mt-4 ${
              consentGiven
                ? 'bg-gray-900 text-white hover:bg-orange-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={isLoading || !consentGiven}
          >
            {isLoading ? `Загрузка${loadingDots}` : "Заказать мастера"}
          </button>
        </form>

        {notificationVisible && (
          <div className="flex justify-center items-center mt-10">
            <div className="bg-green-500 bg-opacity-70 text-white p-6 rounded-md shadow-lg text-2xl w-80 max-w-full mx-auto">
              Вам перезвонят!
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
