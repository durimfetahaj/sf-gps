import { getWorkerById } from "@/app/actions/workers";
import { notFound } from "next/navigation";
import Client from "./components/client";

export default async function WorkerDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const worker = await getWorkerById(id);

  if (!worker) {
    notFound();
  }

  return (
    <main>
      <Client worker={worker} />
    </main>
  );
}
