-- CreateTable
CREATE TABLE "Band" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "members" UUID[],
    "genres" UUID[],
    "yearEstablished" VARCHAR(4),
    "yarnDisbanded" VARCHAR(4),

    CONSTRAINT "Band_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Band_name_key" ON "Band"("name");
