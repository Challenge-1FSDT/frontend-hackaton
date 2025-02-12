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
  },
  
  async createSubject(name: string, description: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}subjects?schoolId=${localStorage.getItem('selectedSchool')}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ name, description, schoolId: localStorage.getItem('selectedSchool') }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar disciplina');
      }
    } catch (error) {
      console.error('Erro ao criar disciplina:', error);
    }
  },

  async deleteSubject(subjectId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}subjects/${subjectId}?schoolId=${localStorage.getItem('selectedSchool')}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar disciplina');
      }
    } catch (error) {
      console.error('Erro ao deletar disciplina:', error);
    }
  },
};
