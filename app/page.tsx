import { Button } from "@components/ui/button";
import { Snowverlay } from "@/lib/components/decorative/snowverlay";
import Link from "next/link";
import { ArrowRight, Code, Snowflake } from "lucide-react";
import { MountainUnderlay } from "./mountain-underlay";
import { jwtVerify } from "jose";
import { createClient } from "@/lib/database/server";
import { Unlock } from "lucide-react";
import { signInWithDiscord } from "@/lib/actions/auth";

function Header() {
	return (
		<header className="absolute left-0 top-0 z-50 w-full bg-white/10  text-white backdrop-blur-md">
			<nav>
				<div className="z-50 flex items-center justify-between px-6 py-4 text-sm">
					<div>
						<Snowflake size={32} />
					</div>
					<div className="flex space-x-8">
						<Link href="/tutorial">
							<span>Tutorial</span>
						</Link>
						<Link href="/scout">
							<span>Scout</span>
						</Link>
						<Link href="/analysis">
							<span>Analyze</span>
						</Link>
					</div>
					<div>
						<Link className="flex items-center" href="/tutorial">
							<span>Login</span>
							<ArrowRight className="ml-1" size={16} />
						</Link>
					</div>
				</div>
			</nav>
		</header>
	);
}

async function HeroSection() {
	let signInButton;
	if (process.env.NODE_ENV === "development") {
		signInButton = (
			<Button variant="secondary" asChild>
				<Link href="/login-dev">
					<Unlock size={16} className="mr-1" />
					<span>YETI Login</span>
				</Link>
			</Button>
		);
	} else {
		signInButton = (
			<form action={signInWithDiscord}>
				<Button variant="secondary">
					<span>YETI Login</span>
				</Button>
			</form>
		);
	}
	return (
		<section className="relative left-0 top-0 z-10 flex min-h-screen w-full items-center justify-center p-16 text-center">
			<div>
				<div className="z-10 max-w-screen-sm space-y-3 rounded-lg p-8 text-white">
					<Link
						className="inline-flex items-center rounded-lg bg-muted/70 px-3 py-1 text-sm font-medium"
						href="/"
					>
						<Code className="mr-2" size={14} />
						<span className="text-nowrap">In Development</span>
					</Link>
					<h1 className="m-0 text-5xl font-extrabold leading-none">
						Polar Edge Analytics
					</h1>
					<p className="m-0 text-lg">
						Publicly accessible, advanced scouting data for teams in
						North Carolina. Brought to you by YETI Robotics.
					</p>
					<div className="inline-flex space-x-4">
						<Button className=" shadow-sm" variant="secondary">
							Learn More
						</Button>
						{signInButton}
					</div>
				</div>
			</div>
		</section>
	);
}
export default async function Home() {
	return (
		<main className="relative">
			<div className="fixed z-[-1] h-screen w-screen overflow-hidden bg-zinc-50">
				<div className="absolute inset-x-0 bottom-0 z-0 w-full">
					<MountainUnderlay />
				</div>
				<div className="absolute h-screen w-full bg-gradient-to-br from-primary/85 from-30% via-fuchsia-500/65 to-orange-400/90 backdrop-blur-sm"></div>
			</div>
			<Header />
			<HeroSection />
		</main>
	);
}
