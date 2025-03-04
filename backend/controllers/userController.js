const User = require('../models/User');  // Импортируем модель
const axios = require('axios');
const dotenv = require('dotenv');

// Загружаем переменные окружения из .env
dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Функция отправки сообщения в Telegram
const sendMessageToTelegram = async (message) => {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  try {
    await axios.post(url, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    });
    console.log('Сообщение отправлено в Telegram');
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error.response ? error.response.data : error.message);
  }
};

// Контроллер для сохранения пользователя
const saveUser = async (req, res) => {
  const { name, phone } = req.body;

  // Валидация данных
  if (!name || !phone) {
    return res.status(400).json({ message: 'Имя и номер обязательны' });
  }

  try {
    // Логируем входящие данные
    console.log('Полученные данные на сервере:', req.body);

    // Создаем нового пользователя
    const newUser = new User({
      name,
      phone,
    });

    // Сохраняем пользователя в базе данных
    await newUser.save();

    // Формируем сообщение для Telegram
    const message = `📞 <b>Новая заявка!</b>\n\n👤 Имя: <b>${name}</b>\n📱 Телефон: <b>${phone}</b>`;

    // Отправляем в Telegram
    await sendMessageToTelegram(message);

    // Отправляем успешный ответ
    console.log('Данные успешно сохранены и отправлены в Telegram');
    res.status(200).json({ message: 'Данные успешно сохранены и отправлены в Telegram' });
  } catch (error) {
    console.error('Ошибка при сохранении данных:', error);
    res.status(500).json({ message: 'Ошибка на сервере' });
  }
};

module.exports = {
  saveUser
};
