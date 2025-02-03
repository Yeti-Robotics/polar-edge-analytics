"use client";

import { useSidebar } from "@repo/ui/components/sidebar";
import { PanelLeft } from "lucide-react";

export function AppSidebarTrigger() {
    const { toggleSidebar, open, openMobile } = useSidebar();

    return (
        <div onClick={toggleSidebar} className={`${open || openMobile ? "left-[18rem]" : "left-4"} p-2 rounded-2xl transition-all duration-300 bottom-4 fixed z-70 bg-accent/70`}>
            <PanelLeft />
        </div>
    );
}