"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { createContext, useContext, useState } from "react";

export function NavAccordionTrigger({
	children,
}: {
	children: React.ReactNode;
}) {
	const { expanded, setExpanded } = useAccordionContext();
	return (
		<div
			onClick={setExpanded}
			className="flex w-full items-center justify-between rounded-md p-2 hover:cursor-pointer hover:bg-slate-700/50 hover:stroke-primary hover:text-primary"
		>
			<div className="flex items-center">{children}</div>
			<ChevronRight
				className={`size-4 ${expanded ? "rotate-90" : "rotate-0"} transition-transform duration-100`}
			/>
		</div>
	);
}

export function NavAccordionContent({
	children,
}: {
	children: React.ReactNode;
}) {
	const { expanded } = useAccordionContext();
	return (
		<div
			className={`${expanded ? "block overflow-hidden sm:hidden sm:group-hover/nav:block" : "hidden"} my-1 space-y-2 `}
		>
			{children}
		</div>
	);
}

export function NavAccordionLink({
	children,
	href,
}: {
	children: React.ReactNode;
	href: string;
}) {
	return (
		<Link
			href={href}
			className="ml-4 flex items-center gap-2 text-sm hover:stroke-primary hover:text-primary"
		>
			{children}
		</Link>
	);
}

const AccordionContext = createContext({
	expanded: false,
	setExpanded: () => {},
});

const useAccordionContext = () => useContext(AccordionContext);

export function NavAccordion({ children }: { children: React.ReactNode }) {
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded((c) => !c);
	};

	return (
		<div className="group/nav-accordion w-full min-w-40">
			<AccordionContext.Provider
				value={{ expanded, setExpanded: handleExpandClick }}
			>
				{children}
			</AccordionContext.Provider>
		</div>
	);
}

export function NavLink({
	children,
	href,
	target,
}: {
	children: React.ReactNode;
	href: string;
	target?: string;
}) {
	return (
		<Link
			href={href}
			target={target}
			className="flex w-full min-w-40 items-center rounded-md p-2 hover:bg-slate-700/50 hover:stroke-primary hover:text-primary"
		>
			{children}
		</Link>
	);
}
