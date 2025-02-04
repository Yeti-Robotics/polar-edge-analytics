"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


export const ActiveLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
    const pathname = usePathname();
    
    return (
        <Link className={`${pathname === href ? "bg-accent" : ""} flex items-center space-x-2 p-1.5 rounded-md`} href={href}>
            {children}
        </Link>
    );
};