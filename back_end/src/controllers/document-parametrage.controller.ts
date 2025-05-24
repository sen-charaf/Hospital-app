import { Request, Response } from 'express';
import * as documentParametrageService from '../services/document-parametrage.service';

// Get all document parametrages
export const getAllDocumentParametrages = async (req: Request, res: Response) => {
  try {
    const documentParametrages = await documentParametrageService.findAll();
    res.json(documentParametrages);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Get document parametrage by ID
export const getDocumentParametrageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const documentParametrage = await documentParametrageService.findById(Number(id));
    
    if (!documentParametrage) {
      res.status(404).json({ error: 'Type de document non trouvé' });
      return;
    }
    
    res.json(documentParametrage);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

// Create new document parametrage
export const createDocumentParametrage = async (req: Request, res: Response) => {
  try {
    const documentParametrage = await documentParametrageService.create(req.body);
    res.status(201).json(documentParametrage);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};

// Update document parametrage
export const updateDocumentParametrage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const documentParametrage = await documentParametrageService.update(Number(id), req.body);
    res.json(documentParametrage);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};

// Delete document parametrage
export const deleteDocumentParametrage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await documentParametrageService.remove(Number(id));
    res.status(204).send();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
};