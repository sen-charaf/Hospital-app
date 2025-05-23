"use client"

import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

export default function EmergencyContactStep() {
  const form = useFormContext()

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="contact_urgence_nom"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom complet</FormLabel>
            <FormControl>
              <Input placeholder="Nom complet du contact d'urgence" {...field} />
            </FormControl>
            <FormDescription>Personne à contacter en cas d'urgence.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="contact_urgence_relation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lien avec le patient</FormLabel>
            <FormControl>
              <Input placeholder="Relation avec le patient" {...field} />
            </FormControl>
            <FormDescription>Parent, ami, conjoint, etc.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="contact_urgence_telephone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Téléphone</FormLabel>
            <FormControl>
              <Input placeholder="Numéro de téléphone d'urgence" {...field} />
            </FormControl>
            <FormDescription>Numéro à contacter en cas d'urgence.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
