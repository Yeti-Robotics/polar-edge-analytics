import { AppSidebarTrigger, AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/app-sidebar/ThemeToggle";
import { ThemeProvider } from "@/components/theme";
import { auth } from "@/lib/auth";
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
				<SidebarProvider>
					<AppSidebar />
					<main className="overflow-hidden w-full">
						<nav className="flex items-center z-40 sticky top-0 bg-background justify-between border-b mb-2 px-4 py-2">
							<AppSidebarTrigger />
							<ThemeToggle />
						</nav>
						<div className="flex-1 flex flex-col mx-auto p-6 w-full">{children}</div>
					</main>
				</SidebarProvider>
			</SessionProvider>
		</ThemeProvider>
	);
}
