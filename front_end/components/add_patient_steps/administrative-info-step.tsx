"use client"

import type React from "react"

import type { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface AdministrativeInfoStepProps {
  form: UseFormReturn<any>
  selectedMedecin: string
  setSelectedMedecin: (value: string) => void
  selectedStatus: string
  setSelectedStatus: (value: string) => void
  selectedService: string
  setSelectedService: (value: string) => void
  selectedPriority: string
  setSelectedPriority: (value: string) => void
  SearchableSelect: React.ComponentType<any>
}

const doctors = [
  { id: "1", name: "Dr. Martin Dubois" },
  { id: "2", name: "Dr. Sophie Laurent" },
  { id: "3", name: "Dr. Pierre Moreau" },
]

const statusOptions = [
  { id: "1", name: "Actif" },
  { id: "2", name: "Inactif" },
  { id: "3", name: "En attente" },
  { id: "4", name: "Suspendu" },
]

const serviceOptions = [
  { id: "1", name: "Cardiologie" },
  { id: "2", name: "Neurologie" },
  { id: "3", name: "Orthopédie" },
  { id: "4", name: "Pédiatrie" },
  { id: "5", name: "Urgences" },
  { id: "6", name: "Chirurgie" },
]

const priorityOptions = [
  { id: "1", name: "Faible" },
  { id: "2", name: "Normale" },
  { id: "3", name: "Élevée" },
  { id: "4", name: "Urgente" },
  { id: "5", name: "Critique" },
]

export default function AdministrativeInfoStep({
  form,
  selectedMedecin,
  setSelectedMedecin,
  selectedStatus,
  setSelectedStatus,
  selectedService,
  setSelectedService,
  selectedPriority,
  setSelectedPriority,
  SearchableSelect,
}: AdministrativeInfoStepProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="numero_dossier" className="text-blue-900">
            Numéro de dossier
          </Label>
          <Input
            id="numero_dossier"
            {...form.register("numero_dossier")}
            className="border-blue-200 focus:border-blue-500"
          />
        </div>
        <div>
          <Label className="text-blue-900">Médecin</Label>
          <SearchableSelect
            options={doctors}
            selected={selectedMedecin}
            onSelectionChange={(value: string) => {
              setSelectedMedecin(value)
              form.setValue("medecin_id", value)
            }}
            placeholder="Rechercher un médecin"
            searchPlaceholder="Tapez le nom du médecin..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label className="text-blue-900">Statuts</Label>
          <SearchableSelect
            options={statusOptions}
            selected={selectedStatus}
            onSelectionChange={(value: string) => {
              setSelectedStatus(value)
              form.setValue("statuts", value)
            }}
            placeholder="Sélectionner un statut"
            searchPlaceholder="Rechercher un statut..."
          />
        </div>
        <div>
          <Label className="text-blue-900">Service</Label>
          <SearchableSelect
            options={serviceOptions}
            selected={selectedService}
            onSelectionChange={(value: string) => {
              setSelectedService(value)
              form.setValue("service", value)
            }}
            placeholder="Sélectionner un service"
            searchPlaceholder="Rechercher un service..."
          />
        </div>
        <div>
          <Label className="text-blue-900">Priorité</Label>
          <SearchableSelect
            options={priorityOptions}
            selected={selectedPriority}
            onSelectionChange={(value: string) => {
              setSelectedPriority(value)
              form.setValue("priorite", value)
            }}
            placeholder="Sélectionner une priorité"
            searchPlaceholder="Rechercher une priorité..."
          />
        </div>
      </div>

      <div>
        <Label className="text-blue-900">Dernière visite</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal border-blue-200",
                !form.watch("dernier_visite") && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {form.watch("dernier_visite") ? (
                format(form.watch("dernier_visite")!, "dd/MM/yyyy")
              ) : (
                <span>Sélectionner une date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={form.watch("dernier_visite")}
              onSelect={(date) => form.setValue("dernier_visite", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
