"use client"

import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CalendarIcon, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { useFormContext } from "react-hook-form"

export default function PersonalInfoStep() {
  const form = useFormContext()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="prenom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input placeholder="Prénom du patient" {...field} />
              </FormControl>
              <FormDescription>Le prénom du patient.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom de famille du patient" {...field} />
              </FormControl>
              <FormDescription>Le nom de famille du patient.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="date_naissance"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Date de naissance</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                  >
                    {field.value ? format(field.value, "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormDescription>Sélection de la date de naissance du patient.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="sexe"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Sexe</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Homme" id="sexe-homme" />
                    <Label htmlFor="sexe-homme">Homme</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Femme" id="sexe-femme" />
                    <Label htmlFor="sexe-femme">Femme</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Autre" id="sexe-autre" />
                    <Label htmlFor="sexe-autre">Autre</Label>
                  </div>
                </div>
              </RadioGroup>
            </FormControl>
            <FormDescription>Choix entre "Homme", "Femme", "Autre".</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cin_passeport"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CIN ou Passeport</FormLabel>
            <FormControl>
              <Input placeholder="Numéro de CIN ou Passeport" {...field} />
            </FormControl>
            <FormDescription>Identifiant administratif du patient.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="photo_profil"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Photo de profil</FormLabel>
            <FormControl>
              <div className="flex items-center gap-4">
                <Input placeholder="URL de la photo ou laisser vide" {...field} />
                <Button type="button" variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  <span className="hidden sm:inline">Télécharger</span>
                </Button>
              </div>
            </FormControl>
            <FormDescription>Upload ou lien image pour la photo de profil du patient.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
