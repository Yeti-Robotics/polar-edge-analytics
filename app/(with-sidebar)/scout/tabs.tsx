import { CounterInput } from "@/lib/components/forms/counter-input";
import { TabsContent } from "@/lib/components/ui/tabs";
import { Label } from "@/lib/components/ui/label";
import { Checkbox } from "@/lib/components/ui/checkbox";
import { Textarea } from "@/lib/components/ui/textarea";
import {
	Select,
	SelectValue,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/lib/components/ui/select";
import { EndgameContent } from "./endgame";
// import { EndgameContent } from "./endgame";

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
					<Label htmlFor="speaker_auto">Speaker Auto</Label>
					<CounterInput required name="speaker_auto" />
				</div>
				<div>
					<Label htmlFor="amp_auto">Amp Auto</Label>
					<CounterInput required name="amp_auto" />
				</div>
				<div>
					<Label htmlFor="shuttle_auto">Shuttle Teleop</Label>
					<CounterInput required name="shuttle_auto" />
				</div>
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
					<Label htmlFor="speaker_teleop">Speaker Teleop</Label>
					<CounterInput required name="speaker_teleop" />
				</div>
				<div>
					<Label htmlFor="amp_teleop">Amp Teleop</Label>
					<CounterInput required name="amp_teleop" />
				</div>
				<div>
					<Label htmlFor="shuttle_teleop">Shuttle Teleop</Label>
					<CounterInput required name="shuttle_teleop" />
				</div>
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
					<Select required name="defense_rating">
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
					<Label htmlFor="comments">Comments</Label>
					<Textarea
						name="comments"
						placeholder="Enter you comments here..."
						required
						minLength={32}
						maxLength={256}
					></Textarea>
				</div>
			</div>
		</TabsContent>
	);
}
