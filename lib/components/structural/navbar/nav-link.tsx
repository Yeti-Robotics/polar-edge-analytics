"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { type PageData } from "./nav-links";
import { usePathname } from "next/navigation";

export function NavLink(page: PageData): JSX.Element {
	const path = usePathname();
	const isActive = path.startsWith(page.href);
	const classes = cn(
		"flex items-center gap-2 rounded-lg p-3 text-muted-foreground transition-all duration-100 hover:text-primary",
		isActive && "text-primary bg-muted"
	);
	return (
		<Link key={page.href} className={classes} {...page}>
			{page.icon}
			{page.title}
		</Link>
	);
}
