import Link from "next/link";

export function Navbar() {
	return (
		<header className="sticky top-0 z-50 h-16 bg-background/30 p-4 backdrop-blur-md">
			<Link href="/">
				<span className="text-lg font-black">Polar Edge</span>
			</Link>
		</header>
	);
}
