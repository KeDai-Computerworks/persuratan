import { z } from "zod";

export const suratSkSchema = z.object({
  tanggal: z.date(),
  perihal: z.string().min(2),
  anggotaId: z.string().min(2),
});

export const suratTeguranSchema = z.object({
  tanggal: z.date(),
  perihal: z.string().min(2),
  anggotaId: z.string().min(2),
  //
  lampiran: z.string().min(2),
  keterangan: z.string().min(2),
});

export const suratPemecatanSchema = z.object({
  tanggal: z.date(),
  perihal: z.string().min(2),
  anggotaId: z.string().min(2),
  //
  lampiran: z.string().min(2),
  keterangan: z.string().min(2),
});

export const suratSPSchema = z.object({
  tanggal: z.date(),
  perihal: z.string().min(2),
  anggotaId: z.string().min(2),
  //
  lampiran: z.string().min(2),
  keterangan: z.string().min(2),
});

export const suratBiasaSchema = z.object({
  tanggal: z.date(),
  perihal: z.string().min(2),
  anggotaId: z.string().min(2),
  //
  lampiran: z.string().min(2),
  keterangan: z.string().min(2),
});
