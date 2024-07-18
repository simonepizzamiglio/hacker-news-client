import type { Metadata } from "next";
import "../styles/globals.css";

import { Noto_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

import {
  BriefcaseIcon,
  HomeIcon,
  ShowIcon,
  SpeakLineIcon,
} from "@/components/ui/icons";
import type { NavItem } from "@/components/header";
import * as Sidebar from "@/components/header";
import { Logo } from "@/components/ui";

const NAV_ITEMS: NavItem[] = [
  {
    icon: <HomeIcon className="h-5 w-5" />,
    label: "New",
    href: "/new",
  },
  {
    icon: <SpeakLineIcon className="h-5 w-5" />,
    label: "Ask",
    href: "/ask",
  },
  {
    icon: <ShowIcon className="h-5 w-5" />,
    label: "Show",
    href: "/show",
  },
  {
    icon: <BriefcaseIcon className="h-5 w-5" />,
    label: "Jobs",
    href: "/jobs",
  },
];

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  title: "Hacker news client",
  description: "Hacker news client built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          notoSans.className,
          notoSans.variable,
        )}
      >
        <div className="relative flex min-h-screen flex-col bg-background">
          <header className="flex justify-between border-b-2 px-8 py-4 lg:hidden">
            <Logo />
            <Sidebar.SidebarOpenButton
              className="lg:hidden"
              navigationMenu={<Sidebar.NavigationMenu items={NAV_ITEMS} />}
            />
          </header>
          <main className="flex-1">
            <div className="flex flex-1 items-start">
              <aside className="sticky left-0 top-0 hidden h-screen w-[240px] flex-col gap-y-4 border-r-2 px-8 py-4 lg:flex">
                <Logo />
                <Sidebar.NavigationMenu items={NAV_ITEMS} />
              </aside>
              <div className="flex min-h-screen flex-1 items-start px-8 lg:px-16">
                {children}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
