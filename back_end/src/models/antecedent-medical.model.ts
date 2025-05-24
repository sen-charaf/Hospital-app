import { AntecedentMedical } from '@prisma/client';

// Basic AntecedentMedical interface matching Prisma schema
export interface IAntecedentMedical extends Omit<AntecedentMedical, 'created_at' | 'updated_at'> {
  created_at: Date | string;
  updated_at: Date | string;
}

// Interface for creating a new antecedent medical
export interface ICreateAntecedentMedicalDto {
  nom: string;
}

// Interface for updating an existing antecedent medical
export interface IUpdateAntecedentMedicalDto extends Partial<ICreateAntecedentMedicalDto> {}

// Response DTO for antecedent medical data
export interface IAntecedentMedicalResponseDto {
  id: number;
  nom: string;
  created_at: string;
  updated_at: string;
}