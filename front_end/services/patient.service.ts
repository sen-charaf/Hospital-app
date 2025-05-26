import apiService from './api.service';
import { IPatient, ICreatePatientDto, IUpdatePatientDto } from '@/types/patient.types';

class PatientService {
  private baseUrl = '/patients';
  
  // Get all patients
  public async getAllPatients(): Promise<IPatient[]> {
    return apiService.get<IPatient[]>(this.baseUrl);
  }
  
  // Get patient by ID
  public async getPatientById(id: number): Promise<IPatient> {
    return apiService.get<IPatient>(`${this.baseUrl}/${id}`);
  }
  
  // Create new patient
  public async createPatient(data: ICreatePatientDto): Promise<IPatient> {
    return apiService.post<IPatient>(this.baseUrl, data);
  }
  
  // Update patient
  public async updatePatient(id: number, data: IUpdatePatientDto): Promise<IPatient> {
    return apiService.put<IPatient>(`${this.baseUrl}/${id}`, data);
  }
  
  // Delete patient
  public async deletePatient(id: number): Promise<void> {
    return apiService.delete<void>(`${this.baseUrl}/${id}`);
  }
}

// Create a singleton instance
const patientService = new PatientService();
export default patientService;