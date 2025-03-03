const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const sitemapRouter = require("./routes/sitemap");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

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

// Используем маршруты
app.use("/", sitemapRouter);
app.use('/api', userRoutes);

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
