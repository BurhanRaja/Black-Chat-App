import { PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime/library";

declare global {
  var prisma: PrismaClient | undefined;
}

export type IPrismaClient = PrismaClient;

export const prisma = global.prisma || new PrismaClient();

export * from "@prisma/client";

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
