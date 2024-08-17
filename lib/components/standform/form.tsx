"use client";

import { ForceMountTabs } from "@/lib/components/forms/force-mount-tabs";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/lib/components/ui/card";
import { TabsTrigger } from "@/lib/components/ui/tabs";
import { CounterInput } from "@components/forms/counter-input";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import { TabsList } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import { getAutoTab, getEndgameTab, getMiscTab, getTeleopTab } from "./tabs";
import { Button } from "@/lib/components/ui/button";
import { StandFormData, validate } from "@/lib/actions/stand-form";

export function EndgameContent() {
	const [climbed, setClimbed] = useState(false);
	const [parked, setParked] = useState(false);

	useEffect(() => {
		if (climbed) {
			setParked(false);
		}
	}, [climbed]);

	useEffect(() => {
		if (parked) {
			setClimbed(false);
		}
	}, [parked]);

	return (
		<div className="space-y-2">
			<div className="flex items-center space-x-2">
				<Checkbox
					id="climbed"
					className="size-6"
					name="climbed"
					checked={climbed}
					onCheckedChange={() => setClimbed((curr) => !curr)}
				/>
				<Label htmlFor="climbed">Climbed?</Label>
			</div>
			<div className="flex items-center space-x-2">
				<Checkbox
					id="parked"
					className="size-6"
					name="parked"
					checked={parked}
					onCheckedChange={() => setParked((curr) => !curr)}
				/>
				<Label htmlFor="parked">Parked?</Label>
			</div>
			<div hidden={!climbed}>
				<Label htmlFor="bots_on_chain">Bots Same Chain</Label>
				<CounterInput
					defaultValue={1}
					required
					min={1}
					max={3}
					name="bots_on_chain"
				/>
			</div>
		</div>
	);
}

export function StandForm({
	handleSubmit,
}: {
	handleSubmit: (data: StandFormData) => Promise<unknown>;
}) {
	const [errors, setErrors] = useState([] as string[]);

	return (
		<form
			action={async (d) => {
				// TODO: use useContext to get user info? or pass in w/ props
				d.append("scouter", "0dc19558-ed9c-49c9-b1ba-9dca484c1954");
				d.append("team_number", "1");
				d.append("match_number", "1");
				d.append("event_code", "2024test");

				const res = validate(d);

				if (!res.success) {
					setErrors(res.errors);
					return;
				} else {
					// TODO: error handling in submit function
					handleSubmit(res.data!);
					setErrors([]);
				}
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
						<div>
							{errors.map((error) => (
								<p key={error} className="text-red-500">
									{error}
								</p>
							))}
						</div>
					</ForceMountTabs>
				</CardContent>
			</Card>
		</form>
	);
}
