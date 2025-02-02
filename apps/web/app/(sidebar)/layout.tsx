import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@repo/ui/components/sidebar";


export default function SidebarLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                {children}
            </main>
        </SidebarProvider>
    );
}
