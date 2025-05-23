"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SimpleSteps } from "@/components/simple-steps"
import PersonalInfoStep from "@/components/add_patient_steps/personal-info-step"
import ContactInfoStep from "@/components/add_patient_steps/contact-info-step"
import AccountStep from "@/components/add_patient_steps/account-step"
import MedicalInfoStep from "@/components/add_patient_steps/medical-info-step"
import AdministrativeInfoStep from "@/components/add_patient_steps/administrative-info-step"
import AdditionalInfoStep from "@/components/add_patient_steps/additional-info-step"
import EmergencyContactStep from "@/components/add_patient_steps/emergency-contact-step"
import DocumentsStep from "@/components/add_patient_steps/documents-step"
import { ChevronLeft, ChevronRight, Save } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Form } from "@/components/ui/form"
import { patientApi } from "@/lib/api"

// Define the schema for the entire form
const patientSchema = z.object({
  // Step 1: Personal Information
  prenom: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  nom: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  date_naissance: z.date(),
  sexe: z.enum(["Homme", "Femme", "Autre"]),
  cin_passeport: z.string().min(1, { message: "Ce champ est requis" }),
  photo_profil: z.string().optional(),

  // Step 2: Contact Information
  telephone: z.string().min(8, { message: "Numéro de téléphone invalide" }),
  email: z.string().email({ message: "Adresse e-mail invalide" }),
  adresse: z.string().min(5, { message: "L'adresse doit contenir au moins 5 caractères" }),

  // Step 3: Account Information
  nom_utilisateur: z
    .string()
    .min(3, { message: "Le nom d'utilisateur doit contenir au moins 3 caractères" })
    .optional(),
  mot_de_passe: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }).optional(),

  // Step 4: Medical Information
  groupe_sanguin: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  niveau_autonomie: z.enum(["Autonome", "Partiellement autonome", "Dépendant"]),
  antecedents_medicaux: z.string().optional(),
  pathologies_chroniques: z.string().optional(),
  allergies: z.string().optional(),
  medicaments: z.string().optional(),
  taille_cm: z.number().min(1, { message: "Taille invalide" }),
  poids_kg: z.number().min(1, { message: "Poids invalide" }),
  statut_tabac: z.enum(["Fumeur", "Non-fumeur", "Ancien fumeur"]),
  consommation_alcool: z.enum(["Oui", "Non", "Occasionnellement"]),

  // Step 5: Administrative Information
  assurance: z.string().min(1, { message: "Ce champ est requis" }),
  numero_police: z.string().min(1, { message: "Ce champ est requis" }),
  numero_dossier: z.string().min(1, { message: "Ce champ est requis" }),
  medecin_id: z.string().min(1, { message: "Ce champ est requis" }),

  // Step 6: Additional Information
  etat_civil: z.enum(["Célibataire", "Marié(e)", "Divorcé(e)", "Veuf/Veuve", "Autre"]),
  profession: z.string().optional(),
  langue_preferee: z.enum(["Français", "Arabe", "Anglais", "Autre"]),
  consentement: z.boolean().refine((val) => val === true, { message: "Le consentement est requis" }),

  // Step 7: Emergency Contact
  contact_urgence_nom: z.string().min(2, { message: "Ce champ est requis" }),
  contact_urgence_relation: z.string().min(2, { message: "Ce champ est requis" }),
  contact_urgence_telephone: z.string().min(8, { message: "Numéro de téléphone invalide" }),

  // Step 8: Documents (Optional)
  documents: z
    .array(
      z.object({
        nom_fichier: z.string(),
        type_document: z.string(),
        url: z.string(),
      }),
    )
    .optional(),
})

type PatientFormValues = z.infer<typeof patientSchema>

