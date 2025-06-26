# ===== СТАДИЯ 1: билд React frontend =====
FROM node:18 AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# ===== СТАДИЯ 2: backend + билд =====
FROM node:18

WORKDIR /app

# Установим зависимости backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Копируем backend код
COPY backend/ ./backend/

# Копируем собранный frontend build в backend/public
COPY --from=frontend-build /app/frontend/build ./backend/public

# Переключаемся в директорию backend
WORKDIR /app/backend

# Запуск
CMD ["node", "server.js"]
