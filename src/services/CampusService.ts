import { API_BASE_URL } from '../services/api';

export const CampusService = {
  async getCampus(): Promise<{ id: string; name: string; fantasyName: string; address: string; city: string; state: string; taxId: string }[]> {
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

      const jsonData = await response.json();

      const campusArray = Array.isArray(jsonData.data) ? jsonData.data : [jsonData.data];

      return campusArray;
    } catch (error) {
      console.error('Erro ao buscar campus:', error);
      return [{ id: '', name: '', fantasyName: '', address: '', city: '', state: '', taxId: '' }];
    }
  },

  async selectCampus(campusId: string): Promise<void> {
    localStorage.setItem('selectedCampus', campusId);
  },
};