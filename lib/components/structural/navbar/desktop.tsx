import Link from "next/link";
import { Snowflake } from "lucide-react";
import { NavLinks } from "./nav-links";

export function DesktopNav() {
	return (
		<div className="relative hidden w-full border-r bg-muted/40 md:flex md:flex-col">
			<div className="sticky top-0 flex h-full max-h-screen flex-col gap-3">
				<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
					<Link
						href="/"
						className="flex items-center gap-2 text-lg font-extrabold"
					>
						<Snowflake className="size-6 fill-white" />
						<span className="bg-gradient-to-br from-primary from-20% via-fuchsia-400 to-orange-500 bg-clip-text text-transparent">
							Polar Edge
						</span>
					</Link>
				</div>
				<div className="flex-1">
					<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
						<NavLinks />
					</nav>
				</div>
			</div>
		</div>
	);
}
