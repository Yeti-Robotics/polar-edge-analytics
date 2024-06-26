"use client";

import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export interface CounterInputProps {
	/** Field name for inner input */
	name: string;
	/** Value to start counter at, defaults to 0 */
	defaultValue?: number;
	/** Minimum value for the counter, defaults to 0 */
	min?: number;
	/** Maximum value for the counter, defaults to 0 */
	max?: number;
	/** Amount to increase by, defaults to 1. Should rarely need to be adjusted. */
	increaseBy?: number;
	/** Amount to decrease by, defaults to 1. Should rarely need to be adjusted. */
	decreaseBy?: number;
}

export function CounterInput({
	name,
	defaultValue = 0,
	increaseBy = 1,
	decreaseBy = 1,
	max,
	min = 0,
}: CounterInputProps) {
	const [value, setValue] = useState(defaultValue);

	const handleIncrement = () => {
		setValue((v) =>
			max !== undefined ? Math.min(max, v + increaseBy) : v + increaseBy
		);
	};
	const handleDecrement = () => {
		setValue((v) =>
			min !== undefined ? Math.max(min, v - decreaseBy) : v - decreaseBy
		);
	};

	return (
		<div className="flex space-x-2">
			<Button type="button" name="decrement" onClick={handleDecrement}>
				<MinusIcon className="size-4" />
			</Button>
			<Input name={name} className="text-center" readOnly value={value} />
			<Button type="button" name="increment" onClick={handleIncrement}>
				<PlusIcon className="size-4" />
			</Button>
		</div>
	);
}
