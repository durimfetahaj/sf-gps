// components/UserMenu.tsx
"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"; // Kinde's pre-built links

// Shadcn/ui Imports
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserMenu() {
  // Use Kinde's client-side hook
  const { user, isLoading, isAuthenticated } = useKindeBrowserClient();

  // Show loading state
  if (isLoading) {
    return (
      <Button variant="ghost" disabled className="animate-pulse w-24"></Button>
    );
  }

  // Helper function for initials
  const getInitials = (name?: string | null) => {
    if (!name) return "UN";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // --- Display when Logged In ---
  if (isAuthenticated && user) {
    // Kinde user object has firstName, lastName, and picture
    const userName = `${user.given_name || ""} ${
      user.family_name || ""
    }`.trim();
    const userEmail = user.email;

    return (
      <DropdownMenu>
        {/* Dropdown Trigger: User's Avatar */}
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 rounded-full cursor-pointer"
          >
            <Avatar>
              <AvatarImage src="" alt="@shadcn" />
              <AvatarFallback>{getInitials(user.family_name)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        {/* Dropdown Content */}
        <DropdownMenuContent className="w-56 " align="end" forceMount>
          {/* User Info Label */}
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userName}</p>
              {userEmail && (
                <p className="text-xs leading-none text-muted-foreground">
                  {userEmail}
                </p>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Sign Out Action: Use Kinde's LogoutLink */}
          <DropdownMenuItem asChild>
            <LogoutLink className="w-full text-left cursor-pointer text-red-600 hover:text-red-700 block px-2 py-1.5 text-sm">
              Abmelden
            </LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
