import express from 'express';
import patientRoutes from './patients.route';
import medecinRoutes from './medecins.route';
import contactUrgenceRoutes from './contactsUrgence.route';
import documentPatientRoutes from './documentsPatient.route';
import documentParametrageRoutes from './documentsParametrage.route';
import typeIdentiteRoutes from './typesIdentite.routes';
import historiquePatientRoutes from './historiquesPatient.route';
import allergieRoutes from './allergies.route';
import antecedentRoutes from './antecedents.route';
import pathologieRoutes from './pathologies.route';

const router = express.Router();

// Register routes
router.use('/patients', patientRoutes);
router.use('/medecins', medecinRoutes);
router.use('/contacts-urgence', contactUrgenceRoutes);
router.use('/documents', documentPatientRoutes);
router.use('/documents-parametrage', documentParametrageRoutes);
router.use('/types-identite', typeIdentiteRoutes);
router.use('/historiques', historiquePatientRoutes);
router.use('/allergies', allergieRoutes);
router.use('/antecedents', antecedentRoutes);
router.use('/pathologies', pathologieRoutes);

export default router;