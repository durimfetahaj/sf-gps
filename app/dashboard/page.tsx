import { PageHeader } from "@/components/page-header";
import { requireAuth } from "@/lib/auth-utils";

export default async function Home() {
  await requireAuth();

  return (
    <div className="min-h-screen bg-background">
      <main className="">
        <div className="">
          <PageHeader
            title="Dashboard"
            description="Overview of your workforce operations"
          />
        </div>
      </main>
    </div>
  );
}
