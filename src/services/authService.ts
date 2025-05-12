// Этот файл оставлен для совместимости с импортами
// Весь функционал перенесен в grpcAdapter.ts

import { ensureFirebaseInitialized, getCurrentUser } from './firebase';

// Простой интерфейс для результата аутентификации
interface AuthResult {
  jwtToken: string;
  userId: string;
}

/**
 * Сервис аутентификации
 */
export const authService = {
  /**
   * Инициализирует Firebase
   */
  initialize: async (): Promise<boolean> => {
    return ensureFirebaseInitialized();
  },

  /**
   * Получает текущего пользователя через API Firebase
   */
  getCurrentUser: () => {
    return getCurrentUser();
  },

  /**
   * Имитирует авторизацию через Firebase
   */
  loginWithFirebase: async (uid: string): Promise<AuthResult> => {
    await Promise.resolve(ensureFirebaseInitialized());

    // Простая имитация получения токена с бэкенда
    return {
      jwtToken: `mock-jwt-${uid}-${Date.now()}`,
      userId: uid,
    };
  },
};
