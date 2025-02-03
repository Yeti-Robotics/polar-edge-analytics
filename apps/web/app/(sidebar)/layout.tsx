import { AppSidebar, AppSidebarTrigger } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme";
import { auth } from "@/lib/auth";
import { SidebarProvider } from "@repo/ui/components/sidebar";
import { SessionProvider } from "next-auth/react";


export default async function SidebarLayout({ children }: Readonly<{
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
                    <AppSidebar session={session} />
                    <main className="w-full p-4 container">
                        {children}
                    </main>
                    <AppSidebarTrigger />
                </SidebarProvider>
            </SessionProvider>
        </ThemeProvider>
    );
}
