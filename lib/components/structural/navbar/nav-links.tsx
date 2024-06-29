import { NavLink } from "./nav-link";
import { Beaker, Bot, GraduationCap, LucideProps } from "lucide-react";
import { ComponentType, JSX, ReactNode } from "react";

export interface PageData {
	title: string;
	href: string;
	icon: ComponentType<LucideProps>;
}

const pageData: PageData[] = [
	{
		title: "Tutorial",
		href: "/tutorial",
		icon: GraduationCap,
	},
	{
		title: "Scout",
		href: "/scout",
		icon: Bot,
	},
	{
		title: "Analyze",
		href: "/analysis",
		icon: Beaker,
	},
];

function NavLinks() {
	return pageData.map((page) => <NavLink key={page.href} {...page} />);
}

export { NavLinks };
