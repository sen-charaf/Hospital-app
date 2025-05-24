import { PrismaClient } from '@prisma/client';
import { ICreateMedecinDto, IUpdateMedecinDto, IMedecinWithRelations } from '../models/medecin.model';

const prisma = new PrismaClient();

// Find all medecins
export const findAll = async (): Promise<IMedecinWithRelations[]> => {
  return prisma.medecin.findMany({
    include: {
      patients: true
    }
  }) as unknown as IMedecinWithRelations[];
};

// Find medecin by ID
export const findById = async (id: number): Promise<IMedecinWithRelations | null> => {
  return prisma.medecin.findUnique({
    where: { id },
    include: {
      patients: true
    }
  }) as unknown as IMedecinWithRelations | null;
};

// Create new medecin
export const create = async (data: ICreateMedecinDto): Promise<IMedecinWithRelations> => {
  return prisma.medecin.create({
    data,
    include: {
      patients: true
    }
  }) as unknown as IMedecinWithRelations;
};

// Update medecin
export const update = async (id: number, data: IUpdateMedecinDto): Promise<IMedecinWithRelations> => {
  return prisma.medecin.update({
    where: { id },
    data,
    include: {
      patients: true
    }
  }) as unknown as IMedecinWithRelations;
};

// Delete medecin
export const remove = async (id: number): Promise<void> => {
  await prisma.medecin.delete({
    where: { id }
  });
};