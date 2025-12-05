"use client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { requireAuth } from "@/lib/auth-utils";

export default function Home() {
  const { data } = authClient.useSession();
  /*  await requireAuth(); */

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-background">
      {/*   <main className=""> */}
      {/* <div className="">
          <PageHeader
            title="Dashboard"
            description="Overview of your workforce operations"
          />
        </div> */}
      {/*  </main> */}

      {JSON.stringify(data)}

      {data && (
        <div>
          <Button onClick={() => authClient.signOut()}>Logout</Button>
        </div>
      )}
    </div>
  );
}
