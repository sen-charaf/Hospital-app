"use client";

import React from "react";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  User,
  Phone,
  Heart,
  FileText,
  AlertTriangle,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import patientService from "@/services/patient.service";

// Import step components
import PersonalInfoStep from "../components/add_patient_steps/personal-info-step";
import ContactAccountStep from "../components/add_patient_steps/contact-account-step";
import MedicalInfoStep from "../components/add_patient_steps/medical-info-step";
import AdministrativeInfoStep from "../components/add_patient_steps/administrative-info-step";
import ContactsDocumentsStep from "../components/add_patient_steps/contacts-documents-step";
import MedicalConditionsStep from "../components/add_patient_steps/medical-conditions-step";
import ReviewStep from "../components/add_patient_steps/review-step";

// Import shared components
import SearchableSelect from "../components/add_patient_shared/searchable-select";
import MultiSelectSearch from "../components/add_patient_shared/multi-select-search";

// Development mode flag
const DEV_MODE = true;

// Validation schema
const patientSchema = z.object({
  // Personal Information
  prenom: DEV_MODE ? z.string().optional() : z.string().min(1, "Prénom requis"),
  nom: DEV_MODE ? z.string().optional() : z.string().min(1, "Nom requis"),
  date_naissance: DEV_MODE
    ? z.date().optional()
    : z.date({ required_error: "Date de naissance requise" }),
  sexe: DEV_MODE ? z.string().optional() : z.string().min(1, "Sexe requis"),
  type_identite_id: DEV_MODE
    ? z.string().optional()
    : z.string().min(1, "Type d'identité requis"),
  identifiant: DEV_MODE
    ? z.string().optional()
    : z.string().min(1, "Identifiant requis"),
  photo_profil: z.string().optional(),

  // Contact Information
  telephone: DEV_MODE
    ? z.string().optional()
    : z.string().min(1, "Téléphone requis"),
  email: DEV_MODE ? z.string().optional() : z.string().email("Email invalide"),
  adresse: z.string().optional(),

  // Account
  nom_utilisateur: DEV_MODE
    ? z.string().optional()
    : z.string().min(3, "Nom d'utilisateur requis (min 3 caractères)"),
  mot_de_passe: DEV_MODE
    ? z.string().optional()
    : z.string().min(6, "Mot de passe requis (min 6 caractères)"),

  // Medical Information
  groupe_sanguin: z.string().optional(),
  niveau_autonomie: z.string().optional(),
  taille_cm: z.number().optional(),
  poids_kg: z.number().optional(),
  statut_tabac: z.string().optional(),
  consommation_alcool: z.string().optional(),

  // Administrative Information
  assurance: z.string().optional(),
  numero_police: z.string().optional(),
  numero_dossier: z.string().optional(),
  medecin_id: z.string().optional(),
  statuts: z.string().optional(),
  service: z.string().optional(),
  priorite: z.string().optional(),
  dernier_visite: z.date().optional(),

  // Dynamic lists
  emergency_contacts: z
    .array(
      z.object({
        nom_complet: z.string().min(1, "Nom complet requis"),
        relation: z.string().min(1, "Relation requise"),
        telephone: z.string().min(1, "Téléphone requis"),
      })
    )
    .optional(),

  documents: z
    .array(
      z.object({
        document_parametrage_id: z.string().min(1, "Type de document requis"),
        nom_fichier: z.string().min(1, "Nom de fichier requis"),
        url: z.string().url("URL invalide"),
      })
    )
    .optional(),

  // Medical conditions
  allergies: z.array(z.string()).optional(),
  pathologies: z.array(z.string()).optional(),
  antecedents: z.array(z.string()).optional(),
});

type PatientFormData = z.infer<typeof patientSchema>;

// Stepper steps
const steps = [
  { id: 1, title: "Informations personnelles", icon: User },
  { id: 2, title: "Contact & Compte", icon: Phone },
  { id: 3, title: "Informations médicales", icon: Heart },
  { id: 4, title: "Informations administratives", icon: FileText },
  { id: 5, title: "Contacts & Documents", icon: AlertTriangle },
  { id: 6, title: "Conditions médicales", icon: Heart },
  { id: 7, title: "Révision & Envoi", icon: Eye },
];

