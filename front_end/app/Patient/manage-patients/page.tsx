"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { PlusCircle, Search, Edit3, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import patientService from '@/services/patient.service';
import { IPatient } from '@/types/patient.types'; // Assurez-vous que ce type est correct et complet
import { useRouter } from 'next/navigation';

// Placeholder pour les données des patients
const initialPatients: IPatient[] = [];

export default function ManagePatientsPage() {
  const [patients, setPatients] = useState<IPatient[]>(initialPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // Exemple de filtre
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setIsLoading(true);
        const data = await patientService.getAllPatients();
        setPatients(data);
        setError(null);
      } catch (err) {
        setError('Erreur lors de la récupération des patients.');
        console.error(err);
      }
      setIsLoading(false);
    };
    fetchPatients();
  }, []);

  const filteredPatients = useMemo(() => {
    return patients
      .filter(patient => 
        `${patient.prenom} ${patient.nom}`.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(patient => {
        if (filterStatus === 'all') return true;
        // Exemple de logique de filtrage plus complexe à ajouter ici
        // Pour l'instant, ce filtre ne fait rien de plus
        return true; 
      });
  }, [patients, searchTerm, filterStatus]);

  const handleAddPatient = () => {
    router.push('/Patient/patient-form'); // Redirige vers le formulaire existant
  };

  const handleViewDetails = (patient: IPatient) => {
    setSelectedPatient(patient);
    setIsDetailModalOpen(true);
  };

  const handleEditPatient = (patientId: number) => {
    // Rediriger vers le formulaire de modification, potentiellement avec un query param pour l'ID
    // et un autre pour aller directement à l'étape de révision.
    router.push(`/patient-form?id=${patientId}&step=review`); 
  };

  const handleDeletePatient = async () => {
    if (selectedPatient) {
      try {
        await patientService.deletePatient(selectedPatient.id);
        setPatients(patients.filter(p => p.id !== selectedPatient.id));
        setIsDeleteModalOpen(false);
        setSelectedPatient(null);
        // Afficher une notification de succès ici
      } catch (err) {
        setError('Erreur lors de la suppression du patient.');
        console.error(err);
        // Afficher une notification d'erreur ici
      }
    }
  };

  const openDeleteConfirmModal = (patient: IPatient) => {
    setSelectedPatient(patient);
    setIsDeleteModalOpen(true);
  };

  if (isLoading) {
    return <div className="p-4">Chargement des patients...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Gestion des Patients</h1>
      </header>

      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input 
            type="text"
            placeholder="Rechercher par nom ou prénom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              {/* Ajouter d'autres options de filtre ici */}
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="inactive">Inactif</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleAddPatient} className="bg-blue-600 hover:bg-blue-700 text-white">
            <PlusCircle className="mr-2 h-5 w-5" />
            Ajouter un Patient
          </Button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[200px]">Prénom</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Date de Naissance</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Adresse</TableHead>
              <TableHead className="text-right w-[200px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{patient.prenom}</TableCell>
                  <TableCell>{patient.nom}</TableCell>
                  <TableCell>{new Date(patient.date_naissance).toLocaleDateString()}</TableCell>
                  <TableCell>{patient.telephone || '-'}</TableCell>
                  <TableCell>{patient.adresse || '-'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewDetails(patient)} title="Voir détails">
                      <Eye className="h-5 w-5 text-blue-500" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEditPatient(patient.id)} title="Modifier">
                      <Edit3 className="h-5 w-5 text-green-500" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openDeleteConfirmModal(patient)} title="Supprimer">
                      <Trash2 className="h-5 w-5 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                  Aucun patient trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal de détails du patient */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Détails du Patient</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <p><strong>Prénom:</strong> {selectedPatient.prenom}</p>
                <p><strong>Nom:</strong> {selectedPatient.nom}</p>
                <p><strong>Date de naissance:</strong> {new Date(selectedPatient.date_naissance).toLocaleDateString()}</p>
                <p><strong>Sexe:</strong> {selectedPatient.sexe}</p>
                <p><strong>Téléphone:</strong> {selectedPatient.telephone || '-'}</p>
                <p><strong>Email:</strong> {selectedPatient.email || '-'}</p>
                <p><strong>Adresse:</strong> {selectedPatient.adresse || '-'}</p>
                <p><strong>Numéro d'identité:</strong> {selectedPatient.numero_identite || '-'}</p>
                {/* Ajouter d'autres champs ici selon la définition de IPatient */}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDetailModalOpen(false)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de confirmation de suppression */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmer la Suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer le patient {selectedPatient?.prenom} {selectedPatient?.nom} ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Annuler</Button>
            <Button variant="destructive" onClick={handleDeletePatient}>Supprimer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}