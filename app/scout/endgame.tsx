"use client";

import { CounterInput } from "@components/forms/counter-input";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import { useEffect, useState } from "react";

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
				<Label htmlFor="bots_same_chain">Bots Same Chain</Label>
				<CounterInput
					defaultValue={1}
					required
					min={1}
					max={3}
					name="bots_same_chain"
				/>
			</div>
		</div>
	);
}
