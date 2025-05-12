import { initializeApp, FirebaseApp, FirebaseError } from 'firebase/app';
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
  Auth,
} from 'firebase/auth';

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

// Проверка готовности Firebase
let isFirebaseInitialized = false;
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let googleProvider: GoogleAuthProvider | undefined;

/**
 * Инициализирует Firebase, если он еще не инициализирован
 */
export const initializeFirebase = () => {
  if (!isFirebaseInitialized) {
    try {
      // Инициализация Firebase и Google провайдера
      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      googleProvider = new GoogleAuthProvider();
      isFirebaseInitialized = true;
      console.log('Firebase successfully initialized');
    } catch (error) {
      console.error('Firebase initialization error:', error);
      throw error;
    }
  }
  return { app, auth, googleProvider };
};

// Инициализируем Firebase при импорте модуля
initializeFirebase();

// Интерфейс для ответа авторизации с JWT
export interface AuthResponse {
  jwt: string;
  userId: string | number;
}

/**
 * Проверяет, что Firebase инициализирован
 */
export const ensureFirebaseInitialized = () => {
  if (!isFirebaseInitialized) {
    initializeFirebase();
  }
  return isFirebaseInitialized;
};

/**
 * Получает экземпляры Firebase с проверкой инициализации
 * @private
 */
const getFirebaseInstances = () => {
  ensureFirebaseInitialized();
  if (!auth || !googleProvider) {
    throw new Error('Firebase not properly initialized');
  }
  return { auth, googleProvider };
};

/**
 * Выполняет авторизацию через Google и получает JWT
 */
export const signInWithGoogleAndGetJWT = async (): Promise<AuthResponse> => {
  const { auth, googleProvider } = getFirebaseInstances();

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
        const { auth, googleProvider } = getFirebaseInstances();
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

/**
 * Выполняет авторизацию через Google popup
 */
export const signInWithGoogle = async () => {
  const { auth, googleProvider } = getFirebaseInstances();

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
        const { auth, googleProvider } = getFirebaseInstances();
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

/**
 * Авторизация с email и паролем
 */
export const loginWithEmailAndPassword = (email: string, password: string) => {
  const { auth } = getFirebaseInstances();
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Регистрация с email и паролем
 */
export const registerWithEmailAndPassword = (email: string, password: string) => {
  const { auth } = getFirebaseInstances();
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Выход пользователя
 */
export const logoutUser = () => {
  const { auth } = getFirebaseInstances();
  // Очищаем JWT токены при выходе
  localStorage.removeItem('humate_jwt_token');
  localStorage.removeItem('humate_user_id');
  return signOut(auth);
};

/**
 * Подписка на изменения состояния авторизации
 */
export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  const { auth } = getFirebaseInstances();
  return onAuthStateChanged(auth, callback);
};

/**
 * Получение текущего аутентифицированного пользователя
 */
export const getCurrentUser = (): User | null => {
  try {
    const { auth } = getFirebaseInstances();
    return auth.currentUser;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};
