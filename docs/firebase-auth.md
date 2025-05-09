# Firebase Authentication Setup

## Переменные окружения

Для работы с Firebase Authentication необходимо создать файл `.env` в папке `env/` со следующими переменными:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

Получить эти значения можно в консоли Firebase при создании нового проекта.

## Настройка Firebase для авторизации через Google

1. Зайдите в консоль Firebase: https://console.firebase.google.com/
2. Выберите ваш проект
3. В левом меню перейдите в раздел "Authentication"
4. На вкладке "Sign-in method" включите метод входа "Google"
5. Укажите email для поддержки и сохраните настройки

## Использование Firebase Auth в компонентах

Для использования функций авторизации импортируйте хук `useAuth`:

```tsx
import { useAuth } from 'services/AuthContext';

function MyComponent() {
  const {
    isAuthenticated,
    currentUser,
    loginWithGoogle,
    logout
  } = useAuth();

  // Пример использования
  // Проверка авторизован ли пользователь
  if (isAuthenticated) {
    console.log('User is logged in:', currentUser);
  }

  // Вход через Google
  const handleGoogleAuth = async () => {
    try {
      await loginWithGoogle();
      console.log('Successfully logged in with Google');
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  // Выход
  const handleLogout = async () => {
    try {
      await logout();
      console.log('Successfully logged out');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      {/* Компонент */}
    </div>
  );
}
```

## Текущая реализация

На данный момент в проекте реализована авторизация через Google с использованием popup окна. Когда пользователь нажимает на кнопки "Login" или "Sign Up" в шапке сайта, открывается модальное окно с возможностью войти через Google аккаунт.

Если пользователь авторизован, вместо кнопок "Login" и "Sign Up" отображается кнопка "Exit" для выхода из аккаунта.

## Дополнительные функции авторизации

Для расширения функциональности авторизации можно добавить следующие возможности:

1. Авторизация через другие провайдеры: Facebook, Twitter, GitHub и др.
2. Авторизация по email и паролю
3. Восстановление пароля
4. Верификация email
5. Обновление профиля пользователя

Эти функции можно реализовать, расширив сервис Firebase и контекст авторизации.
