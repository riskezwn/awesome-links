import { PrismaClient } from '@prisma/client';
import prismaClient from '../lib/prisma';

export type Context = {
  prisma: PrismaClient
};

export async function createContext(): Promise<Context> {
  const prisma = prismaClient();
  return {
    prisma,
  };
}
