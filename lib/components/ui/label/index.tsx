"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { useContext } from "react";
import { ValidationContext } from "../../stand-form/validate";

const labelVariants = cva(
	"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
		VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
	<LabelPrimitive.Root
		ref={ref}
		className={cn(labelVariants(), className)}
		{...props}
	/>
));
Label.displayName = LabelPrimitive.Root.displayName;

const ValidatedLabel = ({ ...props }) => {
	const validation = useContext(ValidationContext);
	const isInvalid = Object.keys(validation.errors).includes(props.htmlFor);

	return (
		<>
			<Label
				className={cn(isInvalid ? "text-red-500" : "", props.className)}
				{...props}
			/>
			<div>
				{isInvalid &&
					validation.errors[props.htmlFor].map((error, i) => (
						<p key={i} className="mb-2 mt-1 text-xs text-red-500">
							{error}
						</p>
					))}
			</div>
		</>
	);
};

export { Label, ValidatedLabel };
