"use client"

import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

export default function ContactInfoStep() {
  const form = useFormContext()

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="telephone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Téléphone</FormLabel>
            <FormControl>
              <Input placeholder="Numéro de téléphone" {...field} />
            </FormControl>
            <FormDescription>Numéro de téléphone du patient.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Adresse e-mail</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Adresse e-mail" {...field} />
            </FormControl>
            <FormDescription>Adresse e-mail du patient.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="adresse"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Adresse</FormLabel>
            <FormControl>
              <Input placeholder="Adresse complète" {...field} />
            </FormControl>
            <FormDescription>Adresse complète sur une seule ligne.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
