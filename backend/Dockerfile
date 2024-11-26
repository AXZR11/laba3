FROM node:18

WORKDIR /usr/src/app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Пересобираем bcrypt для контейнера
RUN npm rebuild bcrypt --build-from-source

# Копируем остальные файлы
COPY . .

# Собираем TypeScript
RUN npm run build

CMD ["npm", "run", "start:prod"]
