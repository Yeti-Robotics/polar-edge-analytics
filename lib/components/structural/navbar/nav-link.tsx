"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { type PageData } from "./nav-links";
import { usePathname } from "next/navigation";
import { ComponentType, ReactNode } from "react";
import { LucideProps } from "lucide-react";

function withIconStyles(Icon: ComponentType<LucideProps>): ReactNode {
	const Component = (props: JSX.IntrinsicAttributes) => {
		return <Icon className="size-6" {...props} />;
	};
	Component.displayName = "StyledIcon";
	return <Component />;
}

export function NavLink(page: PageData): JSX.Element {
	const path = usePathname();
	const isActive = path.startsWith(page.href);
	const classes = cn(
		"flex items-center gap-2 rounded-lg p-3 text-muted-foreground transition-all duration-100 hover:text-primary",
		isActive && "text-primary bg-muted"
	);
	return (
		<Link key={page.href} href={page.href} className={classes}>
			{withIconStyles(page.icon)}
			{page.title}
		</Link>
	);
}
