FROM node:18-alpine as build

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем переменные окружения
COPY ./env ./env

# Копируем остальные файлы
COPY . .

# Проверяем, что env-файлы доступны
RUN ls -la env
RUN cat env/.env.production || echo "Production env file not found"

# Выполняем сборку с явным указанием продакшн режима
RUN NODE_ENV=production npm run build

# Проверяем результаты сборки
RUN ls -la build
RUN ls -la build/assets || echo "No assets directory"
RUN find build -name "*.js" | head -5 || echo "No JS files found"

# Вторая стадия - nginx
FROM nginx:alpine

# Копируем собранные файлы из build
COPY --from=build /app/build /usr/share/nginx/html

# Создаём директорию для логов
RUN mkdir -p /var/log/nginx

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Проверяем содержимое директории
RUN ls -la /usr/share/nginx/html
RUN find /usr/share/nginx/html -name "*.js" | head -5 || echo "No JS files found in nginx html dir"

# Создаем файл для проверки здоровья
RUN echo "OK" > /usr/share/nginx/html/health.txt

# Добавляем скрипт для старта сервера
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

EXPOSE 3000

# Запускаем nginx через entrypoint скрипт
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
