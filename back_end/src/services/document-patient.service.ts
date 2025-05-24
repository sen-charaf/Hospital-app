import { PrismaClient } from '@prisma/client';
import { ICreateDocumentPatientDto, IUpdateDocumentPatientDto, IDocumentPatientWithRelations } from '../models/document-patient.model';

const prisma = new PrismaClient();

// Find all documents
export const findAll = async (): Promise<IDocumentPatientWithRelations[]> => {
  return prisma.documentPatient.findMany({
    include: {
      type: true
    }
  }) as unknown as IDocumentPatientWithRelations[];
};

// Find documents by patient ID
export const findByPatientId = async (patientId: number): Promise<IDocumentPatientWithRelations[]> => {
  return prisma.documentPatient.findMany({
    where: { patient_id: patientId },
    include: {
      type: true
    }
  }) as unknown as IDocumentPatientWithRelations[];
};

// Find document by ID
export const findById = async (id: number): Promise<IDocumentPatientWithRelations | null> => {
  return prisma.documentPatient.findUnique({
    where: { id },
    include: {
      type: true
    }
  }) as unknown as IDocumentPatientWithRelations | null;
};

// Create new document
export const create = async (data: ICreateDocumentPatientDto): Promise<IDocumentPatientWithRelations> => {
  return prisma.documentPatient.create({
    data,
    include: {
      type: true
    }
  }) as unknown as IDocumentPatientWithRelations;
};

// Update document
export const update = async (id: number, data: IUpdateDocumentPatientDto): Promise<IDocumentPatientWithRelations> => {
  return prisma.documentPatient.update({
    where: { id },
    data,
    include: {
      type: true
    }
  }) as unknown as IDocumentPatientWithRelations;
};

// Delete document
export const remove = async (id: number): Promise<void> => {
  await prisma.documentPatient.delete({
    where: { id }
  });
};