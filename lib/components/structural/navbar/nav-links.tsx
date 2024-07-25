import { createClient } from "@/lib/database/server";
import { NavLink } from "./nav-link";
import { Beaker, Bot, GraduationCap, Hammer } from "lucide-react";
import { ReactNode } from "react";
export interface PageData {
	title: string;
	href: string;
	icon: ReactNode;
	visibility?: "scout" | "admin";
}

export const pageData: PageData[] = [
	{
		title: "Tutorial",
		href: "/tutorial",
		icon: <GraduationCap size={24} />,
	},
	{
		title: "Scout",
		href: "/scout",
		icon: <Bot size={24} />,
		visibility: "scout",
	},
	{
		title: "Analyze",
		href: "/analysis",
		icon: <Beaker size={24} />,
	},
	{
		title: "Admin",
		href: "/admin",
		icon: <Hammer size={24} />,
		visibility: "admin",
	},
];

async function NavLinks() {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	let pagesToDisplay = pageData;
	if (!user) {
		pagesToDisplay = pageData.filter((page) => !page.visibility);
	} else if (user.app_metadata?.userrole !== "ADMIN") {
		pagesToDisplay = pageData.filter((page) => page.visibility !== "admin");
	}

	return pagesToDisplay.map((page) => <NavLink key={page.href} {...page} />);
}

export { NavLinks };
