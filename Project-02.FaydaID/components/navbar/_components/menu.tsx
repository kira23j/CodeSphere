"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Menu() {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="space-x-3">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-md transition-colors duration-200"
              )}
            >
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/verify-identity" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-md transition-colors duration-200"
              )}
            >
              Verify Identity
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/ai" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-md transition-colors duration-200"
              )}
            >
              AI Assistant
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// Optional: Use for dropdown or submenu list items
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block space-y-1 rounded-md p-3 leading-none no-underline transition-colors duration-200 text-gray-300 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold">{title}</div>
          <p className="text-sm text-gray-400 leading-snug">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
