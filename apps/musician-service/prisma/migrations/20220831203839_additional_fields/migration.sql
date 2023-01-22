-- AlterTable
ALTER TABLE "Musician" ADD COLUMN     "born" TIME,
ADD COLUMN     "died" TIME,
ADD COLUMN     "instruments" UUID[];
