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
import { Car, Map, Users } from "lucide-react";
import Link from "next/link";

const items = [
  { title: "Arbeitsprotokolle", href: "/", icon: Map },
  { title: "Treiber", href: "/drivers", icon: Users },
  { title: "Fahrzeuge", href: "/vehicles", icon: Car },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-lg font-semibold px-2">SF-Bau Manager</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
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
      <SidebarFooter>{/*   <SidebarTrigger /> */}</SidebarFooter>
    </Sidebar>
  );
}
