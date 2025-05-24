import { Allergie } from '@prisma/client';

// Basic Allergie interface matching Prisma schema
export interface IAllergie extends Omit<Allergie, 'created_at' | 'updated_at'> {
  created_at: Date | string;
  updated_at: Date | string;
}

// Interface for creating a new allergie
export interface ICreateAllergieDto {
  nom: string;
}

// Interface for updating an existing allergie
export interface IUpdateAllergieDto extends Partial<ICreateAllergieDto> {}

// Response DTO for allergie data
export interface IAllergieResponseDto {
  id: number;
  nom: string;
  created_at: string;
  updated_at: string;
}