/*
  Warnings:

  - A unique constraint covering the columns `[matricule]` on the table `Medecin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Medecin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `matricule` to the `Medecin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prenom` to the `Medecin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexe` to the `Medecin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statut` to the `Medecin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medecin" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "langue_preferee" TEXT,
ADD COLUMN     "matricule" TEXT NOT NULL,
ADD COLUMN     "photo_profil" TEXT,
ADD COLUMN     "prenom" TEXT NOT NULL,
ADD COLUMN     "role" TEXT,
ADD COLUMN     "serviceId" INTEGER,
ADD COLUMN     "sexe" TEXT NOT NULL,
ADD COLUMN     "statut" TEXT NOT NULL,
ADD COLUMN     "telephone" TEXT;

-- CreateTable
CREATE TABLE "RendezVous" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "medecinId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "statut" TEXT NOT NULL,
    "motif" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RendezVous_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PointageMedecin" (
    "id" SERIAL NOT NULL,
    "medecinId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "heure" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PointageMedecin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_nom_key" ON "Service"("nom");

-- CreateIndex
CREATE INDEX "PointageMedecin_medecinId_idx" ON "PointageMedecin"("medecinId");

-- CreateIndex
CREATE UNIQUE INDEX "Medecin_matricule_key" ON "Medecin"("matricule");

-- CreateIndex
CREATE UNIQUE INDEX "Medecin_email_key" ON "Medecin"("email");

-- AddForeignKey
ALTER TABLE "Medecin" ADD CONSTRAINT "Medecin_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RendezVous" ADD CONSTRAINT "RendezVous_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RendezVous" ADD CONSTRAINT "RendezVous_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "Medecin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointageMedecin" ADD CONSTRAINT "PointageMedecin_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "Medecin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
