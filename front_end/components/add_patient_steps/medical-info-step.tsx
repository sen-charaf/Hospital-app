"use client"

import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useFormContext } from "react-hook-form"

export default function MedicalInfoStep() {
  const form = useFormContext()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="groupe_sanguin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Groupe sanguin</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un groupe sanguin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Groupe sanguin du patient.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="niveau_autonomie"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Niveau d'autonomie</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un niveau d'autonomie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Autonome">Autonome</SelectItem>
                  <SelectItem value="Partiellement autonome">Partiellement autonome</SelectItem>
                  <SelectItem value="Dépendant">Dépendant</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Niveau d'autonomie du patient.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="antecedents_medicaux"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Antécédents médicaux</FormLabel>
            <FormControl>
              <Textarea placeholder="Antécédents médicaux du patient" className="min-h-[100px]" {...field} />
            </FormControl>
            <FormDescription>Saisie libre de l'historique médical.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="taille_cm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Taille (cm)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Taille en cm"
                  {...field}
                  onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>Taille du patient en centimètres.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="poids_kg"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poids (kg)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Poids en kg"
                  {...field}
                  onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>Poids du patient en kilogrammes.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="statut_tabac"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Statut tabac</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Fumeur" id="tabac-fumeur" />
                    <Label htmlFor="tabac-fumeur">Fumeur</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Non-fumeur" id="tabac-non-fumeur" />
                    <Label htmlFor="tabac-non-fumeur">Non-fumeur</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Ancien fumeur" id="tabac-ancien" />
                    <Label htmlFor="tabac-ancien">Ancien fumeur</Label>
                  </div>
                </div>
              </RadioGroup>
            </FormControl>
            <FormDescription>Statut tabagique du patient.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
