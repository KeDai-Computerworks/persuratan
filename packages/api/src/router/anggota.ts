import { z } from "zod";

import { anggotaCreateSchema, anggotaUpdateSchema } from "../../schema/anggota";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const anggotaRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    const anggotas = await ctx.db.anggota.findMany({
      include: { surat: true, _count: true, user: true },
    });
    return anggotas;
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input: { id } }) => {
      return ctx.db.anggota.findFirst({
        where: {
          id,
        },
      });
    }),

  create: publicProcedure
    .input(anggotaCreateSchema)
    .mutation(({ ctx, input: data }) => {
      // return ctx.db.insert(schema.post).values(input);
      return ctx.db.anggota.create({
        data,
      });
    }),

  update: publicProcedure
    .input(anggotaUpdateSchema)
    .mutation(({ ctx, input: { id, ...data } }) => {
      // return ctx.db.insert(schema.post).values(input);
      return ctx.db.anggota.update({
        data,
        where: {
          id,
        },
      });
    }),

  delete: publicProcedure.input(z.string()).mutation(({ ctx, input: id }) => {
    return ctx.db.anggota.delete({
      where: {
        id,
      },
    });
  }),
});
