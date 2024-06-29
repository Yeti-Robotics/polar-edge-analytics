import { Menu, Link, Snowflake } from "lucide-react";
import { Button } from "@components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetTitle,
	SheetTrigger,
	SheetContent,
} from "@components/ui/sheet";
import { Avatar, AvatarFallback } from "@components/ui/avatar";
import { NavLinks } from "./nav-links";
import { ModeToggle } from "./toggle";

function withClose(children: JSX.Element[]) {
	return children.map((child, i) => (
		<SheetClose asChild key={i}>
			{child}
		</SheetClose>
	));
}

function MobileNav() {
	return (
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
					<div className="mt-2">{withClose(NavLinks())}</div>
				</nav>
			</SheetContent>
		</Sheet>
	);
}

export function TopNavBar() {
	return (
		<header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between gap-4 border-b bg-muted/40 px-4 backdrop-blur-sm md:justify-end lg:h-[60px] lg:px-6">
			<MobileNav />
			<div className="inline-flex items-center space-x-2">
				<ModeToggle />
				<Avatar>
					<AvatarFallback>YR</AvatarFallback>
				</Avatar>
			</div>
		</header>
	);
}
