"use client"

import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFormContext } from "react-hook-form"

// Mock data for doctors
const doctors = [
  { id: "1", name: "Dr. Ahmed Benali" },
  { id: "2", name: "Dr. Sarah Mansouri" },
  { id: "3", name: "Dr. Karim Tazi" },
  { id: "4", name: "Dr. Leila Alaoui" },
]

export default function AdministrativeInfoStep() {
  const form = useFormContext()

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="assurance"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Assurance</FormLabel>
            <FormControl>
              <Input placeholder="Nom de la compagnie d'assurance" {...field} />
            </FormControl>
            <FormDescription>Nom de la compagnie d'assurance du patient.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="numero_police"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numéro de police</FormLabel>
            <FormControl>
              <Input placeholder="Numéro de police d'assurance" {...field} />
            </FormControl>
            <FormDescription>Référence du contrat d'assurance.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="numero_dossier"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numéro de dossier médical</FormLabel>
            <FormControl>
              <Input placeholder="Numéro de dossier médical" {...field} />
            </FormControl>
            <FormDescription>Identifiant unique du dossier médical.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="medecin_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Médecin référent</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un médecin" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>Médecin référent du patient.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
