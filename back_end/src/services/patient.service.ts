import { PrismaClient } from '@prisma/client';
import { ICreatePatientDto, IUpdatePatientDto, IPatientWithRelations } from '../models/patient.model';

const prisma = new PrismaClient();

// Find all patients
export const findAll = async (): Promise<IPatientWithRelations[]> => {
  return prisma.patient.findMany({
    include: {
      medecin: true,
      type_identite: true,
      contacts_urgence: true,
      documents_patient: {
        include: {
          type: true
        }
      },
      allergies: {
        include: {
          allergie: true
        }
      },
      pathologies: {
        include: {
          pathologie: true
        }
      },
      antecedents: {
        include: {
          antecedent: true
        }
      }
    }
  }) as unknown as IPatientWithRelations[];
};

// Find patient by ID
export const findById = async (id: number): Promise<IPatientWithRelations | null> => {
  return prisma.patient.findUnique({
    where: { id },
    include: {
      medecin: true,
      type_identite: true,
      contacts_urgence: true,
      documents_patient: {
        include: {
          type: true
        }
      },
      allergies: {
        include: {
          allergie: true
        }
      },
      pathologies: {
        include: {
          pathologie: true
        }
      },
      antecedents: {
        include: {
          antecedent: true
        }
      }
    }
  }) as unknown as IPatientWithRelations | null;
};

// Create new patient
export const create = async (data: ICreatePatientDto): Promise<IPatientWithRelations> => {
  const { 
    contacts_urgence, 
    documents_patient, 
    allergies, 
    pathologies, 
    antecedents, 
    ...patientData 
  } = data;
  
  return prisma.patient.create({
    data: {
      ...patientData,
      contacts_urgence: contacts_urgence ? {
        create: contacts_urgence
      } : undefined,
      documents_patient: documents_patient && documents_patient.length > 0 ? {
        create: documents_patient
      } : undefined,
      allergies: allergies && allergies.length > 0 ? {
        create: allergies.map(allergieId => ({
          allergie: {
            connect: { id: allergieId }
          }
        }))
      } : undefined,
      pathologies: pathologies && pathologies.length > 0 ? {
        create: pathologies.map(pathologieId => ({
          pathologie: {
            connect: { id: pathologieId }
          }
        }))
      } : undefined,
      antecedents: antecedents && antecedents.length > 0 ? {
        create: antecedents.map(antecedentId => ({
          antecedent: {
            connect: { id: antecedentId }
          }
        }))
      } : undefined
    },
    include: {
      medecin: true,
      type_identite: true,
      contacts_urgence: true,
      documents_patient: {
        include: {
          type: true
        }
      },
      allergies: {
        include: {
          allergie: true
        }
      },
      pathologies: {
        include: {
          pathologie: true
        }
      },
      antecedents: {
        include: {
          antecedent: true
        }
      }
    }
  }) as unknown as IPatientWithRelations;
};

// Update patient
export const update = async (id: number, data: IUpdatePatientDto): Promise<IPatientWithRelations> => {
  const { 
    contacts_urgence, 
    documents_patient, 
    allergies, 
    pathologies, 
    antecedents, 
    ...patientData 
  } = data;
  
  // First, handle the many-to-many relationships if needed
  if (allergies) {
    await prisma.patientAllergie.deleteMany({
      where: { patient_id: id }
    });
  }
  
  if (pathologies) {
    await prisma.patientPathologie.deleteMany({
      where: { patient_id: id }
    });
  }
  
  if (antecedents) {
    await prisma.patientAntecedentMedical.deleteMany({
      where: { patient_id: id }
    });
  }
  
  return prisma.patient.update({
    where: { id },
    data: {
      ...patientData,
      contacts_urgence: contacts_urgence ? {
        deleteMany: {},
        create: contacts_urgence
      } : undefined,
      documents_patient: documents_patient && documents_patient.length > 0 ? {
        deleteMany: {},
        create: documents_patient
      } : undefined,
      allergies: allergies && allergies.length > 0 ? {
        create: allergies.map(allergieId => ({
          allergie: {
            connect: { id: allergieId }
          }
        }))
      } : undefined,
      pathologies: pathologies && pathologies.length > 0 ? {
        create: pathologies.map(pathologieId => ({
          pathologie: {
            connect: { id: pathologieId }
          }
        }))
      } : undefined,
      antecedents: antecedents && antecedents.length > 0 ? {
        create: antecedents.map(antecedentId => ({
          antecedent: {
            connect: { id: antecedentId }
          }
        }))
      } : undefined
    },
    include: {
      medecin: true,
      type_identite: true,
      contacts_urgence: true,
      documents_patient: {
        include: {
          type: true
        }
      },
      allergies: {
        include: {
          allergie: true
        }
      },
      pathologies: {
        include: {
          pathologie: true
        }
      },
      antecedents: {
        include: {
          antecedent: true
        }
      }
    }
  }) as unknown as IPatientWithRelations;
};

// Delete patient
export const remove = async (id: number): Promise<void> => {
  await prisma.patient.delete({
    where: { id }
  });
};