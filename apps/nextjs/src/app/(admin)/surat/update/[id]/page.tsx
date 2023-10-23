import type { Metadata } from "next";

import { SuratUpdate } from "~/app/_components/surat";
import { api } from "~/trpc/server";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;
  const surat = await api.surat.byId.query({ id });

  return {
    title: surat?.nomorSurat ?? "edit",
  };
}

export default async function SuratUpdatepage({ params }: Props) {
  const surat = await api.surat.byId.query(params);
  return <SuratUpdate surat={surat} />;
}
