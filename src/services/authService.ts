// Этот файл оставлен для совместимости с импортами
// Весь функционал перенесен в grpcAdapter.ts

import { auth } from './firebase';

export const authService = {
  getCurrentUser: () => auth.currentUser,

  loginWithFirebase: async (uid: string) => {
    // Простая имитация получения токена с бэкенда
    return {
      jwtToken: `mock-jwt-${uid}-${Date.now()}`,
      userId: uid,
    };
  },
};
