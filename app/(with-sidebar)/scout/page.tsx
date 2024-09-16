"use server";

import { createClient } from "@/lib/database/server";
import { StandForm } from "../../../lib/components/stand-form/form";
import { submitStandForm } from "./action";
import { standFormSchema } from "@/lib/components/stand-form/schema";

export default async function ScoutingPage() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return <div>Not wogged in</div>;
	}

	return <StandForm onSubmit={submitStandForm} />;
}
