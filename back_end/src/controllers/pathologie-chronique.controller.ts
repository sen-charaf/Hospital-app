import { Request, Response } from 'express';
import * as pathologieService from '../services/pathologie-chronique.service';

// Get all pathologies
export const getAllPathologies = async (req: Request, res: Response) => {
  try {
    const pathologies = await pathologieService.findAll();
    res.json(pathologies);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Get pathologie by ID
export const getPathologieById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pathologie = await pathologieService.findById(Number(id));
    
    if (!pathologie) {
      res.status(404).json({ error: 'Pathologie chronique non trouvée' });
      return;
    }
    
    res.json(pathologie);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Create new pathologie
export const createPathologie = async (req: Request, res: Response) => {
  try {
    const pathologie = await pathologieService.create(req.body);
    res.status(201).json(pathologie);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};

// Update pathologie
export const updatePathologie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pathologie = await pathologieService.update(Number(id), req.body);
    res.json(pathologie);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};

// Delete pathologie
export const deletePathologie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pathologieService.remove(Number(id));
    res.status(204).send();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};