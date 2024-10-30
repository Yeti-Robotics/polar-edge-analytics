import { createClient } from "@/lib/database/server";
import { Sidebar } from "./sidebar";

export async function NavSidebar({ children }: { children: React.ReactNode }) {
	const supabase = createClient();
	const { data } = await supabase.auth.getUser();
	return (
		<>
			<Sidebar user={data.user}>{children}</Sidebar>
		</>
	);
}
