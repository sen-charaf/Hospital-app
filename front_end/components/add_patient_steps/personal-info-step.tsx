"use client"

import type { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface PersonalInfoStepProps {
  form: UseFormReturn<any>
}

const identityTypes = [
  { id: "1", name: "Carte d'identité" },
  { id: "2", name: "Passeport" },
  { id: "3", name: "Permis de conduire" },
]

export default function PersonalInfoStep({ form }: PersonalInfoStepProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="prenom" className="text-blue-900">
            Prénom
          </Label>
          <Input id="prenom" {...form.register("prenom")} className="border-blue-200 focus:border-blue-500" />
          {form.formState.errors.prenom && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.prenom.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="nom" className="text-blue-900">
            Nom
          </Label>
          <Input id="nom" {...form.register("nom")} className="border-blue-200 focus:border-blue-500" />
          {form.formState.errors.nom && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.nom.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-blue-900">Date de naissance</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-blue-200",
                  !form.watch("date_naissance") && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {form.watch("date_naissance") ? (
                  format(form.watch("date_naissance")!, "dd/MM/yyyy")
                ) : (
                  <span>Sélectionner une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={form.watch("date_naissance")}
                onSelect={(date) => form.setValue("date_naissance", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label className="text-blue-900">Sexe</Label>
          <Select onValueChange={(value) => form.setValue("sexe", value)}>
            <SelectTrigger className="border-blue-200">
              <SelectValue placeholder="Sélectionner le sexe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Homme">Homme</SelectItem>
              <SelectItem value="Femme">Femme</SelectItem>
              <SelectItem value="Autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-blue-900">Type d'identité</Label>
          <Select onValueChange={(value) => form.setValue("type_identite_id", value)}>
            <SelectTrigger className="border-blue-200">
              <SelectValue placeholder="Sélectionner le type" />
            </SelectTrigger>
            <SelectContent>
              {identityTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="identifiant" className="text-blue-900">
            Identifiant
          </Label>
          <Input id="identifiant" {...form.register("identifiant")} className="border-blue-200 focus:border-blue-500" />
        </div>
      </div>

      <div>
        <Label htmlFor="photo_profil" className="text-blue-900">
          Photo de profil (URL)
        </Label>
        <Input
          id="photo_profil"
          {...form.register("photo_profil")}
          placeholder="https://exemple.com/photo.jpg"
          className="border-blue-200 focus:border-blue-500"
        />
      </div>
    </div>
  )
}
