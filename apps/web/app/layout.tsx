import { DevTools } from "@/components/devtools/DevTools";
import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "@repo/ui/globals.css";
import { SidebarProvider } from "@repo/ui/components/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const libreFranklin = Libre_Franklin({
	subsets: ["latin"],
	variable: "--font-libre-franklin",
});

export const metadata: Metadata = {
	title: "Polar Edge Analytics",
	description: "A NC FRC Scouting Platform",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${libreFranklin.variable} bg-background font-sans dark:prose-invert min-h-screen`}
				>
				<SidebarProvider>
					<AppSidebar />
					<main className="w-full">
						{children}
					</main>
				</SidebarProvider>
				<DevTools />
			</body>
		</html>
	);
}