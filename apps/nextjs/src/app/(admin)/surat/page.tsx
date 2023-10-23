import { SuratList } from "~/app/_components/surat";
import { api } from "~/trpc/server";

export default async function SuratListPage() {
  const surats = await api.surat.all.query({ queryBy: "all" });
  return <SuratList surats={surats} />;
}
