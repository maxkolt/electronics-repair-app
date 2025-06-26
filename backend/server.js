const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const sitemapRouter = require("./routes/sitemap");

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: ['https://onorrem.ru', 'https://www.onorrem.ru'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Подключение к базе данных
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Основные маршруты
app.use("/api", userRoutes);
app.use("/sitemap.xml", sitemapRouter); // корректный путь

// Тестовый маршрут
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Проверка здоровья (Fly.io будет использовать)
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Логируем доступные роуты (в dev)
if (process.env.NODE_ENV !== 'production') {
  app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
      console.log(`Route: ${r.route.path}`);
    }
  });
}

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
