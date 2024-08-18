import { createClient } from "@/lib/database/server";
import { StandForm } from "../../../lib/components/stand-form/form";

export default async function ScoutingPage() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return <div>Not wogged in</div>;
	}

	return (
		<StandForm
			handleSubmit={async (data) => {
				"use server";
				// TODO: add actual submission logic
				console.log(data);
				return { success: true, value: data };
			}}
		/>
	);
}
