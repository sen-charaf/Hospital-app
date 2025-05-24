import { Request, Response } from 'express';
import * as patientService from '../services/patient.service';

// Get all patients
export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const patients = await patientService.findAll();
    res.json(patients);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Get patient by ID
export const getPatientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const patient = await patientService.findById(Number(id));
    
    if (!patient) {
      res.status(404).json({ error: 'Patient non trouvé' });
      return;
    }
    
    res.json(patient);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Create new patient
export const createPatient = async (req: Request, res: Response) => {
  try {
    const patient = await patientService.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};

// Update patient
export const updatePatient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const patient = await patientService.update(Number(id), req.body);
    res.json(patient);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};

// Delete patient
export const deletePatient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await patientService.remove(Number(id));
    res.status(204).send();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};