import { PathologieChronique } from '@prisma/client';

// Basic PathologieChronique interface matching Prisma schema
export interface IPathologieChronique extends Omit<PathologieChronique, 'created_at' | 'updated_at'> {
  created_at: Date | string;
  updated_at: Date | string;
}

// Interface for creating a new pathologie chronique
export interface ICreatePathologieChronique {
  nom: string;
}

// Interface for updating an existing pathologie chronique
export interface IUpdatePathologieChronique extends Partial<ICreatePathologieChronique> {}

// Response DTO for pathologie chronique data
export interface IPathologieChronique {
  id: number;
  nom: string;
  created_at: Date | string;
  updated_at: Date | string;
}