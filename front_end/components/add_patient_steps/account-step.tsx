"use client"

import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"

export default function AccountStep() {
  const form = useFormContext()

  return (
    <div className="space-y-6">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          Cette étape est optionnelle. Remplissez ces champs uniquement si le patient aura accès à un compte sur le
          système.
        </AlertDescription>
      </Alert>

      <FormField
        control={form.control}
        name="nom_utilisateur"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom d'utilisateur</FormLabel>
            <FormControl>
              <Input placeholder="Nom d'utilisateur" {...field} />
            </FormControl>
            <FormDescription>Identifiant de connexion pour le patient.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="mot_de_passe"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mot de passe</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Mot de passe" {...field} />
            </FormControl>
            <FormDescription>Mot de passe sécurisé (minimum 8 caractères).</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
