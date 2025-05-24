import { DocumentParametrage } from '@prisma/client';

// Basic DocumentParametrage interface matching Prisma schema
export interface IDocumentParametrage extends Omit<DocumentParametrage, 'created_at' | 'updated_at'> {
  created_at: Date | string;
  updated_at: Date | string;
}

// Interface for creating a new document parametrage
export interface ICreateDocumentParametrageDto {
  nom: string;
  description?: string | null;
}

// Interface for updating an existing document parametrage
export interface IUpdateDocumentParametrageDto extends Partial<ICreateDocumentParametrageDto> {}

// Response DTO for document parametrage data
export interface IDocumentParametrageResponseDto {
  id: number;
  nom: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
}