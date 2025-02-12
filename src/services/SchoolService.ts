import { API_BASE_URL } from '../services/api';

export const SchoolService = {
  async getSchools(): Promise<{ data: { id: string; name: string }[] }> {
    try {
      const response = await fetch(`${API_BASE_URL}schools`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Erro ao buscar escolas');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar escolas:', error);
      return { data: [] };
    }
  },

  async selectSchool(schoolId: string): Promise<void> {
    localStorage.setItem('selectedSchool', schoolId);
  },
};