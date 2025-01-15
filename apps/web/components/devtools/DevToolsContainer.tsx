"use client";

import { useSearchParams } from "next/navigation";

export function DevToolsContainer({ children }: { children: React.ReactNode }) {
	const params = useSearchParams();
	const devTools = params.get("devtools") === "true";

	if (!devTools) return null;

	return <>{children}</>;
}
