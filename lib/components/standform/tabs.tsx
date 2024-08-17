"use client";

import { CounterInput } from "@/lib/components/forms/counter-input";
import { Textarea } from "@/lib/components/ui/textarea";
import { Label } from "@/lib/components/ui/label";
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
					<Label htmlFor="auto_line">Auto Line Crossed?</Label>
				</div>
				<div>
					<Label htmlFor="speaker_auto">Speaker Notes</Label>
					<CounterInput required name="speaker_auto" />
				</div>
				<div>
					<Label htmlFor="amp_auto">Amp Notes</Label>
					<CounterInput required name="amp_auto" />
				</div>
				<div>
					<Label htmlFor="shuttle_teleop">Shuttle Notes</Label>
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
					<Label htmlFor="speaker_teleop">Speaker Notes</Label>
					<CounterInput required name="speaker_teleop" />
				</div>
				<div>
					<Label htmlFor="amp_teleop">Amp Notes</Label>
					<CounterInput required name="amp_teleop" />
				</div>
				<div>
					<Label htmlFor="shuttle_teleop">Shuttle Notes</Label>
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
					<Label htmlFor="defense_rating">Defense Rating</Label>
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
					<Label htmlFor="notes">Comments</Label>
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
