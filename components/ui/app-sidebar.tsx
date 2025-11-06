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
import { Car, Map, Users, Box } from "lucide-react"; // Box icon for Inventory
import Link from "next/link";

// All possible sidebar items with roles
const allItems = [
  { title: "Treiber", href: "/drivers", icon: Users, roles: ["admin"] },
  {
    title: "Fahrzeuge",
    href: "/vehicles",
    icon: Car,
    roles: ["admin", "vehicle"],
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Box,
    roles: ["admin", "inventory"],
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
                      {item.title}
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
