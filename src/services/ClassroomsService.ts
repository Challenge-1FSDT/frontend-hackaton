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

  async createClassroom(name: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}classrooms?schoolId=${localStorage.getItem('selectedSchool')}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          name,
          schoolId: localStorage.getItem('selectedSchool'),
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar turma');
      }
    } catch (error) {
      console.error('Erro ao criar turma:', error);
    }
  },

  async deleteClassroom(classroomId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}classrooms/${classroomId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar turma');
      }
    } catch (error) {
      console.error('Erro ao deletar turma:', error);
    }
  }
};