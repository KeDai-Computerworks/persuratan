import { anggotaRouter } from "./router/anggota";
import { authRouter } from "./router/auth";
import { suratRouter } from "./router/surat";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  surat: suratRouter,
  anggota: anggotaRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
