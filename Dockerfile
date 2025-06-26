# Stage 1: Build frontend
FROM node:18 AS build-frontend
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Run backend with built frontend
FROM node:18
WORKDIR /app

# Устанавливаем backend зависимости
COPY backend/package.json backend/package-lock.json ./
RUN npm install

# Копируем backend код
COPY backend/ ./

# Копируем собранный frontend в public
COPY --from=build-frontend /frontend/build ./public

# Запускаем сервер
CMD ["node", "server.js"]
