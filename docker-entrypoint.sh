#!/bin/sh
set -e

# Проверяем доступность файлов приложения
if [ ! -f /usr/share/nginx/html/index.html ]; then
  echo "ERROR: index.html not found!"
  exit 1
fi

# Проверяем наличие JS бандлов
JS_BUNDLES=$(find /usr/share/nginx/html -name "*.js" | wc -l)
if [ "$JS_BUNDLES" -eq 0 ]; then
  echo "WARNING: No JavaScript bundles found!"
fi

# Выводим информацию о доступных файлах
echo "Available files:"
ls -la /usr/share/nginx/html

# Проверяем наличие конфигурации nginx
if [ ! -f /etc/nginx/conf.d/default.conf ]; then
  echo "ERROR: Nginx configuration not found!"
  exit 1
fi

echo "Starting Nginx server..."
exec "$@"
