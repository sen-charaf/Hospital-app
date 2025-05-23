import PatientRegistrationForm from "@/components/patient-registration-form"

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Enregistrement d'un Nouveau Patient</h1>
      <PatientRegistrationForm />
    </div>
  )
}
