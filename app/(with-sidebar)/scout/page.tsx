import { TabsList, TabsTrigger } from "@/lib/components/ui/tabs";
import { Button } from "@/lib/components/ui/button";
import { ForceMountTabs } from "@/lib/components/forms/force-mount-tabs";
import { getAutoTab, getTeleopTab, getEndgameTab, getMiscTab } from "./tabs";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/lib/components/ui/card";
import { createClient } from "@/lib/database/server";
import { create } from "@/lib/actions/stand-form";

export default async function ScoutingPage() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return <div>Not wogged in</div>;
	}

	return (
		<form
			action={async (d) => {
				"use server";
				d.append("scouter", user.id);
				d.append("team_number", "1");
				d.append("match_number", "1");
				d.append("event_code", "2024test");
				const res = await create(d);
			}}
		>
			<Card className="prose w-fit dark:prose-invert prose-headings:font-extrabold prose-h3:my-2 prose-h4:text-xl">
				<CardHeader>
					<CardTitle>Stand Form</CardTitle>
				</CardHeader>
				<CardContent className="px-6 pb-6">
					<ForceMountTabs
						defaultValue="auto"
						className="max-w-[400px]"
					>
						<TabsList className="grid w-full grid-cols-4">
							<TabsTrigger value="auto">Auto</TabsTrigger>
							<TabsTrigger value="teleop">Teleop</TabsTrigger>
							<TabsTrigger value="endgame">Endgame</TabsTrigger>
							<TabsTrigger value="misc">Misc</TabsTrigger>
						</TabsList>
						{getAutoTab()}
						{getTeleopTab()}
						{getEndgameTab()}
						{getMiscTab()}
						<Button type="submit" className="mt-4 w-full">
							Submit
						</Button>
					</ForceMountTabs>
				</CardContent>
			</Card>
		</form>
	);
}
