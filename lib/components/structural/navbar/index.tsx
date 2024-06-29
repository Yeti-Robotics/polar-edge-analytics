"use client";

import { usePathname } from "next/navigation";
import { DesktopNav } from "./desktop";
import { TopNavBar } from "./top-nav";

export function NavSidebar({ children }: { children: React.ReactNode }) {
	const path = usePathname();

	// homepage has special layout
	if (path === "/") {
		return <>{children}</>;
	}

	return (
		<div className="relative w-full">
			<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
				<DesktopNav />
				<div className="flex flex-col">
					<TopNavBar />
					<div className="relative  flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
