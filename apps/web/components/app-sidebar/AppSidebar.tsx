import { ArrowBigRight, Binoculars, Grid2X2, LogIn, LogOut } from "lucide-react"

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
} from "@repo/ui/components/sidebar"

import Logo from "@/components/logo"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar"
import { Session } from "next-auth";
import { getInitials } from "./utils";
import { signIn, signOut } from "@/lib/auth";
import { useTheme } from "next-themes";
import { ThemeToggle } from "./ThemeToggle";
// Menu items.
const items = [
  {
    title: "Scout",
    url: "/scout",
    icon: Binoculars,
  },
  {
    title: "Data",
    url: "/analysis",
    icon: Grid2X2,
  }
]

type SidebarProps = {
  session: Session | null
}

export function AppSidebar({ session }: SidebarProps) {
  return (
    <Sidebar className="bg-background">
      <SidebarHeader>
        <Logo className="w-10 h-10 m-2" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col items-baseline">
          <div className="flex flex-row items-center p-4 bg-background hover:bg-accent rounded-2xl cursor-pointer">
            <Avatar>
              <AvatarImage className="rounded-full" src={session?.user.image} alt="User Avatar" />
              <AvatarFallback>{session?.user.name ? getInitials(session.user.name) : "G"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col ml-4">
              <p className="capitalize">{session?.user.guildNickname ?? "Guest"}</p>
              <p className="text-xs font-normal">{session?.user.name ?? ""}</p>
            </div>
            <div className="ml-auto hover:bg-accent rounded-2xl">
              {
                session?.user ? <LogOut onClick={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }} /> : <LogIn onClick={async () => {
                  "use server";
                  await signIn("discord", { redirectTo: "/scout" });
                }} />
              }
            </div>
          </div>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
