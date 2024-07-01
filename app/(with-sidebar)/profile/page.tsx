import { createClient } from "@/lib/database/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div>
			<h1>Welcome back, {user.user_metadata.full_name}</h1>
		</div>
	);
}
