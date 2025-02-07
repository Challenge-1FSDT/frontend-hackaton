const API_BASE_URL = 'https://85ecddd9fc29.ngrok.app/';

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

export const SchoolService = {
  async getSchools(): Promise<{ id: string; name: string }[]> {
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
      return [];
    }
  },

  async selectSchool(schoolId: string): Promise<void> {
    localStorage.setItem('selectedSchool', schoolId);
  },
};

export const SubjectService = {
  async getSubjects(): Promise<{ id: string; name: string }[]> {
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
      return [];
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

export const CampusService = {
  async getCampus(): Promise<{ id: string; name: string, fantasyName: string; address: string; city: string; state: string }[]> {
    try {
      const response = await fetch(`${API_BASE_URL}schools/${localStorage.getItem('selectedSchool')}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar campus');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar campus:', error);
      return [];
    }
  },

  async selectCampus(campusId: string): Promise<void> {
    localStorage.setItem('selectedCampus', campusId);
  },
};