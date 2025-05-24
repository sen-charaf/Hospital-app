import { PrismaClient } from '@prisma/client';
import { ICreatePathologieChronique, IUpdatePathologieChronique, IPathologieChronique } from '../models/pathologie-chronique.model';

const prisma = new PrismaClient();

// Find all pathologies
export const findAll = async (): Promise<IPathologieChronique[]> => {
  return prisma.pathologieChronique.findMany() as unknown as IPathologieChronique[];
};

// Find pathologie by ID
export const findById = async (id: number): Promise<IPathologieChronique | null> => {
  return prisma.pathologieChronique.findUnique({
    where: { id }
  }) as unknown as IPathologieChronique | null;
};

// Create new pathologie
export const create = async (data: ICreatePathologieChronique): Promise<IPathologieChronique> => {
  return prisma.pathologieChronique.createMany({
    data
  }) as unknown as IPathologieChronique;
};

// Update pathologie
export const update = async (id: number, data: IUpdatePathologieChronique): Promise<IPathologieChronique> => {
  return prisma.pathologieChronique.update({
    where: { id },
    data
  }) as unknown as IPathologieChronique;
};

// Delete pathologie
export const remove = async (id: number): Promise<void> => {
  await prisma.pathologieChronique.delete({
    where: { id }
  });
};