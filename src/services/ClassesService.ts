import { API_BASE_URL } from '../services/api';

export const ClassesService = {
  async getClasses(): Promise<{ data: { id: string; name: string }[] }> {
    try {
      const response = await fetch(`${API_BASE_URL}classes?schoolId=${localStorage.getItem('selectedSchool')}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar classes');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar classes:', error);
      return { data: [] };
    }
  },

  async getClass(classId: string): Promise<{ id: string; name: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}classes/${classId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar classe');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar classe:', error);
      return { id: '', name: '' };
    }
  },

  async getStudents(): Promise<{ data: { id: string; name: string; role: string }[] }> {
    try {
      const response = await fetch(`${API_BASE_URL}classes/${localStorage.getItem('selectedClass')}/students?schoolId=${localStorage.getItem('selectedSchool')}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar alunos');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      return { data: [] };
    }
  },

  async selectClassId(classId: string): Promise<void> {
    localStorage.setItem('selectedClass', classId);
  },

  async selectClassName(name: string): Promise<void> {
    localStorage.setItem('selectedClassName', name);
  }
};