import React, { useState } from 'react';

const ContactForm = () => {
  const [notificationVisible, setNotificationVisible] = useState(false);  // Состояние для уведомления

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
    };

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

      // После успешной отправки, показываем уведомление
      setNotificationVisible(true);

      // Скрываем уведомление через 3 секунды
      setTimeout(() => setNotificationVisible(false), 2000);

      // Очищаем форму после отправки
      e.target.reset();

    } catch (error) {
      console.error('Ошибка:', error);
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
          {/* Кнопка отправки */}
          <button
            type="submit"
            className="bg-gray-900 text-white py-2 px-6 rounded-full text-lg hover:bg-orange-600 transition duration-300 w-auto mt-4"
          >
            Заказать мастера
          </button>
        </form>

        {/* Уведомление о успешной отправке */}
        {notificationVisible && (
          <div className="flex justify-center items-center mt-10">
            <div
              className="bg-green-500 bg-opacity-70 text-white p-6 rounded-md shadow-lg text-2xl w-80 max-w-full mx-auto">
              Вам перезвонят!
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
