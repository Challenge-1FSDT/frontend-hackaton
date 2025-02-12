import { API_BASE_URL } from '../services/api';

export const LecturesService = {
  async getLectures(): Promise<{ data: { id: string; name: string; startAt: string; endAt: string; }[] }> {
    try {
      const startAt = new Date('2025-01-01T00:00:00.000Z').toISOString();
      const endAt = new Date('2025-12-31T23:59:59.999Z').toISOString();
      const response = await fetch(`${API_BASE_URL}lectures?schoolId=${localStorage.getItem('selectedSchool')}&startAt=${startAt}&endAt=${endAt}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar aulas');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar aulas:', error);
      return { data: [] };
    }
  },
};