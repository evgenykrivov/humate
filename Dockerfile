FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# Debug: показываем содержимое папки после сборки
RUN npm run build && ls -la dist

FROM nginx:alpine

# Копируем собранные файлы из build
COPY --from=build /app/dist /usr/share/nginx/html
# Создаём директорию для логов
RUN mkdir -p /var/log/nginx
# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Debug: показываем содержимое папки с файлами
RUN ls -la /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
