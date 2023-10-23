import type { Metadata } from "next";

import { AnggotaUpdate } from "~/app/_components/anggota";
import { api } from "~/trpc/server";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;
  const anggota = await api.anggota.byId.query({ id });

  return {
    title: anggota?.nama ?? "edit",
  };
}

export default async function AnggotaUpdatepage({ params }: Props) {
  const anggota = await api.anggota.byId.query(params);
  return <AnggotaUpdate anggota={anggota} />;
}
