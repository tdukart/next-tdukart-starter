import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

const appRouter = t.router({});

// only export *type signature* of router!
// to avoid accidentally importing your API
// into client-side code
export type AppRouter = typeof appRouter;
