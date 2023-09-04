import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({});
    return posts;
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input: { id } }) => {
      return ctx.db.post.findFirst({
        where: {
          id,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input: data }) => {
      // return ctx.db.insert(schema.post).values(input);
      return ctx.db.post.create({
        data,
      });
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input: id }) => {
      return ctx.db.post.delete({
        where: {
          id,
        },
      });
    }),
});
