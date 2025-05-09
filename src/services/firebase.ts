import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  browserPopupRedirectResolver,
  signInWithRedirect,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

// Конфигурация Firebase из переменных окружения
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Инициализация Firebase и Google провайдера
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Интерфейс для ответа авторизации с JWT
export interface AuthResponse {
  jwt: string;
  userId: string | number;
}

// Функция для авторизации через Google с получением JWT
export const signInWithGoogleAndGetJWT = async (): Promise<AuthResponse> => {
  try {
    // Пробуем popup сначала
    const result = await signInWithPopup(auth, googleProvider, browserPopupRedirectResolver);

    if (result.user) {
      try {
        // Имитируем получение JWT из бэкенда
        const mockJwt = `mock-jwt-${result.user.uid}-${Date.now()}`;
        const userId = result.user.uid;

        // Сохраняем данные в localStorage
        localStorage.setItem('humate_jwt_token', mockJwt);
        localStorage.setItem('humate_user_id', userId);

        return {
          jwt: mockJwt,
          userId: userId,
        };
      } catch (backendError) {
        console.error('Backend authentication error:', backendError);
        // В случае ошибки, просто возвращаем Firebase user ID
        localStorage.setItem('humate_user_id', result.user.uid);
        throw backendError; // Перебрасываем ошибку дальше для обработки
      }
    }
    throw new Error('No user data returned from Google authentication');
  } catch (error) {
    console.error('Google sign-in error:', error);

    // Проверяем ошибку на тип FirebaseError более безопасным способом
    const fbError = error as FirebaseError;
    if (fbError.code === 'auth/popup-blocked') {
      try {
        await signInWithRedirect(auth, googleProvider);
        // Это не выполнится, так как страница перенаправится
        return { jwt: '', userId: '' };
      } catch (redirectError) {
        console.error('Redirect error:', redirectError);
        throw redirectError;
      }
    }
    throw error;
  }
};

// Функция для авторизации через Google popup
export const signInWithGoogle = async () => {
  try {
    // Пробуем popup сначала
    return await signInWithPopup(auth, googleProvider, browserPopupRedirectResolver);
  } catch (error) {
    console.error('Google sign-in error:', error);

    // Проверяем ошибку на тип FirebaseError
    const fbError = error as FirebaseError;
    if (fbError.code === 'auth/popup-blocked') {
      try {
        // Если popup заблокирован, пробуем redirect
        await signInWithRedirect(auth, googleProvider);
        // Это не выполнится, так как страница перенаправится
        return null;
      } catch (redirectError) {
        console.error('Redirect error:', redirectError);
        throw redirectError;
      }
    }
    throw error;
  }
};

// Стандартные функции для работы с аутентификацией
export const loginWithEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmailAndPassword = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  // Очищаем JWT токены при выходе
  localStorage.removeItem('humate_jwt_token');
  localStorage.removeItem('humate_user_id');
  return signOut(auth);
};

export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Экспортируем auth для использования в других модулях
export { auth, googleProvider };
