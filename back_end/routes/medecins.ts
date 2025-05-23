import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();
// Get all medecins
router.get('/', async (req, res) => {
  try {
    const medecins = await prisma.medecin.findMany({
      include: {
        patients: true
      }
    });
    res.json(medecins);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

// Get medecin by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const medecin = await prisma.medecin.findUnique({
      where: { id: Number(id) },
      include: {
        patients: true
      }
    });
    
    if (!medecin) {
       res.status(404).json({ error: 'Médecin non trouvé' });
       return;
    }
    
    res.json(medecin);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

// Create new medecin
router.post('/', async (req, res) => {
  try {
    const medecin = await prisma.medecin.create({
      data: req.body
    });
    
    res.status(201).json(medecin);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
});

// Update medecin
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const medecin = await prisma.medecin.update({
      where: { id: Number(id) },
      data: req.body
    });
    
    res.json(medecin);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
});

// Delete medecin
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.medecin.delete({
      where: { id: Number(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
});

export default router;