export default function PatientForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [selectedPathologies, setSelectedPathologies] = useState<string[]>([]);
  const [selectedAntecedents, setSelectedAntecedents] = useState<string[]>([]);
  const [selectedMedecin, setSelectedMedecin] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [consentAccepted, setConsentAccepted] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [selectedTabacStatus, setSelectedTabacStatus] = useState<string>("");
  const [selectedAlcoolConsommation, setSelectedAlcoolConsommation] =
    useState<string>("");
  const [documentFiles, setDocumentFiles] = useState<{
    [key: number]: File | null;
  }>({});
  const [documentUploadMode, setDocumentUploadMode] = useState<{
    [key: number]: "file" | "url";
  }>({});

  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      emergency_contacts: [{ nom_complet: "", relation: "", telephone: "" }],
      documents: [{ document_parametrage_id: "", nom_fichier: "", url: "" }],
      allergies: [],
      pathologies: [],
      antecedents: [],
    },
  });

  const {
    fields: emergencyFields,
    append: appendEmergency,
    remove: removeEmergency,
  } = useFieldArray({
    control: form.control,
    name: "emergency_contacts",
  });

  const {
    fields: documentFields,
    append: appendDocument,
    remove: removeDocument,
  } = useFieldArray({
    control: form.control,
    name: "documents",
  });

  const generateCredentials = () => {
    const randomUsername = `user_${Math.random().toString(36).substring(2, 8)}`;
    const randomPassword = Math.random().toString(36).substring(2, 10);

    form.setValue("nom_utilisateur", randomUsername);
    form.setValue("mot_de_passe", randomPassword);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (index: number, file: File | null) => {
    setDocumentFiles((prev) => ({ ...prev, [index]: file }));
    if (file) {
      form.setValue(`documents.${index}.nom_fichier`, file.name);
      form.setValue(`documents.${index}.url`, URL.createObjectURL(file));
    }
  };

  const toggleUploadMode = (index: number) => {
    const currentMode = documentUploadMode[index] || "url";
    const newMode = currentMode === "url" ? "file" : "url";
    setDocumentUploadMode((prev) => ({ ...prev, [index]: newMode }));

    // Clear the fields when switching modes
    if (newMode === "file") {
      form.setValue(`documents.${index}.url`, "");
    } else {
      setDocumentFiles((prev) => ({ ...prev, [index]: null }));
      form.setValue(`documents.${index}.nom_fichier`, "");
    }
  };

  const onSubmit = async (data: PatientFormData) => {
    // Update medical conditions from state
    const finalData = {
      ...data,
      allergies: selectedAllergies,
      pathologies: selectedPathologies,
      antecedents: selectedAntecedents,
    };

    try {
      // Use patientService instead of direct fetch
      const response = await patientService.createPatient(finalData as any);
      console.log("Patient created:", response);
      
      alert("Patient créé avec succès!");
      form.reset();
      setCurrentStep(1);
      setSelectedAllergies([]);
      setSelectedPathologies([]);
      setSelectedAntecedents([]);
      setSelectedMedecin("");
      setSelectedStatus("");
      setSelectedService("");
      setSelectedPriority("");
      setConsentAccepted(false);
      setShowPassword(false);
      setSelectedTabacStatus("");
      setSelectedAlcoolConsommation("");
      setDocumentFiles({});
      setDocumentUploadMode({});
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la création du patient");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep form={form} />;

      case 2:
        return (
          <ContactAccountStep
            form={form}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            generateCredentials={generateCredentials}
          />
        );

      case 3:
        return (
          <MedicalInfoStep
            form={form}
            selectedTabacStatus={selectedTabacStatus}
            setSelectedTabacStatus={setSelectedTabacStatus}
            selectedAlcoolConsommation={selectedAlcoolConsommation}
            setSelectedAlcoolConsommation={setSelectedAlcoolConsommation}
            SearchableSelect={SearchableSelect}
          />
        );

      case 4:
        return (
          <AdministrativeInfoStep
            form={form}
            selectedMedecin={selectedMedecin}
            setSelectedMedecin={setSelectedMedecin}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
            SearchableSelect={SearchableSelect}
          />
        );

      case 5:
        return (
          <ContactsDocumentsStep
            form={form}
            emergencyFields={emergencyFields}
            appendEmergency={appendEmergency}
            removeEmergency={removeEmergency}
            documentFields={documentFields}
            appendDocument={appendDocument}
            removeDocument={removeDocument}
            documentFiles={documentFiles}
            documentUploadMode={documentUploadMode}
            handleFileUpload={handleFileUpload}
            toggleUploadMode={toggleUploadMode}
          />
        );

      case 6:
        return (
          <MedicalConditionsStep
            selectedAllergies={selectedAllergies}
            setSelectedAllergies={setSelectedAllergies}
            selectedPathologies={selectedPathologies}
            setSelectedPathologies={setSelectedPathologies}
            selectedAntecedents={selectedAntecedents}
            setSelectedAntecedents={setSelectedAntecedents}
            MultiSelectSearch={MultiSelectSearch}
          />
        );

      case 7:
        return (
          <ReviewStep
            form={form}
            selectedAllergies={selectedAllergies}
            selectedPathologies={selectedPathologies}
            selectedAntecedents={selectedAntecedents}
            selectedMedecin={selectedMedecin}
            selectedStatus={selectedStatus}
            selectedService={selectedService}
            selectedPriority={selectedPriority}
            selectedTabacStatus={selectedTabacStatus}
            selectedAlcoolConsommation={selectedAlcoolConsommation}
            consentAccepted={consentAccepted}
            setConsentAccepted={setConsentAccepted}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Création d'un nouveau patient
          </h1>
          <p className="text-blue-600">
            Suivez les étapes pour compléter le dossier patient
          </p>
          {DEV_MODE && (
            <Badge
              variant="outline"
              className="mt-2 border-orange-500 text-orange-600"
            >
              Mode développement - Validation désactivée
            </Badge>
          )}
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors",
                    currentStep === step.id
                      ? "bg-blue-600 text-white border-blue-600"
                      : currentStep > step.id
                      ? "bg-blue-100 text-blue-600 border-blue-600"
                      : "bg-gray-100 text-gray-400 border-gray-300"
                  )}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 text-center max-w-20",
                    currentStep === step.id
                      ? "text-blue-600 font-medium"
                      : "text-gray-500"
                  )}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Step Content */}
          <Card className="border-blue-200 min-h-96">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center gap-2 text-blue-900">
                {React.createElement(steps[currentStep - 1].icon, {
                  className: "h-5 w-5",
                })}
                {steps[currentStep - 1].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">{renderStepContent()}</CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Précédent
            </Button>

            {currentStep === steps.length ? (
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                disabled={form.formState.isSubmitting || !consentAccepted}
              >
                {form.formState.isSubmitting
                  ? "Création en cours..."
                  : "Créer le patient"}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Suivant
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
