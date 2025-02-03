"use client"

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "lucide-react";

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex items-center p-4">
            <button
                onClick={() =>
                    theme === "dark" ? setTheme("light") : setTheme("dark")
                }
                className="flex items-center space-x-2"
            >
                {theme === "light" ? (
                    <>
                        <SunIcon />
                        <span>Light</span>
                    </>
                ) : (
                    <>
                        <MoonIcon />
                        <span>Dark</span>
                    </>
                )}
            </button>
        </div>
    );
};

