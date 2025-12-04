"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  ClipboardList,
  LayoutDashboard,
  Package,
  Truck,
  Users,
} from "lucide-react"; // Box icon for Inventory
import Link from "next/link";
import { usePathname } from "next/navigation";

// All possible sidebar items with roles
const allItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, roles: ["admin"] },
  /*   { href: "/drivers", label: "Treiber", icon: Users, roles: ["admin"] }, */
  { href: "/workers", label: "Workers", icon: Users, roles: ["admin"] },
  {
    href: "/vehicles",
    label: "Vehicles",
    icon: Truck,
    roles: ["admin", "vehicle"],
  },
  {
    href: "/inventory",
    label: "Inventory",
    icon: Package,
    roles: ["admin", "inventory"],
  },
  /* { href: "/wages", label: "Wages", icon: DollarSign, roles: ["admin"] }, */
  {
    href: "/assignments",
    label: "Assignments",
    icon: ClipboardList,
    roles: ["admin"],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  /*   const { user } = useUser();
  const role = user?.publicMetadata?.role as string | undefined; */

  // Filter items based on role
  /* const visibleItems = allItems.filter((item) => {
    if (role === "admin") return true; // Admin sees everything
    return role ? item.roles.includes(role) : false;
  }); */

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-lg font-semibold px-2">SF-Bau Manager</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {allItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <Link
                        key={item.href}
                        href={item.href}
                        /* onClick={() => setMobileOpen(false)} */
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-primary hover:text-sidebar-primary"
                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
