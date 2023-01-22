import { PrismaClient } from "@prisma/client";

export const createDb = async (): Promise<PrismaClient> => {
  let prisma = new PrismaClient();
  await prisma.$connect();
  return prisma;
};
