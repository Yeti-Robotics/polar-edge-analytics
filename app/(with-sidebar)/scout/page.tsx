import { TabsList, TabsTrigger } from "@/lib/components/ui/tabs";
import { Button } from "@/lib/components/ui/button";
import { ForceMountTabs } from "@/lib/components/forms/force-mount-tabs";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/lib/components/ui/card";
import { createClient } from "@/lib/database/server";
import { StandForm } from "../../../lib/components/standform/form";

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
				console.log(data);
			}}
		/>
	);
}
