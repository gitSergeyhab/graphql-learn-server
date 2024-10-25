# Укажите базовый образ Node.js
FROM node:lts-alpine

# Установите рабочий каталог
WORKDIR /app

# Копируйте package.json и package-lock.json
COPY package*.json ./

# Установите зависимости
RUN npm install

# Копируйте остальные файлы приложения
COPY . .

# Укажите переменную окружения 
ENV PORT=3000
ENV ME_CONFIG_MONGODB_URL=mongodb://root:example@mongo:27017

# Экспортируйте порт
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "run", "dev"]
