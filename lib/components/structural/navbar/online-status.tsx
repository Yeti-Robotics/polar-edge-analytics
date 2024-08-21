"use client";
import { useOnlineStatus } from "@/lib/hooks/use-online-status";

export default function OnlineStatusBadge() {
	const { isOnline } = useOnlineStatus();
	console.log(isOnline);
	return (
		<div className="flex w-24 items-center space-x-1 rounded-full border border-gray-500 px-2 py-1 text-xs">
			<div
				className={`size-2 rounded-full ${isOnline ? "bg-green-400" : "bg-red-400"}`}
			/>
			<span>{isOnline ? "Online" : "Offline"}</span>
		</div>
	);
}
