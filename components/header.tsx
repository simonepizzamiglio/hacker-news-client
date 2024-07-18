"use client";

import { NavigationMenuLink } from "./ui/navigation-menu/navigation-menu-link.client";
import * as NavigationMenuPrimitive from "./ui/navigation-menu";
import { cva } from "class-variance-authority";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "./ui/dialog";
import { Button, Logo } from "./ui";
import { CloseIcon, HamburgerIcon } from "./ui/icons";
import { cn } from "@/lib/utils";

export interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const NavigationMenu = ({ items }: { items: NavItem[] }) => (
  <NavigationMenuPrimitive.NavigationMenu>
    <NavigationMenuPrimitive.NavigationMenuList>
      {items.map(({ icon, label, href }, index) => (
        <NavigationMenuPrimitive.NavigationMenuItem
          key={`sidebar-nav-item-${index}`}
        >
          <NavigationMenuLink href={href}>
            {icon}
            {label}
          </NavigationMenuLink>
        </NavigationMenuPrimitive.NavigationMenuItem>
      ))}
    </NavigationMenuPrimitive.NavigationMenuList>
  </NavigationMenuPrimitive.NavigationMenu>
);
const menuButtonToggleStyle = cva(
  "cursor-pointer text-light transition-transform duration-200 ease-in-out hover:bg-transparent hover:text-base-color",
);

const Sidebar = ({ navigationMenu }: { navigationMenu: React.ReactNode }) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content className="fixed inset-y-0 left-0 top-0 z-50 flex h-screen w-[240px] flex-col gap-y-4 border-r bg-background p-6 px-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left">
      <div className="flex justify-between">
        <Logo />
        <DialogPrimitive.Close className={menuButtonToggleStyle()}>
          <CloseIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </div>
      {navigationMenu}
    </DialogPrimitive.Content>
  </DialogPortal>
);

const SidebarOpenButton = ({
  navigationMenu,
  className,
}: {
  className?: string;
  navigationMenu: React.ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(menuButtonToggleStyle(), className)}
        >
          <HamburgerIcon title="Open mobile navigation" />
        </Button>
      </DialogTrigger>
      <Sidebar navigationMenu={navigationMenu} />
    </Dialog>
  );
};

export { NavigationMenu, SidebarOpenButton };
