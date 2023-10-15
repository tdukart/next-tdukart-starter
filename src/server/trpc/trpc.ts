// eslint-disable-next-line import/order
import { TRPCError, initTRPC } from '@trpc/server';
import type { Session } from 'next-auth';
import superjson from 'superjson';

import { Context } from './context';

import prisma from '@/common/prisma';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

// Base router and procedure helpers
export const { middleware } = t;
export const { router } = t;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(async ({ next, ctx }) => {
  if (!ctx.session?.user?.email) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }

  const user = await prisma.user.findUnique({
    where: { email: ctx.session.user.email as string },
    select: { id: true },
  });

  if (!user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }

  return next({
    ctx: {
      // Infers the `session` as non-nullable
      session: {
        ...ctx.session as Required<Session>,
        userId: user.id,
      },
    },
  });
});

// Protected procedures for logged-in users only
export const protectedProcedure = t.procedure.use(isAuthed);
