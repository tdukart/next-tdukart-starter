import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getServerSession } from 'next-auth';

import authOptions from '@/app/auth/[...nextauth]/authOptions';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext({ req, res }: trpcNext.CreateNextContextOptions) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return {
      session,
    };
  }

  return {
    session: null,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
