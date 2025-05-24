import { PrismaClient } from '@prisma/client';
import { ICreateDocumentParametrageDto, IUpdateDocumentParametrageDto, IDocumentParametrage } from '../models/document-parametrage.model';

const prisma = new PrismaClient();

// Find all document parametrages
export const findAll = async (): Promise<IDocumentParametrage[]> => {
  return prisma.documentParametrage.findMany() as unknown as IDocumentParametrage[];
};

// Find document parametrage by ID
export const findById = async (id: number): Promise<IDocumentParametrage | null> => {
  return prisma.documentParametrage.findUnique({
    where: { id }
  }) as unknown as IDocumentParametrage | null;
};

// Create new document parametrage
export const create = async (data: ICreateDocumentParametrageDto): Promise<IDocumentParametrage> => {
  return prisma.documentParametrage.createMany({
    data
  }) as unknown as IDocumentParametrage;
};

// Update document parametrage
export const update = async (id: number, data: IUpdateDocumentParametrageDto): Promise<IDocumentParametrage> => {
  return prisma.documentParametrage.update({
    where: { id },
    data
  }) as unknown as IDocumentParametrage;
};

// Delete document parametrage
export const remove = async (id: number): Promise<void> => {
  await prisma.documentParametrage.delete({
    where: { id }
  });
};