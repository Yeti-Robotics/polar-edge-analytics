"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/lib/components/ui/card";
import { Tabs, TabsTrigger } from "@/lib/components/ui/tabs";
import { TabsList } from "@/lib/components/ui/tabs";
import { createContext, useContext, useEffect, useState } from "react";
import { tabMappings, tabs } from "./tabs";
import { Button } from "@/lib/components/ui/button";
import {
	StandFormData,
	StandFormValidationResult,
	validateForm,
} from "@/lib/components/stand-form/client-validate";
import { TabsContentForceMount } from "./force-mount-tab";
import { useFormState } from "react-dom";
import { ServerActionResult } from "@/lib/actions/actions-utils";
import { ValidatedLabel } from "../ui/label";
import { Input } from "../ui/input";
import { useUser } from "../structural/AuthProvider";
import { runServerAction } from "./server-validate";

// TODO: Add form submission logic
export const ValidationContext = createContext({} as StandFormValidationResult);

export function StandForm({
	handleSubmit,
}: {
	handleSubmit: (data: StandFormData) => Promise<ServerActionResult<unknown>>;
}) {
	const [activeTab, setActiveTab] = useState("auto");
	const [formState, formAction] = useFormState(
		async (_: unknown, formData: FormData) => {
			const result = validateForm(formData);

			if (!result.data) {
				return result;
			}

			const serverResult = await runServerAction(
				result.data,
				handleSubmit
			);

			return serverResult;
		},
		{ formErrors: {}, data: null },
		"/"
	);

	useEffect(() => {
		const activeErrorTab = Object.keys(tabMappings).find((tabKey) =>
			Object.keys(formState.formErrors).some((errorKey) =>
				errorKey.includes(tabKey)
			)
		);

		if (activeErrorTab) {
			setActiveTab(tabMappings[activeErrorTab]);
		}
	}, [formState.formErrors]);

	return (
		<ValidationContext.Provider value={formState}>
			<form className="flex justify-center" action={formAction}>
				<Card className="prose w-fit dark:prose-invert prose-headings:font-extrabold prose-h3:my-2 prose-h4:text-xl md:p-4">
					<CardHeader>
						<CardTitle>Stand Form</CardTitle>
						<div className="flex justify-between">
							<div className="max-w-min space-y-2 text-wrap">
								<ValidatedLabel htmlFor="match_number">
									Match Number
								</ValidatedLabel>
								<Input
									name="match_number"
									className="w-28"
									type="number"
								/>
							</div>
							<div className="max-w-min space-y-2 text-wrap">
								<ValidatedLabel htmlFor="team_number">
									Team Number
								</ValidatedLabel>
								<Input
									name="team_number"
									className="w-28"
									type="number"
								/>
							</div>
						</div>
					</CardHeader>
					<CardContent className="px-6 pb-6">
						<Tabs
							value={activeTab}
							onValueChange={setActiveTab}
							className="max-w-min"
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
							<Button type="submit" className="mt-8 w-full">
								Submit
							</Button>
						</Tabs>
					</CardContent>
				</Card>
			</form>
		</ValidationContext.Provider>
	);
}
