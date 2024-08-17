"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/lib/components/ui/card";
import { Tabs, TabsTrigger } from "@/lib/components/ui/tabs";
import { TabsList } from "@/lib/components/ui/tabs";
import { useState } from "react";
import { AutoTab, EndgameTab, MiscTab, TeleopTab } from "./tabs";
import { Button } from "@/lib/components/ui/button";
import { StandFormData, validate } from "@/lib/actions/stand-form";
import { TabsContentForceMount } from "./force-mount-tab";
import { useFormState } from "react-dom";
import { ServerActionResult } from "@/lib/actions/actions-utils";

// TODO: Add form submission logic

export function StandForm({
	handleSubmit,
}: {
	handleSubmit: (data: StandFormData) => Promise<ServerActionResult<unknown>>;
}) {
	const [activeTab, setActiveTab] = useState("auto");

	const tabs = [
		{
			value: "auto",
			content: <AutoTab />,
			displayText: "Auto",
		},
		{
			value: "teleop",
			content: <TeleopTab />,
			displayText: "Teleop",
		},
		{
			value: "endgame",
			content: <EndgameTab />,
			displayText: "Endgame",
		},
		{
			value: "misc",
			content: <MiscTab />,
			displayText: "Misc",
		},
	];

	const [formState, formAction] = useFormState(
		async (_: unknown, formData: FormData) => {
			formData.append("scouter", "e22e61b8-bd4d-425d-8d6b-ba1b7e93c2e0");
			formData.append("team_number", "1");
			formData.append("match_number", "1");
			formData.append("event_code", "2024test");

			const result = validate(formData);

			if (result.errors.length) {
				return { errors: result.errors };
			}

			await handleSubmit(result.data!);

			return { errors: [] };
		},
		null
	);

	return (
		<form action={formAction}>
			<Card className="prose w-fit dark:prose-invert prose-headings:font-extrabold prose-h3:my-2 prose-h4:text-xl">
				<CardHeader>
					<CardTitle>Stand Form</CardTitle>
				</CardHeader>
				<CardContent className="px-6 pb-6">
					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className="max-w-[400px]"
					>
						<TabsList>
							{tabs.map(({ value, displayText }) => (
								<TabsTrigger key={value} value={value}>
									{displayText}
								</TabsTrigger>
							))}
						</TabsList>
						{tabs.map(({ value, content }) => (
							<TabsContentForceMount
								key={value}
								value={value}
								activeTab={activeTab}
							>
								{content}
							</TabsContentForceMount>
						))}
						<Button type="submit" className="mt-4 w-full">
							Submit
						</Button>
						<div>
							{formState?.errors.map((error) => (
								<p key={error} className="text-red-500">
									{error}
								</p>
							))}
						</div>
					</Tabs>
				</CardContent>
			</Card>
		</form>
	);
}
