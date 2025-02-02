"use client"

import { useSidebar } from "@repo/ui/components/sidebar";
import { MenuIcon } from "lucide-react";

export function MenuTrigger() {
        const { toggleSidebar } = useSidebar()
       
        return <button onClick={toggleSidebar}>
            <MenuIcon />
        </button>
      }
