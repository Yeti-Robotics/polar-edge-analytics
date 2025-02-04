import { AppSidebarTrigger, AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/app-sidebar/ThemeToggle";
import { ThemeProvider } from "@/components/theme";
import { auth } from "@/lib/auth";
import { Button } from "@repo/ui/components/button";
import { SidebarProvider } from "@repo/ui/components/sidebar";
import { SessionProvider } from "next-auth/react";

export default async function SidebarLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<SessionProvider session={session}>
				<SidebarProvider defaultOpen={false}>
					<AppSidebar />
					<main className="w-full">
						<nav className="flex items-center z-40 sticky top-0 bg-background justify-between border-b mb-2 px-4 py-2">
							<AppSidebarTrigger />
							<ThemeToggle />
						</nav>
						<div className="container">{children}</div>
					</main>
				</SidebarProvider>
			</SessionProvider>
		</ThemeProvider>
	);
}
