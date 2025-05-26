"use client"

import type { UseFormReturn } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"

interface ReviewStepProps {
  form: UseFormReturn<any>
  selectedAllergies: string[]
  selectedPathologies: string[]
  selectedAntecedents: string[]
  selectedMedecin: string
  selectedStatus: string
  selectedService: string
  selectedPriority: string
  selectedTabacStatus: string
  selectedAlcoolConsommation: string
  consentAccepted: boolean
  setConsentAccepted: (accepted: boolean) => void
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

const tabacStatusOptions = [
  { id: "1", name: "Non-fumeur" },
  { id: "2", name: "Fumeur occasionnel" },
  { id: "3", name: "Fumeur régulier" },
  { id: "4", name: "Ex-fumeur" },
  { id: "5", name: "Fumeur de pipe/cigare" },
]

const alcoolConsommationOptions = [
  { id: "1", name: "Jamais" },
  { id: "2", name: "Occasionnel" },
  { id: "3", name: "Modéré" },
  { id: "4", name: "Régulier" },
  { id: "5", name: "Excessif" },
]

export default function ReviewStep({
  form,
  selectedAllergies,
  selectedPathologies,
  selectedAntecedents,
  selectedMedecin,
  selectedStatus,
  selectedService,
  selectedPriority,
  selectedTabacStatus,
  selectedAlcoolConsommation,
  consentAccepted,
  setConsentAccepted,
}: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-blue-900 text-center">Révision des informations</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-sm text-blue-900">Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2 text-sm">
            <div>
              <strong>Nom:</strong> {form.watch("nom") || "Non renseigné"}
            </div>
            <div>
              <strong>Prénom:</strong> {form.watch("prenom") || "Non renseigné"}
            </div>
            <div>
              <strong>Date de naissance:</strong>{" "}
              {form.watch("date_naissance") ? format(form.watch("date_naissance")!, "dd/MM/yyyy") : "Non renseigné"}
            </div>
            <div>
              <strong>Sexe:</strong> {form.watch("sexe") || "Non renseigné"}
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-sm text-blue-900">Contact</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2 text-sm">
            <div>
              <strong>Téléphone:</strong> {form.watch("telephone") || "Non renseigné"}
            </div>
            <div>
              <strong>Email:</strong> {form.watch("email") || "Non renseigné"}
            </div>
            <div>
              <strong>Adresse:</strong> {form.watch("adresse") || "Non renseigné"}
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-sm text-blue-900">Informations médicales</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2 text-sm">
            <div>
              <strong>Groupe sanguin:</strong> {form.watch("groupe_sanguin") || "Non renseigné"}
            </div>
            <div>
              <strong>Taille:</strong> {form.watch("taille_cm") ? `${form.watch("taille_cm")} cm` : "Non renseigné"}
            </div>
            <div>
              <strong>Poids:</strong> {form.watch("poids_kg") ? `${form.watch("poids_kg")} kg` : "Non renseigné"}
            </div>
            <div>
              <strong>Autonomie:</strong> {form.watch("niveau_autonomie") || "Non renseigné"}
            </div>
            <div>
              <strong>Statut tabac:</strong>{" "}
              {tabacStatusOptions.find((t) => t.id === selectedTabacStatus)?.name || "Non renseigné"}
            </div>
            <div>
              <strong>Consommation d'alcool:</strong>{" "}
              {alcoolConsommationOptions.find((a) => a.id === selectedAlcoolConsommation)?.name || "Non renseigné"}
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-sm text-blue-900">Conditions médicales</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2 text-sm">
            <div>
              <strong>Allergies:</strong>{" "}
              {selectedAllergies.length > 0
                ? selectedAllergies.map((id) => allergiesList.find((a) => a.id === id)?.name).join(", ")
                : "Aucune"}
            </div>
            <div>
              <strong>Pathologies:</strong>{" "}
              {selectedPathologies.length > 0
                ? selectedPathologies.map((id) => pathologiesList.find((p) => p.id === id)?.name).join(", ")
                : "Aucune"}
            </div>
            <div>
              <strong>Antécédents:</strong>{" "}
              {selectedAntecedents.length > 0
                ? selectedAntecedents.map((id) => antecedentsList.find((a) => a.id === id)?.name).join(", ")
                : "Aucun"}
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-sm text-blue-900">Administrative Information</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2 text-sm">
            <div>
              <strong>Médecin:</strong> {doctors.find((d) => d.id === selectedMedecin)?.name || "Non renseigné"}
            </div>
            <div>
              <strong>Statut:</strong> {statusOptions.find((s) => s.id === selectedStatus)?.name || "Non renseigné"}
            </div>
            <div>
              <strong>Service:</strong> {serviceOptions.find((s) => s.id === selectedService)?.name || "Non renseigné"}
            </div>
            <div>
              <strong>Priorité:</strong>{" "}
              {priorityOptions.find((p) => p.id === selectedPriority)?.name || "Non renseigné"}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="consent"
            checked={consentAccepted}
            onCheckedChange={(checked) => setConsentAccepted(checked as boolean)}
            className="mt-1"
          />
          <div className="flex-1">
            <Label htmlFor="consent" className="text-blue-900 font-medium cursor-pointer">
              Consentement et acceptation
            </Label>
            <p className="text-sm text-blue-700 mt-1">
              Je confirme que toutes les informations fournies sont exactes et complètes. J'accepte que ces données
              soient utilisées dans le cadre des soins médicaux et je consens au traitement de mes données personnelles
              conformément à la réglementation en vigueur.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-800">Vérifiez toutes les informations avant de soumettre le formulaire.</p>
      </div>
    </div>
  )
}
