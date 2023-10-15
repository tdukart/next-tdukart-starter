import { router, publicProcedure } from '../trpc';

const appRouter = router({
  health: publicProcedure
    .query(() => ({ healthcheck: 'ok' })),
});

export type AppRouter = typeof appRouter;
export default appRouter;
