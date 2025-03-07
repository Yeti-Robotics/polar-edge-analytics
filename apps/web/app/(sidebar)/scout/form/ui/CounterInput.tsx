"use client";

import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Minus, Plus } from "lucide-react";
import { ComponentProps, useState } from "react";
import { useFormContext } from "react-hook-form";

/**
 * CounterInput component provides a counter input field for form data.
 * It uses the `useFormContext` hook to register the input field with the form.
 *
 * @component
 * @example
 * ```tsx
 * <CounterInput name="counter" />
 * ```
 */
export function CounterInput({
	name,
	min,
	step,
	max,
	defaultValue,
}: {
	name: string;
	min?: number;
	step?: number;
	max?: number;
	defaultValue?: number;
} & ComponentProps<typeof Input>) {
	const { register } = useFormContext();
	const [count, setCount] = useState(defaultValue ?? 0);

	const handleIncrement = () => {
		setCount((curr) => curr + (step ?? 1));
	};

	const handleDecrement = () => {
		setCount((curr) => curr - (step ?? 1));
	};

	return (
		<div className="flex items-center gap-2">
			<Button
				disabled={!!min && count <= min}
				onClick={handleDecrement}
				variant="outline"
				size="icon"
			>
				<Minus />
			</Button>
			<Input value={count} readOnly type="number" {...register(name)} />
			<Button
				disabled={!!max && count >= max}
				onClick={handleIncrement}
				variant="outline"
				size="icon"
			>
				<Plus />
			</Button>
		</div>
	);
}
