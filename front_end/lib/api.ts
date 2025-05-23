import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Patient API
export const patientApi = {
  getAll: async () => {
    const response = await api.get('/patients');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/patients/${id}`);
    return response.data;
  },
  
  create: async (data: any) => {
    const response = await api.post('/patients', data);
    return response.data;
  },
  
  update: async (id: string, data: any) => {
    const response = await api.put(`/patients/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    await api.delete(`/patients/${id}`);
  }
};

// Medecin API
export const medecinApi = {
  getAll: async () => {
    const response = await api.get('/medecins');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/medecins/${id}`);
    return response.data;
  }
};

// Contact Urgence API
export const contactUrgenceApi = {
  getByPatientId: async (patientId: string) => {
    const response = await api.get(`/contacts-urgence/patient/${patientId}`);
    return response.data;
  }
};

// Document Patient API
export const documentPatientApi = {
  getByPatientId: async (patientId: string) => {
    const response = await api.get(`/documents/patient/${patientId}`);
    return response.data;
  }
};

export default api;