"use client";

import errors from "@/lib/errors";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { MinusIcon, PlusIcon } from "lucide-react";
import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { useController } from "react-hook-form";

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
const CounterInput = React.forwardRef<HTMLInputElement, CounterInputProps>(
	(
		{
			name,
			defaultValue = 0,
			increaseBy = 1,
			decreaseBy = 1,
			max = 99,
			min = 0,
			...props
		}: CounterInputProps,
		ref
	) => {
		if (max && max < min) {
			throw Error(
				`${errors.ILLEGAL_ARGUMENT} max cannot be less than min.`
			);
		}

		const { field } = useController({ name, defaultValue });
		const [value, setValue] = useState(defaultValue);

		const handleCount = (increase: boolean) => {
			const newValue = increase
					? Math.min(max, value + increaseBy)
					: Math.max(min, value - decreaseBy);

			field.onChange(newValue);
			setValue(newValue);
		};

		useEffect(() => {
			if (field.value !== value) {
				setValue(field.value);
			}
		}, [field.value, value]);

		return (
			<div className="flex space-x-2">
				<Button
					type="button"
					name="decrement"
					aria-label={`decrement input by ${decreaseBy}`}
					onClick={() => handleCount(false)}
					disabled={props.disabled}
					aria-disabled={props.disabled}
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
					{...props}
					ref={ref}
					value={value}
				/>
				<Button
					type="button"
					name="increment"
					aria-label={`increment input by ${increaseBy}`}
					onClick={() => handleCount(true)}
					disabled={props.disabled}
					aria-disabled={props.disabled}
				>
					<PlusIcon className="size-4" />
					{increaseBy !== 1 && <span>{increaseBy}</span>}
				</Button>
			</div>
		);
	}
);

CounterInput.displayName = "CounterInput";

export { CounterInput };
