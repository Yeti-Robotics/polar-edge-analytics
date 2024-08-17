import { CounterInput } from "@/lib/components/forms/counter-input";
import { Textarea } from "@/lib/components/ui/textarea";
import { EndgameContent } from "./form";
import { Label } from "@/lib/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/lib/components/ui/select";
import { TabsContent, TabsList, TabsTrigger } from "@/lib/components/ui/tabs";
import { Checkbox } from "@/lib/components/ui/checkbox";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/lib/components/ui/card";
import { ForceMountTabs } from "@/lib/components/forms/force-mount-tabs";
import { Button } from "@/lib/components/ui/button";
import { validate } from "@/lib/actions/stand-form";
import { useState } from "react";

export function NotesMissed({ name }: { name: string }) {
	return (
		<div>
			<Label htmlFor={name}>Notes Missed</Label>
			<CounterInput required name={name} />
		</div>
	);
}

export function getAutoTab() {
	return (
		<TabsContent value="auto">
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
				<NotesMissed name="notes_missed_auto" />
			</div>
		</TabsContent>
	);
}

export function getTeleopTab() {
	return (
		<TabsContent value="teleop">
			<h4>Teleop</h4>
			<div className="space-y-2">
				<div>
					<Label htmlFor="speaker_teleop">Speaker Notes</Label>
					<CounterInput required name="speaker_teleop" />
				</div>
				<div>
					<Label htmlFor="amp_teleop">Amped Speaker Notes</Label>
					<CounterInput required name="amped_speaker_teleop" />
				</div>
				<div>
					<Label htmlFor="amp_teleop">Amp Notes</Label>
					<CounterInput required name="amp_teleop" />
				</div>
				<div>
					<Label htmlFor="shuttle_teleop">Shuttle Notes</Label>
					<CounterInput required name="shuttle_teleop" />
				</div>
				<NotesMissed name="notes_missed_teleop" />
			</div>
		</TabsContent>
	);
}

export function getEndgameTab() {
	return (
		<TabsContent value="endgame">
			<h4>Endgame</h4>
			<EndgameContent />
		</TabsContent>
	);
}

export function getMiscTab() {
	return (
		<TabsContent value="misc">
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
						placeholder="Enter you comments here..."
						minLength={32}
						maxLength={256}
					></Textarea>
				</div>
			</div>
		</TabsContent>
	);
}
