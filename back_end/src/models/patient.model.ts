import { Patient, ContactUrgence, DocumentPatient, PatientAllergie, PatientPathologie, PatientAntecedentMedical } from '@prisma/client';

// Basic Patient interface matching Prisma schema
export interface IPatient extends Omit<Patient, 'date_naissance' | 'dernier_visite' | 'created_at' | 'updated_at' | 'date_creation'> {
  date_naissance: Date | string;
  dernier_visite?: Date | string | null;
  date_creation: Date | string;
  created_at: Date | string;
  updated_at: Date | string;
}

// Interface for creating a new patient
export interface ICreatePatientDto {
  prenom: string;
  nom: string;
  date_naissance: Date | string;
  sexe: string;
  type_identite_id?: number | null;
  identifiant?: string | null;
  photo_profil?: string | null;
  
  // Contact information
  telephone?: string | null;
  email?: string | null;
  adresse?: string | null;
  
  // Account information
  nom_utilisateur?: string | null;
  mot_de_passe?: string | null;
  
  // Medical information
  groupe_sanguin?: string | null;
  niveau_autonomie?: string | null;
  taille_cm?: number | null;
  poids_kg?: number | null;
  statut_tabac?: string | null;
  consommation_alcool?: string | null;
  
  // Administrative information
  assurance?: string | null;
  numero_police?: string | null;
  numero_dossier?: string | null;
  medecin_id?: number | null;
  
  // Status information
  statuts?: string | null;
  service?: string | null;
  priorite?: string | null;
  dernier_visite?: Date | string | null;
  
  // Additional information
  etat_civil?: string | null;
  profession?: string | null;
  langue_preferee?: string | null;
  consentement?: boolean;
  
  // Related entities
  contacts_urgence?: Omit<ContactUrgence, 'id' | 'patient_id' | 'created_at' | 'updated_at'>[];
  documents_patient?: Omit<DocumentPatient, 'id' | 'patient_id' | 'created_at' | 'updated_at'>[];
  
  // Many-to-many relationships
  allergies?: number[]; // Array of allergie_id
  pathologies?: number[]; // Array of pathologie_id
  antecedents?: number[]; // Array of antecedent_id
}

// Interface for updating an existing patient
export interface IUpdatePatientDto extends Partial<ICreatePatientDto> {}

// Interface for patient with related entities
export interface IPatientWithRelations extends IPatient {
  medecin?: {
    id: number;
    nom: string;
    specialite?: string | null;
  } | null;
  type_identite?: {
    id: number;
    nom: string;
    description?: string | null;
  } | null;
  contacts_urgence?: {
    id: number;
    nom_complet: string;
    relation?: string | null;
    telephone: string;
  }[];
  documents_patient?: {
    id: number;
    document_parametrage_id: number;
    nom_fichier?: string | null;
    url?: string | null;
    date_upload: Date | string;
    type: {
      id: number;
      nom: string;
      description?: string | null;
    };
  }[];
  allergies?: {
    allergie: {
      id: number;
      nom: string;
    };
  }[];
  pathologies?: {
    pathologie: {
      id: number;
      nom: string;
    };
  }[];
  antecedents?: {
    antecedent: {
      id: number;
      nom: string;
    };
  }[];
}

// Response DTO for patient data
export interface IPatientResponseDto {
  id: number;
  prenom: string;
  nom: string;
  date_naissance: string;
  sexe: string;
  identifiant?: string | null;
  photo_profil?: string | null;
  
  // Contact information
  telephone?: string | null;
  email?: string | null;
  adresse?: string | null;
  
  // Medical information
  groupe_sanguin?: string | null;
  niveau_autonomie?: string | null;
  taille_cm?: number | null;
  poids_kg?: number | null;
  statut_tabac?: string | null;
  consommation_alcool?: string | null;
  
  // Administrative information
  assurance?: string | null;
  numero_police?: string | null;
  numero_dossier?: string | null;
  
  // Status information
  statuts?: string | null;
  service?: string | null;
  priorite?: string | null;
  dernier_visite?: string | null;
  
  // Additional information
  etat_civil?: string | null;
  profession?: string | null;
  langue_preferee?: string | null;
  consentement: boolean;
  
  // Related entities
  medecin?: {
    id: number;
    nom: string;
    specialite?: string | null;
  } | null;
  type_identite?: {
    id: number;
    nom: string;
  } | null;
  contacts_urgence?: {
    id: number;
    nom_complet: string;
    relation?: string | null;
    telephone: string;
  }[];
  documents_patient?: {
    id: number;
    nom_fichier?: string | null;
    url?: string | null;
    date_upload: string;
    type: {
      id: number;
      nom: string;
    };
  }[];
  allergies?: {
    id: number;
    nom: string;
  }[];
  pathologies?: {
    id: number;
    nom: string;
  }[];
  antecedents?: {
    id: number;
    nom: string;
  }[];
  
  date_creation: string;
}