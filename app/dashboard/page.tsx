import { PageHeader } from "@/components/page-header";

export default async function Home() {
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
