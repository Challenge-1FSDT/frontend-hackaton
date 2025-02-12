import { API_BASE_URL } from '../services/api';

export const SubjectService = {
  async getSubjects(): Promise<{ data: { id: string; name: string }[] }> {
    try {
      const response = await fetch(`${API_BASE_URL}subjects?schoolId=${localStorage.getItem('selectedSchool')}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar disciplinas');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error);
      return { data: [] };
    }
  },

  async selectSubject(subjectId: string): Promise<void> {
    localStorage.setItem('selectedSubject', subjectId);
  },

  async getSubject(subjectId: string): Promise<{ id: string; name: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}subjects/${subjectId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar disciplina');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar disciplina:', error);
      return { id: '', name: '' };
    }
  }
};
