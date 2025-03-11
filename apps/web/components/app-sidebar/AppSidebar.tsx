import { getInitials } from "./utils";
import Logo from "../logo";
import { ActiveLink } from "./ActiveLink";

import { auth, signIn, signOut } from "@/lib/auth";
import { authorized } from "@/lib/auth/utils";
import { UserRole } from "@/lib/database/schema";
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
import {
	NotepadText,
	Grid2X2,
	LogIn,
	LogOut,
	Wrench,
	Users,
	Sparkles,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const navbarData = [
	{
		title: "Scout",
		role: UserRole.USER,
		items: [{ name: "Stand Form", icon: NotepadText, href: "/scout" }],
	},
	{
		title: "Analysis",
		items: [
			{ name: "Basic", icon: Grid2X2, href: "/analysis" },
			{ name: "Advanced", icon: Sparkles, href: "/analysis/advanced" },
		],
	},
	{
		title: "Admin",
		role: UserRole.ADMIN,
		items: [
			{ name: "Tools", icon: Wrench, href: "/admin/tools" },
			{ name: "Teams", icon: Users, href: "/admin/teams" },
		],
	},
];

type RoleObject = {
	role?: UserRole;
} & Record<string, unknown>;

type RoleMapFunction<T extends RoleObject> = (
	value: T,
	index: number,
	array: T[]
) => React.ReactNode;

const roleMap = <T extends RoleObject>(
	navData: T[],
	userRole: UserRole | undefined,
	mapFn: RoleMapFunction<T>
) => {
	return navData.map((o, i, a) =>
		!o.role ||
		authorized({
			requiredRole: o.role,
			currentUserRole: userRole,
		})
			? mapFn(o, i, a)
			: null
	);
};

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
			<SidebarHeader>
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
				{roleMap(navbarData, session?.user.role, (nav) => (
					<SidebarGroup key={nav.title}>
						<SidebarGroupLabel>{nav.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{roleMap(
									nav.items,
									session?.user.role,
									(item) => (
										<SidebarMenuItem key={item.name}>
											<SidebarMenuButton asChild>
												<ActiveLink href={item.href}>
													<item.icon className="size-4" />
													<span>{item.name}</span>
												</ActiveLink>
											</SidebarMenuButton>
										</SidebarMenuItem>
									)
								)}
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
