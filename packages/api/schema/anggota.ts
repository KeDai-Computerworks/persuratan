import { z } from "zod";

export const anggotaCreateSchema = z.object({
  nama: z.string().min(1),
  nim: z.string().min(1),
  nra: z.string().min(1),
});

export const anggotaUpdateSchema = z
  .object({
    id: z.string().min(1),
  })
  .merge(anggotaCreateSchema);
