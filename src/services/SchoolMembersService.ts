import { API_BASE_URL } from '../services/api';

export const SchoolMembersService = {
  async getSchoolMembers(): Promise<{ data: { id: string; firstName: string; role: string }[] }> {
    try {
      const response = await fetch(`${API_BASE_URL}schools/${localStorage.getItem('selectedSchool')}/members`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar membros da escola');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar membros da escola:', error);
      return { data: [] };
    }
  },
};