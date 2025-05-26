"use client"

import type React from "react"

import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface MedicalConditionsStepProps {
  selectedAllergies: string[]
  setSelectedAllergies: (allergies: string[]) => void
  selectedPathologies: string[]
  setSelectedPathologies: (pathologies: string[]) => void
  selectedAntecedents: string[]
  setSelectedAntecedents: (antecedents: string[]) => void
  MultiSelectSearch: React.ComponentType<any>
}

const allergiesList = [
  { id: "1", name: "Pénicilline" },
  { id: "2", name: "Arachides" },
  { id: "3", name: "Lactose" },
  { id: "4", name: "Pollen" },
  { id: "5", name: "Fruits de mer" },
  { id: "6", name: "Œufs" },
  { id: "7", name: "Soja" },
  { id: "8", name: "Gluten" },
]

const pathologiesList = [
  { id: "1", name: "Diabète" },
  { id: "2", name: "Hypertension" },
  { id: "3", name: "Asthme" },
  { id: "4", name: "Arthrite" },
  { id: "5", name: "Insuffisance cardiaque" },
  { id: "6", name: "Dépression" },
  { id: "7", name: "Migraine" },
  { id: "8", name: "Épilepsie" },
]

const antecedentsList = [
  { id: "1", name: "Chirurgie cardiaque" },
  { id: "2", name: "Fracture" },
  { id: "3", name: "Cancer" },
  { id: "4", name: "Accident vasculaire" },
  { id: "5", name: "Transplantation" },
  { id: "6", name: "Intervention chirurgicale" },
  { id: "7", name: "Hospitalisation" },
  { id: "8", name: "Traumatisme" },
]

export default function MedicalConditionsStep({
  selectedAllergies,
  setSelectedAllergies,
  selectedPathologies,
  setSelectedPathologies,
  selectedAntecedents,
  setSelectedAntecedents,
  MultiSelectSearch,
}: MedicalConditionsStepProps) {
  return (
    <div className="space-y-6">
      {/* Allergies */}
      <div>
        <Label className="text-blue-900 text-lg font-medium">Allergies</Label>
        <div className="mt-2">
          <MultiSelectSearch
            options={allergiesList}
            selected={selectedAllergies}
            onSelectionChange={setSelectedAllergies}
            placeholder="Sélectionner les allergies"
            searchPlaceholder="Rechercher une allergie..."
          />
        </div>
      </div>

      <Separator />

      {/* Pathologies */}
      <div>
        <Label className="text-blue-900 text-lg font-medium">Pathologies</Label>
        <div className="mt-2">
          <MultiSelectSearch
            options={pathologiesList}
            selected={selectedPathologies}
            onSelectionChange={setSelectedPathologies}
            placeholder="Sélectionner les pathologies"
            searchPlaceholder="Rechercher une pathologie..."
          />
        </div>
      </div>

      <Separator />

      {/* Antecedents */}
      <div>
        <Label className="text-blue-900 text-lg font-medium">Antécédents</Label>
        <div className="mt-2">
          <MultiSelectSearch
            options={antecedentsList}
            selected={selectedAntecedents}
            onSelectionChange={setSelectedAntecedents}
            placeholder="Sélectionner les antécédents"
            searchPlaceholder="Rechercher un antécédent..."
          />
        </div>
      </div>
    </div>
  )
}
