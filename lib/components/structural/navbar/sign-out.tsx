"use client";

import { signOut } from "@/lib/auth-actions";
import { DropdownMenuItem } from "../../ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function SignOut() {
	const router = useRouter();

	return (
		<DropdownMenuItem
			className="hover:cursor-pointer"
			onClick={async () => {
				await signOut();
				router.push("/");
			}}
		>
			Sign Out
		</DropdownMenuItem>
	);
}
