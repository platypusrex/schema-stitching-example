/*
  Warnings:

  - You are about to drop the column `yarnDisbanded` on the `Band` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Band" DROP COLUMN "yarnDisbanded",
ADD COLUMN     "yearDisbanded" VARCHAR(4);
