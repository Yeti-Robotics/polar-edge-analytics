import Link from "next/link";
import { ModeToggle } from "./toggle";

export function Navbar() {
	return (
		<header className="sticky top-0 z-50 flex h-16 w-full items-center bg-background/30 p-4 backdrop-blur-md">
			<Link className="grow" href="/">
				<span className="text-lg font-black">Polar Edge</span>
				<ModeToggle />
			</Link>
		</header>
	);
}
