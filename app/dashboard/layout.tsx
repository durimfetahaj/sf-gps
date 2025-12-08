import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import UserMenu from "@/components/user-menu";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Protect all routes under /dashboard
  /* await requireAuth(); */

  return (
    <SidebarProvider>
      <div className="flex h-full w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex justify-end items-center pt-6 pr-6 pb-0 pl-0 gap-4">
            {/* Header content like user button, etc. */}
            <UserMenu />
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
