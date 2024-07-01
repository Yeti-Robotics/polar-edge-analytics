"use client";

import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { InputHTMLAttributes, useState } from "react";
import errors from "@/lib/errors";

export interface CounterInputProps
	extends InputHTMLAttributes<HTMLInputElement> {
	/** Field name for inner input. */
	name: string;
	/** Value to start counter at, defaults to 0. */
	defaultValue?: number;
	/** Minimum value for the counter, defaults to 0. */
	min?: number;
	/** Maximum value for the counter, defaults to 0. */
	max?: number;
	/** Amount to increase by, defaults to 1. Should rarely need to be adjusted. */
	increaseBy?: number;
	/** Amount to decrease by, defaults to 1. Should rarely need to be adjusted. */
	decreaseBy?: number;
}

/**
 * Customizable +/- counter for forms. Value can be extracted by getting the name in FormData.
 */
export function CounterInput({
	name,
	defaultValue = 0,
	increaseBy = 1,
	decreaseBy = 1,
	max,
	min = 0,
	...props
}: CounterInputProps) {
	if (max && max < min) {
		throw Error(`${errors.ILLEGAL_ARGUMENT} max cannot be less than min.`);
	}

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
			<Button
				type="button"
				name="decrement"
				aria-label={`decrement input by ${decreaseBy}`}
				onClick={handleDecrement}
			>
				<MinusIcon className="size-4" />
				{decreaseBy !== 1 && <span>{decreaseBy}</span>}
			</Button>
			<Input
				id={name}
				name={name}
				aria-label="counter-current-value"
				className="text-center"
				readOnly
				value={value}
				{...props}
			/>
			<Button
				type="button"
				name="increment"
				aria-label={`increment input by ${increaseBy}`}
				onClick={handleIncrement}
			>
				<PlusIcon className="size-4" />
				{increaseBy !== 1 && <span>{increaseBy}</span>}
			</Button>
		</div>
	);
}
