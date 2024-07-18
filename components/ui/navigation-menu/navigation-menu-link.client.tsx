"use client";

import { forwardRef } from "react";
import { Link as NavigationMenuPrimitiveLink } from "@radix-ui/react-navigation-menu";

import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

export const NavigationMenuLink = forwardRef<
  React.ElementRef<typeof NextLink>,
  React.ComponentPropsWithoutRef<typeof NextLink>
>(({ className, href, ...props }, ref) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <NavigationMenuPrimitiveLink
      asChild
      className={cn(
        "flex w-full items-center gap-x-2 p-1.5 text-sm text-light transition-transform delay-100 duration-200 ease-in-out hover:text-base-color",
        {
          "bg-primary-foreground text-primary hover:text-primary": isActive,
        },
        className,
      )}
      ref={ref}
      active={isActive}
    >
      <NextLink href={href} {...props} />
    </NavigationMenuPrimitiveLink>
  );
});
NavigationMenuLink.displayName = NavigationMenuPrimitiveLink.displayName;
