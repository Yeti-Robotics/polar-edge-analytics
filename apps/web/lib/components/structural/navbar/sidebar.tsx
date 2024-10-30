"use client";
import PolarEdgeLogo from "./logo.icon";
import {
	Compass,
	LogIn,
	LogOut,
	MenuIcon,
	NotebookTabs,
	NotepadText,
	Telescope,
} from "lucide-react";
import Link from "next/link";
import {
	NavAccordion,
	NavAccordionContent,
	NavAccordionLink,
	NavAccordionTrigger,
	NavLink,
} from "./nav-items";
import { useRef, useState } from "react";
import { OnlineStatus } from "./online-status";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { User } from "@supabase/supabase-js";
import { signInWithDiscord, signOut } from "@/lib/actions/auth";
import { Button } from "../../ui/button";
import { getNodeEnv } from "@/lib/utils";

export function Sidebar({
	children,
	user,
}: {
	children: React.ReactNode;
	user: User | null;
}) {
	const [isOpenMobile, setIsOpenMobile] = useState(false);
	const mobileNavRef = useRef<HTMLElement>(null);

	const handlePageClick = (e: any) => {
		if (isOpenMobile && !mobileNavRef.current?.contains(e.target)) {
			setIsOpenMobile(false);
		}
	};

	let authButton = (
		<form action={signOut}>
			<Button
				className="flex w-full min-w-40 items-center justify-start p-2"
				type="submit"
				variant="ghost"
			>
				<LogOut className="size-5" />
				<span className="ml-2 flex text-sm leading-4 sm:hidden sm:group-hover/nav:flex">
					Sign Out
				</span>
			</Button>
		</form>
	);

	if (!user && getNodeEnv() === "development") {
		authButton = (
			<NavLink href="/login-dev">
				<LogIn className="size-5" />
				<span className="ml-2 flex text-sm leading-4 sm:hidden sm:group-hover/nav:flex">
					Sign In
				</span>
			</NavLink>
		);
	} else if (!user && getNodeEnv() === "production") {
		authButton = (
			<form action={signInWithDiscord}>
				<Button
					className="flex w-full min-w-40 items-center justify-start p-2"
					type="submit"
					variant="ghost"
				>
					<LogOut className="size-5" />
					<span className="ml-2 flex text-sm leading-4 sm:hidden sm:group-hover/nav:flex">
						Sign In
					</span>
				</Button>
			</form>
		);
	}

	return (
		<div className="relative" onClick={handlePageClick}>
			<div className="fixed z-50 flex h-12 w-screen items-center justify-between border-b border-slate-700 bg-background px-4">
				<div className="flex items-center space-x-4 sm:ml-12">
					<MenuIcon
						onClick={() => setIsOpenMobile(true)}
						className="size-8 fill-white hover:cursor-pointer sm:hidden"
					/>
				</div>
				<OnlineStatus />
			</div>
			<div className="relative flex w-full">
				<nav
					ref={mobileNavRef}
					className={`overflow-hidden duration-200`}
				>
					<div
						className={`group/nav fixed z-50 h-screen flex ${isOpenMobile ? "w-56" : "box-border w-0"} flex-col overflow-hidden bg-background transition-[width]  hover:w-56 dark:border-r dark:border-r-slate-700 sm:w-16`}
					>
						<Link
							className="mx-2 mb-4 mt-2 flex w-12 flex-col items-center justify-center"
							href="/"
						>
							<PolarEdgeLogo width={36} height={36} />
						</Link>
						<div className="mx-3 flex h-full flex-col">
							<div className="flex grow flex-col space-y-1">
								<NavAccordion>
									<NavAccordionTrigger>
										<Telescope className="mr-2 size-5" />
										<span className="flex leading-4 sm:hidden sm:group-hover/nav:flex">
											Scout
										</span>
									</NavAccordionTrigger>
									<NavAccordionContent>
										<NavAccordionLink href="/scout">
											<NotepadText className="size-4" />
											<span>Stand Form</span>
										</NavAccordionLink>
									</NavAccordionContent>
								</NavAccordion>
								<NavLink href="/analysis">
									<Compass className="mr-2 size-5" />
									<span className="flex leading-4 sm:hidden sm:group-hover/nav:flex">
										Analysis
									</span>
								</NavLink>
								<hr className="border-slate-700" />
								<NavLink
									target="_blank"
									href="https://wiki.yetirobotics.org/books/polar-edge-analytics"
								>
									<NotebookTabs className="mr-2 size-5" />
									<span className="flex leading-4 sm:hidden sm:group-hover/nav:flex">
										Docs
									</span>
								</NavLink>
							</div>
							<div className="mb-4 flex flex-col space-y-2">
								{user && (
									<div className="flex items-center">
										<Avatar>
											<AvatarImage
												src={
													user?.user_metadata?.picture
												}
											></AvatarImage>
											<AvatarFallback>YS</AvatarFallback>
										</Avatar>
										<span className="ml-2 flex w-full overflow-hidden text-nowrap text-sm leading-4 sm:hidden sm:group-hover/nav:flex">
											{user?.email}
										</span>
									</div>
								)}
								<hr className="border-slate-700" />
								{authButton}
							</div>
						</div>
					</div>
				</nav>
				<div className="relative top-12 z-0 p-4 sm:left-16 min-h-[calc(100vh-3rem)] w-[calc(100%-5rem)]">
					{children}
				</div>
			</div>
		</div>
	);
}
