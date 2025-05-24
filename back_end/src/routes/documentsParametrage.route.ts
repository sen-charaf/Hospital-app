import express from 'express';
import * as documentParametrageController from '../controllers/document-parametrage.controller';

const router = express.Router();

// Get all document parametrages
router.get('/', documentParametrageController.getAllDocumentParametrages);

// Get document parametrage by ID
router.get('/:id', documentParametrageController.getDocumentParametrageById);

// Create new document parametrage
router.post('/', documentParametrageController.createDocumentParametrage);

// Update document parametrage
router.put('/:id', documentParametrageController.updateDocumentParametrage);

// Delete document parametrage
router.delete('/:id', documentParametrageController.deleteDocumentParametrage);

export default router;