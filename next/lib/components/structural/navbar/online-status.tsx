"use client";

import { useOnlineStatus } from "@/lib/hooks/use-online-status";

export function OnlineStatus() {
	const { isOnline } = useOnlineStatus();

	return (
		<div
			className={`flex items-center rounded-full border border-slate-700 px-2 py-0.5 text-xs text-slate-300 before:mr-1 before:inline-block before:size-2 before:rounded-full before:transition-colors before:duration-300 ${isOnline ? "before:bg-lime-400" : "before:bg-fuchsia-400"}`}
		>
			{isOnline ? "Online" : "Offline"}
		</div>
	);
}
