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
import { useUser } from "@clerk/nextjs";
import {
  ClipboardList,
  DollarSign,
  LayoutDashboard,
  Package,
  Truck,
  Users,
} from "lucide-react"; // Box icon for Inventory
import Link from "next/link";

// All possible sidebar items with roles
const allItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, roles: ["admin"] },
  { href: "/drivers", label: "Treiber", icon: Users, roles: ["admin"] },
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
  { href: "/wages", label: "Wages", icon: DollarSign, roles: ["admin"] },
  {
    href: "/assignments",
    label: "Assignments",
    icon: ClipboardList,
    roles: ["admin"],
  },
];

export function AppSidebar() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role as string | undefined;

  // Filter items based on role
  const visibleItems = allItems.filter((item) => {
    if (role === "admin") return true; // Admin sees everything
    return role ? item.roles.includes(role) : false;
  });

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-lg font-semibold px-2">SF-Bau Manager</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
