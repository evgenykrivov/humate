import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import './index.css';
import 'tailwindcss/tailwind.css';

import App from './App';
import { AuthProvider } from './services/AuthContext';
import { ensureFirebaseInitialized } from './services/firebase';

// Элемент для отображения состояния загрузки
const createLoadingElement = () => {
  const loadingElement = document.createElement('div');
  loadingElement.id = 'loading-screen';
  loadingElement.style.position = 'fixed';
  loadingElement.style.top = '0';
  loadingElement.style.left = '0';
  loadingElement.style.width = '100%';
  loadingElement.style.height = '100%';
  loadingElement.style.backgroundColor = '#ffffff';
  loadingElement.style.display = 'flex';
  loadingElement.style.justifyContent = 'center';
  loadingElement.style.alignItems = 'center';
  loadingElement.style.zIndex = '9999';

  const loadingText = document.createElement('div');
  loadingText.textContent = 'Загрузка...';
  loadingText.style.fontSize = '24px';
  loadingText.style.color = '#333333';

  loadingElement.appendChild(loadingText);
  return loadingElement;
};

// Функция для инициализации приложения
const initializeApp = async () => {
  const container = document.getElementById('root');
  if (!container) return;

  // Добавляем элемент загрузки
  const loadingElement = createLoadingElement();
  document.body.appendChild(loadingElement);

  try {
    // Инициализируем Firebase перед рендерингом
    await Promise.resolve(ensureFirebaseInitialized());

    // Удаляем элемент загрузки
    document.body.removeChild(loadingElement);

    // Рендерим приложение
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <AuthProvider>
          <App />
        </AuthProvider>
      </StrictMode>
    );
  } catch (error) {
    console.error('Error initializing app:', error);

    // Удаляем элемент загрузки и показываем ошибку
    document.body.removeChild(loadingElement);

    if (container) {
      container.innerHTML =
        '<div style="color: red; padding: 20px;">Ошибка загрузки приложения. Пожалуйста, обновите страницу.</div>';
    }
  }
};

// Запускаем инициализацию
initializeApp();
