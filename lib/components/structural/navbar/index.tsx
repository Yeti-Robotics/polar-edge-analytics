"use client";
import Link from "next/link";
import { ModeToggle } from "./toggle";
import { Menu, Snowflake } from "lucide-react";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "../../ui/sheet";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { usePathname } from "next/navigation";
import { pageData } from "./page-data";
import { cn } from "@/lib/utils";
import { index } from "drizzle-orm/mysql-core";

function NavLinks({ path }: { path: string }) {
	return pageData.map((page) => (
		<Link
			key={page.href}
			href={page.href}
			className={cn(
				"flex items-center gap-2 rounded-lg p-3 text-muted-foreground transition-all duration-100 hover:text-primary",
				path.startsWith(page.href) && "text-primary bg-muted"
			)}
		>
			{page.icon}
			{page.title}
		</Link>
	));
}

function withClose(children: JSX.Element[]) {
	return children.map((child, i) => (
		<SheetClose asChild key={i}>
			{child}
		</SheetClose>
	));
}

function DesktopNav({ path }: { path: string }) {
	return (
		<div className="relative hidden w-full border-r bg-muted/40 md:flex md:flex-col">
			<div className="sticky top-0 flex h-full max-h-screen flex-col gap-3">
				<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
					<Link
						href="/"
						className="flex items-center gap-2 text-lg font-extrabold"
					>
						<Snowflake className="size-6 fill-white" />
						<span>Polar Edge</span>
					</Link>
				</div>
				<div className="flex-1">
					<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
						<NavLinks path={path} />
					</nav>
				</div>
			</div>
		</div>
	);
}

function TopBar() {
	const path = usePathname();

	return (
		<header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between gap-4 border-b bg-muted/40 px-4 backdrop-blur-sm md:justify-end lg:h-[60px] lg:px-6">
			<Sheet>
				<SheetTitle hidden>Navigation</SheetTitle>
				<SheetTrigger asChild>
					<Button
						size="icon"
						className="shrink-0 md:hidden"
						variant="outline"
					>
						<Menu className="size-6" />
						<span className="sr-only">Open Sidebar</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="flex flex-col px-6">
					<nav className="grid gap-2 text-lg font-medium">
						<Link
							href="/"
							className="flex items-center gap-2 text-lg font-semibold"
						>
							<Snowflake className="size-6" />
							<span className="sr-only">Polar Edge</span>
						</Link>
						<div className="mt-2">
							{withClose(NavLinks({ path }))}
						</div>
					</nav>
				</SheetContent>
			</Sheet>
			<div className="inline-flex space-x-2">
				<ModeToggle />
				<Avatar>
					<AvatarFallback>YR</AvatarFallback>
				</Avatar>
			</div>
		</header>
	);
}

export function NavSidebar({ children }: { children: React.ReactNode }) {
	const path = usePathname();

	// homepage has special layout
	if (path === "/") {
		return <>{children}</>;
	}

	return (
		<div className="relative w-full">
			<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
				<DesktopNav path={path} />
				<div className="flex flex-col">
					<TopBar />
					<div className="relative  flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