export default function PatientRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    "Informations personnelles",
    "Coordonnées",
    "Compte",
    "Informations médicales",
    "Informations administratives",
    "Informations supplémentaires",
    "Contact d'urgence",
    "Documents",
  ]

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      prenom: "",
      nom: "",
      date_naissance: new Date(),
      sexe: "Homme",
      cin_passeport: "",
      photo_profil: "",
      telephone: "",
      email: "",
      adresse: "",
      nom_utilisateur: "",
      mot_de_passe: "",
      groupe_sanguin: "O+",
      niveau_autonomie: "Autonome",
      antecedents_medicaux: "",
      pathologies_chroniques: "",
      allergies: "",
      medicaments: "",
      taille_cm: 170,
      poids_kg: 70,
      statut_tabac: "Non-fumeur",
      consommation_alcool: "Non",
      assurance: "",
      numero_police: "",
      numero_dossier: "",
      medecin_id: "",
      etat_civil: "Célibataire",
      profession: "",
      langue_preferee: "Français",
      consentement: false,
      contact_urgence_nom: "",
      contact_urgence_relation: "",
      contact_urgence_telephone: "",
      documents: [],
    },
  })

  const { handleSubmit, formState } = form
  const { isSubmitting } = formState

  const onSubmit = async (data: PatientFormValues) => {
    try {
      console.log("Form submitted:", data)
      
      // Format data for API
      const formattedData = {
        ...data,
        medecin_id: 1,
        // Create emergency contact object
        contacts_urgence: {
          nom: data.contact_urgence_nom,
          relation: data.contact_urgence_relation,
          telephone: data.contact_urgence_telephone
        }
      }
      
      // Remove individual emergency contact fields
      delete formattedData.contact_urgence_nom;
      delete formattedData.contact_urgence_relation;
      delete formattedData.contact_urgence_telephone;
      
      // Call API to create patient
      const response = await patientApi.create(formattedData);
      console.log("Patient created:", response);

      toast({
        title: "Patient enregistré avec succès",
        description: `${data.prenom} ${data.nom} a été ajouté au système.`,
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement du patient.",
        variant: "destructive",
      })
    }
  }

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForCurrentStep()
    const isValid = await form.trigger(fieldsToValidate as any)

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const getFieldsForCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return ["prenom", "nom", "date_naissance", "sexe", "cin_passeport", "photo_profil"]
      case 1:
        return ["telephone", "email", "adresse"]
      case 2:
        return ["nom_utilisateur", "mot_de_passe"]
      case 3:
        return [
          "groupe_sanguin",
          "niveau_autonomie",
          "antecedents_medicaux",
          "pathologies_chroniques",
          "allergies",
          "medicaments",
          "taille_cm",
          "poids_kg",
          "statut_tabac",
          "consommation_alcool",
        ]
      case 4:
        return ["assurance", "numero_police", "numero_dossier", "medecin_id"]
      case 5:
        return ["etat_civil", "profession", "langue_preferee", "consentement"]
      case 6:
        return ["contact_urgence_nom", "contact_urgence_relation", "contact_urgence_telephone"]
      case 7:
        return ["documents"]
      default:
        return []
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep />
      case 1:
        return <ContactInfoStep />
      case 2:
        return <AccountStep />
      case 3:
        return <MedicalInfoStep />
      case 4:
        return <AdministrativeInfoStep />
      case 5:
        return <AdditionalInfoStep />
      case 6:
        return <EmergencyContactStep />
      case 7:
        return <DocumentsStep />
      default:
        return null
    }
  }

  const isLastStep = currentStep === steps.length - 1

  return (
    <div className="max-w-4xl mx-auto">
      <SimpleSteps steps={steps} currentStep={currentStep} />

      <Card className="mt-6 border-blue-100">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-6">{steps[currentStep]}</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {renderStep()}

              <div className="flex justify-between mt-8">
                <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Précédent
                </Button>

                {isLastStep ? (
                  <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
                    {isSubmitting ? (
                      <>Enregistrement...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Enregistrer
                      </>
                    )}
                  </Button>
                ) : (
                  <Button type="button" onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                    Suivant
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
