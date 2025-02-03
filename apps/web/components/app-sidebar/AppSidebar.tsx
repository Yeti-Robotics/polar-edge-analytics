import { Binoculars, ChartBarIncreasing, Grid2X2, Key, LogIn, LogOut, NotepadText } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@repo/ui/components/sidebar"

import Logo from "@/components/logo"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar"
import { Session } from "next-auth";
import { getInitials } from "./utils";
import { signIn, signOut } from "@/lib/auth";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { NavbarLink } from "./NavbarLink";

const navbarData = [
  {
    title: "Scout",
    items: [{ name: "Stand Form", icon: NotepadText, href: "/scout" }]
  },
  {
    title: "Analysis",
    items: [
      { name: "Team Data Table", icon: Grid2X2, href: "/analysis" }
    ]
  }
]

type SidebarProps = {
  session: Session | null
}

export function AppSidebar({ session }: SidebarProps) {
  const authFunction = async () => {
    "use server";

    if (session?.user) {
      await signOut({ redirectTo: "/" });
    } else {
      await signIn("discord", { redirectTo: "/scout" });
    }
  };

  const nickname = session?.user.guildNickname ?? "Guest";
  const AuthIcon = session?.user ? LogOut : LogIn;

  return (
    <Sidebar className="bg-background">
      <SidebarHeader>
        <SidebarMenuButton className="hover:bg-transparent focus:bg-transparent" size="lg">
          <div className="size-6 aspect-square">
            <Logo />
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="-space-y-3">
        {
          navbarData.map((nav) => {
            return (
              <SidebarGroup key={nav.title}>
                <SidebarGroupLabel className="capitalize text-lg">
                  {nav.title}
                </SidebarGroupLabel>
                <SidebarMenu>
                  {
                    nav.items.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton className="cursor-pointer" size="lg">
                          <NavbarLink href={item.href}>
                            <div>
                              <item.icon />
                            </div>
                            <span>{item.name}</span>
                          </NavbarLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  }
                </SidebarMenu>
              </SidebarGroup>
            )
          })
        }
      </SidebarContent>
      <SidebarFooter >
        <ThemeToggle />
        <SidebarMenuButton
          size="lg"
          onClick={authFunction}
          className="cursor-pointer"
        >
          <Avatar className="size-8 rounded-lg">
            <AvatarImage src={session?.user.image} alt="User Avatar" />
            <AvatarFallback>{getInitials(nickname)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col ml-4">
            <p className="capitalize">{nickname}</p>
            <p className="text-xs font-normal">{session?.user.name ?? ""}</p>
          </div>
          <AuthIcon className="ml-auto" onClick={authFunction} />
        </SidebarMenuButton>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
