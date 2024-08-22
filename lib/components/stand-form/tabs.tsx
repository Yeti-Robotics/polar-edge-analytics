"use client";

import { CounterInput } from "@/lib/components/forms/counter-input";
import { Textarea } from "@/lib/components/ui/textarea";
import { ValidatedLabel } from "@/lib/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/lib/components/ui/select";
import { TabsContent } from "@/lib/components/ui/tabs";
import { Checkbox } from "@/lib/components/ui/checkbox";
import { useEffect, useState } from "react";

export function AutoTab() {
	return (
		<>
			<h4>Auto</h4>
			<div className="space-y-2">
				<div className="flex items-center">
					<Checkbox
						id="auto_line"
						name="auto_line"
						className="mr-2 size-6"
					/>
					<ValidatedLabel htmlFor="auto_line">
						Auto Line Crossed?
					</ValidatedLabel>
				</div>
				<div>
					<ValidatedLabel htmlFor="speaker_auto">
						Speaker Notes
					</ValidatedLabel>
					<CounterInput required name="speaker_auto" />
				</div>
				<div>
					<ValidatedLabel htmlFor="amp_auto">
						Amp Notes
					</ValidatedLabel>
					<CounterInput required name="amp_auto" />
				</div>
				<div>
					<ValidatedLabel htmlFor="shuttle_teleop">
						Shuttle Notes
					</ValidatedLabel>
					<CounterInput required name="shuttle_auto" />
				</div>
			</div>
		</>
	);
}

export function TeleopTab() {
	return (
		<>
			<h4>Teleop</h4>
			<div className="space-y-2">
				<div>
					<ValidatedLabel htmlFor="speaker_teleop">
						Speaker Notes
					</ValidatedLabel>
					<CounterInput required name="speaker_teleop" />
				</div>
				<div>
					<ValidatedLabel htmlFor="amp_teleop">
						Amp Notes
					</ValidatedLabel>
					<CounterInput required name="amp_teleop" />
				</div>
				<div>
					<ValidatedLabel htmlFor="shuttle_teleop">
						Shuttle Notes
					</ValidatedLabel>
					<CounterInput required name="shuttle_teleop" />
				</div>
			</div>
		</>
	);
}

function EndgameContent() {
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
					id="parked"
					className="size-6"
					name="parked"
					checked={parked}
					onCheckedChange={() => setParked((curr) => !curr)}
				/>
				<ValidatedLabel htmlFor="parked">Parked?</ValidatedLabel>
			</div>
			<div className="flex items-center space-x-2">
				<Checkbox
					id="climbed"
					className="size-6"
					name="climbed"
					checked={climbed}
					onCheckedChange={() => setClimbed((curr) => !curr)}
				/>
				<ValidatedLabel htmlFor="climbed">Climbed?</ValidatedLabel>
			</div>
			<div hidden={!climbed}>
				<ValidatedLabel htmlFor="bots_on_chain">
					Bots Same Chain
				</ValidatedLabel>
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

export function EndgameTab() {
	return (
		<>
			<h4>Endgame</h4>
			<EndgameContent />
		</>
	);
}

export function MiscTab() {
	return (
		<TabsContent forceMount value="misc">
			<h4>Miscellaneous</h4>
			<div className="space-y-2">
				<div>
					<ValidatedLabel htmlFor="defense_rating">
						Defense Rating
					</ValidatedLabel>
					<Select name="defense_rating">
						<SelectTrigger>
							<SelectValue placeholder="Select a defense rating" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="1">1</SelectItem>
							<SelectItem value="2">2</SelectItem>
							<SelectItem value="3">3</SelectItem>
							<SelectItem value="4">4</SelectItem>
							<SelectItem value="5">5</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<ValidatedLabel htmlFor="notes">Comments</ValidatedLabel>
					<Textarea
						name="notes"
						placeholder="Enter your comments here..."
						minLength={32}
						maxLength={256}
					></Textarea>
				</div>
			</div>
		</TabsContent>
	);
}

export const tabMappings: Record<string, string> = {
	auto: "auto",
	teleop: "teleop",
	bots_on_chain: "endgame",
	defense_rating: "misc",
	notes: "misc",
};

export const tabs = [
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
