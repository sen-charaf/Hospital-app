import express from 'express';
import patientRoutes from './patients';
import medecinRoutes from './medecins';
import contactUrgenceRoutes from './contactsUrgence';
import documentPatientRoutes from './documentsPatient';

const router = express.Router();

// Register routes
router.use('/patients', patientRoutes);
router.use('/medecins', medecinRoutes);
router.use('/contacts-urgence', contactUrgenceRoutes);
router.use('/documents', documentPatientRoutes);

export default router;