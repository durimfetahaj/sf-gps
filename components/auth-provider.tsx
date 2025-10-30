import { SignedIn, SignIn, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Toaster } from "sonner";
import { AppSidebar } from "./ui/app-sidebar";
import { SidebarProvider } from "./ui/sidebar";

export async function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SignIn />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <SidebarProvider>
        <div className="flex h-full w-full">
          <AppSidebar />
          <div className="flex flex-col flex-1">
            <header className="flex justify-end items-center pt-6 pr-6 pb-0 pl-0  gap-4">
              <SignedIn>
                <UserButton showName />
              </SignedIn>
            </header>
            <main className="flex-1 p-6">
              {children}
              <Toaster />
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  // Render sidebar and main app for authenticated users
}
