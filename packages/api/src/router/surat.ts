import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const suratRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    const surats = await ctx.db.surat.findMany({});
    return surats;
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input: { id } }) => {
      return ctx.db.surat.findFirst({
        where: {
          id,
        },
      });
    }),

  // create: protectedProcedure
  //   .input(
  //     z.object({
  //       title: z.string().min(1),
  //       content: z.string().min(1),
  //     }),
  //   )
  //   .mutation(({ ctx, input: data }) => {
  //     // return ctx.db.insert(schema.post).values(input);
  //     return ctx.db.surat.create({
  //       data : {

  //       },
  //     });
  //   }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input: id }) => {
      return ctx.db.surat.delete({
        where: {
          id,
        },
      });
    }),
});
