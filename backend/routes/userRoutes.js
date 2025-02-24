const express = require('express');
const router = express.Router();
const { saveUser } = require('../controllers/userController');  // Импортируем контроллер

// Маршрут для сохранения пользователя
router.post('/saveUser', saveUser);

module.exports = router;
