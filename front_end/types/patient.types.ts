import { IAllergie } from './allergie.types';

// Basic Patient interface
export interface IPatient {
  id: number;
  nom: string;
  prenom: string;
  date_naissance: string;
  sexe: string;
  adresse?: string;
  telephone?: string;
  email?: string;
  medecin_id?: number;
  type_identite_id?: number;
  numero_identite?: string;
  created_at: string;
  updated_at: string;
  
  // Relations
  medecin?: IMedecin;
  type_identite?: ITypeIdentite;
  contacts_urgence?: IContactUrgence[];
  documents_patient?: IDocumentPatient[];
  allergies?: IPatientAllergie[];
  pathologies?: IPatientPathologie[];
  antecedents?: IPatientAntecedent[];
}

// Interface for creating a new patient
export interface ICreatePatientDto {
  nom: string;
  prenom: string;
  date_naissance: string;
  sexe: string;
  adresse?: string;
  telephone?: string;
  email?: string;
  medecin_id?: number;
  type_identite_id?: number;
  numero_identite?: string;
  contacts_urgence?: ICreateContactUrgenceDto[];
  documents_patient?: ICreateDocumentPatientDto[];
  allergies?: number[];
  pathologies?: number[];
  antecedents?: number[];
}

// Interface for updating an existing patient
export interface IUpdatePatientDto extends Partial<ICreatePatientDto> {}

// Related interfaces
interface IMedecin {
  id: number;
  nom: string;
  prenom: string;
}

interface ITypeIdentite {
  id: number;
  nom: string;
}

interface IContactUrgence {
  id: number;
  patient_id: number;
  nom: string;
  prenom: string;
  telephone: string;
  relation: string;
}

interface ICreateContactUrgenceDto {
  nom: string;
  prenom: string;
  telephone: string;
  relation: string;
}

interface IDocumentPatient {
  id: number;
  patient_id: number;
  type_id: number;
  nom: string;
  url: string;
  type: {
    id: number;
    nom: string;
  };
}

interface ICreateDocumentPatientDto {
  type_id: number;
  nom: string;
  url: string;
}

interface IPatientAllergie {
  patient_id: number;
  allergie_id: number;
  allergie: IAllergie;
}

interface IPatientPathologie {
  patient_id: number;
  pathologie_id: number;
  pathologie: {
    id: number;
    nom: string;
  };
}

interface IPatientAntecedent {
  patient_id: number;
  antecedent_id: number;
  antecedent: {
    id: number;
    nom: string;
  };
}