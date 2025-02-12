import { API_BASE_URL } from '../services/api';

export const ClassroomsService = {
  async getClassrooms(): Promise<{ data: { id: string; name: string }[] }> {
    try {
      const response = await fetch(`${API_BASE_URL}classrooms?schoolId=${localStorage.getItem('selectedSchool')}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar turmas');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar turmas:', error);
      return { data: [] };
    }
  },
};