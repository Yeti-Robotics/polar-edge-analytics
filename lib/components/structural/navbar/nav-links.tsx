import { NavLink } from "./nav-link";
import { Beaker, Bot, GraduationCap, LucideProps } from "lucide-react";
import { ComponentType, ReactNode } from "react";

export interface PageData {
	title: string;
	href: string;
	icon: ReactNode;
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
	},
	{
		title: "Analyze",
		href: "/analysis",
		icon: <Beaker size={24} />,
	},
];

function NavLinks() {
	return pageData.map((page) => <NavLink key={page.href} {...page} />);
}

export { NavLinks };
