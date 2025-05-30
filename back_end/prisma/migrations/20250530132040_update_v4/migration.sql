-- CreateTable
CREATE TABLE "DossierMedical" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "date_visite" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DossierMedical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SigneVital" (
    "id" SERIAL NOT NULL,
    "dossier_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "pression" TEXT NOT NULL,
    "frequence_card" INTEGER NOT NULL,
    "saturation_oxyg" INTEGER NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SigneVital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicament" (
    "id" SERIAL NOT NULL,
    "dossier_id" INTEGER NOT NULL,
    "nom" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "frequence" TEXT NOT NULL,
    "date_debut" TIMESTAMP(3) NOT NULL,
    "date_fin" TIMESTAMP(3),
    "statut" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medicament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamenMedical" (
    "id" SERIAL NOT NULL,
    "dossier_id" INTEGER NOT NULL,
    "titre" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "statut" TEXT NOT NULL,
    "resultat" TEXT,
    "medecin_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExamenMedical_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DossierMedical_patient_id_idx" ON "DossierMedical"("patient_id");

-- CreateIndex
CREATE INDEX "SigneVital_dossier_id_idx" ON "SigneVital"("dossier_id");

-- CreateIndex
CREATE INDEX "Medicament_dossier_id_idx" ON "Medicament"("dossier_id");

-- CreateIndex
CREATE INDEX "ExamenMedical_dossier_id_idx" ON "ExamenMedical"("dossier_id");

-- AddForeignKey
ALTER TABLE "DossierMedical" ADD CONSTRAINT "DossierMedical_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SigneVital" ADD CONSTRAINT "SigneVital_dossier_id_fkey" FOREIGN KEY ("dossier_id") REFERENCES "DossierMedical"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicament" ADD CONSTRAINT "Medicament_dossier_id_fkey" FOREIGN KEY ("dossier_id") REFERENCES "DossierMedical"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamenMedical" ADD CONSTRAINT "ExamenMedical_dossier_id_fkey" FOREIGN KEY ("dossier_id") REFERENCES "DossierMedical"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamenMedical" ADD CONSTRAINT "ExamenMedical_medecin_id_fkey" FOREIGN KEY ("medecin_id") REFERENCES "Medecin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
