FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# Debug: показываем содержимое папки public
RUN ls -la public
# Выполняем сборку
RUN npm run build
# Debug: показываем содержимое папки после сборки, в том числе изображения
RUN ls -la build
RUN ls -la build/assets || echo "No assets directory"
RUN find build -name "*.png" || echo "No PNG files found"

FROM nginx:alpine

# Копируем собранные файлы из build
COPY --from=build /app/build /usr/share/nginx/html
# Создаём директорию для логов
RUN mkdir -p /var/log/nginx
# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Debug: показываем содержимое папки с файлами
RUN ls -la /usr/share/nginx/html
RUN find /usr/share/nginx/html -name "*.png" || echo "No PNG files found in nginx html dir"

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
