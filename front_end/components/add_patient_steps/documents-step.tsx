"use client"

import { useState } from "react"
import { FormField, FormItem, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2, Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"

export default function DocumentsStep() {
  const form = useFormContext()

  const [newDocument, setNewDocument] = useState({
    nom_fichier: "",
    type_document: "CIN",
    url: "",
  })

  const documents = form.watch("documents") || []

  const addDocument = () => {
    if (newDocument.nom_fichier && newDocument.type_document) {
      const updatedDocuments = [...documents, { ...newDocument }]
      form.setValue("documents", updatedDocuments)
      setNewDocument({
        nom_fichier: "",
        type_document: "CIN",
        url: "",
      })
    }
  }

  const removeDocument = (index: number) => {
    const updatedDocuments = [...documents]
    updatedDocuments.splice(index, 1)
    form.setValue("documents", updatedDocuments)
  }

  return (
    <div className="space-y-6">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          Cette étape est optionnelle. Vous pouvez ajouter des documents comme la CIN, des analyses sanguines, etc.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="nom_fichier">Nom du fichier</Label>
            <Input
              id="nom_fichier"
              placeholder="Nom du document"
              value={newDocument.nom_fichier}
              onChange={(e) => setNewDocument({ ...newDocument, nom_fichier: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="type_document">Type de document</Label>
            <Select
              value={newDocument.type_document}
              onValueChange={(value) => setNewDocument({ ...newDocument, type_document: value })}
            >
              <SelectTrigger id="type_document">
                <SelectValue placeholder="Type de document" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CIN">CIN</SelectItem>
                <SelectItem value="Analyse sanguine">Analyse sanguine</SelectItem>
                <SelectItem value="Radiographie">Radiographie</SelectItem>
                <SelectItem value="Ordonnance">Ordonnance</SelectItem>
                <SelectItem value="Autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label htmlFor="url_document">URL / Lien</Label>
              <Input
                id="url_document"
                placeholder="URL du document"
                value={newDocument.url}
                onChange={(e) => setNewDocument({ ...newDocument, url: e.target.value })}
              />
            </div>
            <Button type="button" variant="outline" size="icon" className="mb-0.5">
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button
          type="button"
          onClick={addDocument}
          disabled={!newDocument.nom_fichier || !newDocument.type_document}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Ajouter un document
        </Button>
      </div>

      {documents.length > 0 && (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom du fichier</TableHead>
                <TableHead>Type de document</TableHead>
                <TableHead>URL / Lien</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc, index) => (
                <TableRow key={index}>
                  <TableCell>{doc.nom_fichier}</TableCell>
                  <TableCell>{doc.type_document}</TableCell>
                  <TableCell className="truncate max-w-[200px]">{doc.url}</TableCell>
                  <TableCell>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeDocument(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Hidden form field to store documents data */}
      <FormField
        control={form.control}
        name="documents"
        render={({ field }) => (
          <FormItem className="hidden">
            <FormControl>
              <Input {...field} type="hidden" />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  )
}
