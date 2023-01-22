-- CreateEnum
CREATE TYPE "InstrumentFamily" AS ENUM ('PERCUSSION', 'WIND', 'STRING', 'ELECTRONIC');

-- CreateTable
CREATE TABLE "Instrument" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "family" "InstrumentFamily" NOT NULL,

    CONSTRAINT "Instrument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Instrument_name_key" ON "Instrument"("name");
