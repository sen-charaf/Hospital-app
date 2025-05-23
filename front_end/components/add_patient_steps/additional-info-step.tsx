"use client"

import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useFormContext } from "react-hook-form"

export default function AdditionalInfoStep() {
  const form = useFormContext()

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="etat_civil"
        render={({ field }) => (
          <FormItem>
            <FormLabel>État civil</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un état civil" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Célibataire">Célibataire</SelectItem>
                <SelectItem value="Marié(e)">Marié(e)</SelectItem>
                <SelectItem value="Divorcé(e)">Divorcé(e)</SelectItem>
                <SelectItem value="Veuf/Veuve">Veuf/Veuve</SelectItem>
                <SelectItem value="Autre">Autre</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>État civil du patient.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="profession"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Profession</FormLabel>
            <FormControl>
              <Input placeholder="Profession du patient" {...field} />
            </FormControl>
            <FormDescription>Métier du patient.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="langue_preferee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Langue préférée</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une langue" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Français">Français</SelectItem>
                <SelectItem value="Arabe">Arabe</SelectItem>
                <SelectItem value="Anglais">Anglais</SelectItem>
                <SelectItem value="Autre">Autre</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>Langue préférée pour la communication.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="consentement"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Consentement aux soins</FormLabel>
              <FormDescription>
                En cochant cette case, vous confirmez que le patient a donné son consentement pour recevoir des soins
                médicaux et que ses données personnelles soient traitées conformément à la politique de confidentialité.
              </FormDescription>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
