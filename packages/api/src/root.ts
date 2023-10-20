import { authRouter } from "./router/auth";
import { suratRouter } from "./router/surat";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  surat: suratRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
