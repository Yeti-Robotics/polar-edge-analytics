import { Menu, Snowflake, Unlock } from "lucide-react";
import { Button } from "@components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetTitle,
	SheetTrigger,
	SheetContent,
} from "@components/ui/sheet";
import { Avatar, AvatarFallback } from "@components/ui/avatar";
import { NavLinks, pageData } from "./nav-links";
import { ModeToggle } from "./toggle";
import { signIn } from "@/lib/auth-actions";
import { createClient } from "@/lib/database/server";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import Link from "next/link";
import { SignOut } from "./sign-out";
import { NavLink } from "./nav-link";

async function AuthManager() {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user) {
		return (
			<div className="flex items-center space-x-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Avatar className="hover:cursor-pointer">
							<AvatarImage
								src={user.user_metadata.picture}
								alt="Avatar"
							/>
							<AvatarFallback>
								{user.user_metadata.full_name}
							</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Link href="/profile">Profile</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuGroup>
							<SignOut />
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		);
	} else {
		return (
			<form action={signIn}>
				<Button variant="secondary">
					<Unlock size={16} className="mr-1" />
					YETI Login
				</Button>
			</form>
		);
	}
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
						<span className="">Polar Edge</span>
					</Link>
					<div className="mt-2">
						{pageData.map((page, i) => (
							<SheetClose key={i} asChild>
								<NavLink key={i} {...page} />
							</SheetClose>
						))}
					</div>
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
				<AuthManager />
			</div>
		</header>
	);
}
