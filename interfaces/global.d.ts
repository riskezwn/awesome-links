import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var,vars-on-top
  var prisma: PrismaClient;
}
