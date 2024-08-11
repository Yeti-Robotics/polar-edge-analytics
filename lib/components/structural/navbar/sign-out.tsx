"use client";

import { signOutWithDiscord } from "@/lib/actions/auth";
import { DropdownMenuItem } from "../../ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function SignOut() {
	const router = useRouter();

	return (
		<DropdownMenuItem
			className="hover:cursor-pointer"
			onClick={async () => {
				await signOutWithDiscord();
				router.push("/");
			}}
		>
			Sign Out
		</DropdownMenuItem>
	);
}
