const User = require('../models/User');  // Импортируем модель

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
      phone,  // добавляем поле для номера телефона
    });

    // Сохраняем пользователя в базе данных
    await newUser.save();

    // Отправляем успешный ответ
    console.log('Данные успешно сохранены');
    res.status(200).json({ message: 'Данные успешно сохранены' });
  } catch (error) {
    console.error('Ошибка при сохранении данных:', error);
    res.status(500).json({ message: 'Ошибка на сервере' });
  }
};

module.exports = {
  saveUser
};
