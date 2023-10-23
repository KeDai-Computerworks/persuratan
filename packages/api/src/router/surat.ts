import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

//   suratSk        SuratSK?
// suratTeguran   SuratTeguran?
// suratSp        SuratSP?
// suratBiasa     SuratBiasa?
// suratPemecatan SuratPemecatan?
const allSchema = z.object({
  queryBy: z.enum([
    "all",
    "suratBiasa",
    "suratSk",
    "suratTeguran",
    "suratSp",
    "suratPemecatan",
  ]),
});

export const suratRouter = createTRPCRouter({
  all: publicProcedure.input(allSchema).query(async ({ ctx, input }) => {
    const select = {
      anggota: true,
      nomorSurat: true,
      perihal: true,
      id: true,
    };

    if (input.queryBy === "suratBiasa") {
      const surats = await ctx.db.suratBiasa.findMany({
        select: {
          surat: {
            select,
          },
        },
      });
      return surats.map(({ surat, ...data }) => ({ ...surat, ...data }));
    }

    if (input.queryBy === "suratPemecatan") {
      const surats = await ctx.db.suratPemecatan.findMany({
        select: {
          surat: {
            select,
          },
        },
      });
      return surats.map(({ surat, ...data }) => ({ ...surat, ...data }));
    }

    if (input.queryBy === "suratSk") {
      const surats = await ctx.db.suratSK.findMany({
        select: {
          surat: {
            select,
          },
        },
      });
      return surats.map(({ surat, ...data }) => ({ ...surat, ...data }));
    }

    if (input.queryBy === "suratSp") {
      const surats = await ctx.db.suratSP.findMany({
        select: {
          surat: {
            select,
          },
        },
      });
      return surats.map(({ surat, ...data }) => ({ ...surat, ...data }));
    }

    if (input.queryBy === "suratTeguran") {
      const surats = await ctx.db.suratSP.findMany({
        select: {
          surat: {
            select,
          },
        },
      });
      return surats.map(({ surat, ...data }) => ({ ...surat, ...data }));
    }

    const surats = await ctx.db.surat.findMany({
      select,
    });
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
