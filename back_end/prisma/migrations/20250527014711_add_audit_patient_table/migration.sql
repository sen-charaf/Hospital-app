-- CreateTable
CREATE TABLE "AuditPatient" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "champ_modifie" TEXT NOT NULL,
    "ancienne_valeur" TEXT,
    "nouvelle_valeur" TEXT NOT NULL,
    "date_modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditPatient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AuditPatient_patient_id_idx" ON "AuditPatient"("patient_id");

-- CreateIndex
CREATE INDEX "AuditPatient_user_id_idx" ON "AuditPatient"("user_id");

-- AddForeignKey
ALTER TABLE "AuditPatient" ADD CONSTRAINT "AuditPatient_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
