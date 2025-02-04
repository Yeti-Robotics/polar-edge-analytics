import { getInitials } from "./utils";
import Logo from "../logo";

import { auth, signIn, signOut } from "@/lib/auth";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@repo/ui/components/avatar";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenu,
	SidebarFooter,
	SidebarRail,
	SidebarHeader,
} from "@repo/ui/components/sidebar";
import { NotepadText, Grid2X2, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
// Menu items.
const navbarData = [
	{
		title: "Scout",
		items: [{ name: "Stand Form", icon: NotepadText, href: "/scout" }],
	},
	{
		title: "Analysis",
		items: [{ name: "Team Data Table", icon: Grid2X2, href: "/analysis" }],
	},
] as const;

export async function AppSidebar() {
	const session = await auth();

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
		<Sidebar>
			<SidebarHeader className="p-2">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<Link
								className="flex items-center gap-3 h-11"
								href="/"
							>
								<Logo className="!size-6" />
								<span className="text-sm">
									Polar Edge Analytics
								</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				{navbarData.map((nav) => (
					<SidebarGroup key={nav.title}>
						<SidebarGroupLabel>{nav.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{nav.items.map((item) => (
									<SidebarMenuItem key={item.name}>
										<SidebarMenuButton asChild>
											<Link href={item.href}>
												<item.icon />
												<span>{item.name}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<form action={authFunction}>
							<SidebarMenuButton
								type="submit"
								className="cursor-pointer h-fit"
							>
								<Avatar className="size-6 rounded-full">
									<AvatarImage
										src={session?.user.image}
										alt="User Avatar"
									/>
									<AvatarFallback>
										{getInitials(nickname)}
									</AvatarFallback>
								</Avatar>
								<div className="flex flex-col ml-4">
									<p className="capitalize">{nickname}</p>
									<p className="text-xs font-normal">
										{session?.user.name ?? ""}
									</p>
								</div>
								<AuthIcon
									className="ml-auto"
									onClick={authFunction}
								/>
							</SidebarMenuButton>
						</form>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
