import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Claims, getSession } from '@auth0/nextjs-auth0';
import prisma from '../lib/prisma';

export type Context = {
  user?: Claims
  accessToken?: string
  prisma: PrismaClient
};

interface Props {
  req: NextApiRequest,
  res: NextApiResponse
}

export async function createContext({ req, res }: Props): Promise<Context> {
  const session = getSession(req, res);

  if (!session) return { prisma };

  const { user, accessToken } = session;

  return {
    user,
    prisma,
    accessToken,
  };
}
