import { AnggotaList } from "~/app/_components/anggota";
import { api } from "~/trpc/server";

export default async function AnggotaListPage() {
  const anggotas = await api.anggota.all.query();
  return <AnggotaList anggotas={anggotas} />;
}
