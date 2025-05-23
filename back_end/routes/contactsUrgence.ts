import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();
// Get all contacts d'urgence
router.get('/', async (req, res) => {
  try {
    const contacts = await prisma.contactUrgence.findMany({
      include: {
        patient: true
      }
    });
    res.json(contacts);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

// Get contacts by patient ID
router.get('/patient/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    const contacts = await prisma.contactUrgence.findMany({
      where: { patient_id: Number(patientId) }
    });
    
    res.json(contacts);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

// Get contact by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await prisma.contactUrgence.findUnique({
      where: { id: Number(id) },
      include: {
        patient: true
      }
    });
    
    if (!contact) {
       res.status(404).json({ error: 'Contact d\'urgence non trouvé' });
       return;
    }
    
    res.json(contact);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

// Create new contact
router.post('/', async (req, res) => {
  try {
    const contact = await prisma.contactUrgence.create({
      data: req.body,
      include: {
        patient: true
      }
    });
    
    res.status(201).json(contact);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

// Update contact
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await prisma.contactUrgence.update({
      where: { id: Number(id) },
      data: req.body,
      include: {
        patient: true
      }
    });
    
    res.json(contact);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

// Delete contact
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.contactUrgence.delete({
      where: { id: Number(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

export default router;