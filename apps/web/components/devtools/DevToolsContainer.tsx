"use client";

import { Suspense, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";

export function DevToolsLoader({ children }: { children: ReactNode }) {
	const params = useSearchParams();
	const devTools = params.get("devtools") === "true";

	if (!devTools) return null;

	return <>{children}</>;
}

export function DevToolsContainer({ children }: { children: ReactNode }) {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<DevToolsLoader>{children}</DevToolsLoader>
		</Suspense>
	);
}
