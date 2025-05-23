import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all patients
router.get('/', async (req, res) => {
  try {
    const patients = await prisma.patient.findMany({
      include: {
        medecin: true,
        contacts_urgence: true,
        documents_patient: true
      }
    });
    res.json(patients);
  } catch (error) {
    // Type assertion for error
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

// Get patient by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await prisma.patient.findUnique({
      where: { id: Number(id) },
      include: {
        medecin: true,
        contacts_urgence: true,
        documents_patient: true
      }
    });
    
    if (!patient) {
       res.status(404).json({ error: 'Patient non trouvé' });
       return;
    }
    
    res.json(patient);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

// Create new patient
router.post('/', async (req, res) => {
  try {
    const patientData = req.body;
    
    // Extract nested data
    const { contacts_urgence, documents_patient, ...patientInfo } = patientData;
    
    // Create patient with nested data
    const patient = await prisma.patient.create({
      data: {
        ...patientInfo,
        contacts_urgence: contacts_urgence ? {
          create: contacts_urgence
        } : undefined,
        documents_patient: documents_patient ? {
          create: documents_patient
        } : undefined
      },
      include: {
        medecin: true,
        contacts_urgence: true,
        documents_patient: true
      }
    });
    
    res.status(201).json(patient);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
});

// Update patient
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const patientData = req.body;
    
    // Extract nested data
    const { contacts_urgence, documents_patient, ...patientInfo } = patientData;
    
    const patient = await prisma.patient.update({
      where: { id: Number(id) },
      data: patientInfo,
      include: {
        medecin: true,
        contacts_urgence: true,
        documents_patient: true
      }
    });
    
    res.json(patient);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
});

// Delete patient
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.patient.delete({
      where: { id: Number(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
});

// Search patients
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const patients = await prisma.patient.findMany({
      where: {
        OR: [
          { nom: { contains: query, mode: 'insensitive' } },
          { prenom: { contains: query, mode: 'insensitive' } },
          { cin_passeport: { contains: query, mode: 'insensitive' } },
          { numero_dossier: { contains: query, mode: 'insensitive' } }
        ]
      },
      include: {
        medecin: true
      }
    });
    
    res.json(patients);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

export default router;