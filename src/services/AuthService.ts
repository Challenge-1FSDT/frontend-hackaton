import { API_BASE_URL } from '../services/api';

export const AuthService = {
  async login(email: string, password: string): Promise<string | null> {
    try {
      const response = await fetch(`${API_BASE_URL}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        return error.message;
      }

      const data = await response.json();

      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      return null;
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      return 'Falha ao autenticar';
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  },
};