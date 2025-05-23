import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();
// Get all documents
router.get('/', async (req, res) => {
  try {
    const documents = await prisma.documentPatient.findMany({
      include: {
        patient: true
      }
    });
    res.json(documents);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

// Get documents by patient ID
router.get('/patient/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    const documents = await prisma.documentPatient.findMany({
      where: { patient_id: Number(patientId) }
    });
    
    res.json(documents);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

// Get document by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const document = await prisma.documentPatient.findUnique({
      where: { id: Number(id) },
      include: {
        patient: true
      }
    });
    
    if (!document) {
       res.status(404).json({ error: 'Document non trouvé' });
       return;
    }
    
    res.json(document);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

// Create new document
router.post('/', async (req, res) => {
  try {
    const document = await prisma.documentPatient.create({
      data: req.body,
      include: {
        patient: true
      }
    });
    
    res.status(201).json(document);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

// Update document
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const document = await prisma.documentPatient.update({
      where: { id: Number(id) },
      data: req.body,
      include: {
        patient: true
      }
    });
    
    res.json(document);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

// Delete document
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.documentPatient.delete({
      where: { id: Number(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

export default router;