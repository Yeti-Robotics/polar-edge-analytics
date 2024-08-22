"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { useContext } from "react";
import { ValidationContext } from "../../stand-form/form";
import { StandFormData } from "../../stand-form/client-validate";

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

const ValidatedLabel = ({
	...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
	if (!props.htmlFor) {
		throw new Error("Missing htmlFor prop for ValidatedLabel");
	}

	const validation = useContext(ValidationContext);
	const isInvalid = Object.keys(validation.formErrors).includes(
		props.htmlFor
	);

	const formErr = validation.formErrors as Record<string, string[]>;
	const errors = formErr[props.htmlFor] as string[] | undefined;

	return (
		<>
			<Label
				className={cn(isInvalid ? "text-red-500" : "", props.className)}
				{...props}
			/>
			<div>
				{isInvalid &&
					errors &&
					errors.map((error, i) => (
						<p key={i} className="mb-2 mt-1 text-xs text-red-500">
							{error}
						</p>
					))}
			</div>
		</>
	);
};

export { Label, ValidatedLabel };
