"use client";

import { SidebarMenuButton } from "@repo/ui/components/sidebar";
import { SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const Icon = theme === "dark" ? MoonIcon : SunIcon;

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <SidebarMenuButton className="cursor-pointer" size="lg" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <div className="rounded-lg aspect-square size-8 flex items-center justify-center">
                {mounted ? <Icon /> : ""}
            </div>
            <div className="flex flex-col ml-4">
                <p className="capitalize">{mounted ? `${theme} mode` : ""}</p>
            </div>
        </SidebarMenuButton>
    );
};

