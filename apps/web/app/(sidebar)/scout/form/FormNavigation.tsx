"use client";

import { useFormContext } from "react-hook-form";
import { useStandForm } from "./FormProvider";

import { Button } from "@repo/ui/components/button";
import { StandFormData } from "../data/schema";

/**
 * Navigation component for the stand form
 *
 * @component
 * @example
 * ```tsx
 * <FormNavigation />
 * ```
 */
export function FormNavigation() {
	const {
		goToNextStep,
		goToPreviousStep,
		canGoNext,
		canGoPrevious,
		isLastStep,
		isSubmitting,
		submitForm,
	} = useStandForm();
	const form = useFormContext<StandFormData>();

	return (
		<div className="flex justify-between p-4 border-t">
			<Button
				type="button"
				variant="outline"
				onClick={goToPreviousStep}
				disabled={!canGoPrevious}
			>
				Previous
			</Button>
			<Button
				type="button"
				onClick={isLastStep ? form.handleSubmit(submitForm) : goToNextStep}
				disabled={isLastStep ? isSubmitting : !canGoNext}
			>
				{isLastStep ? isSubmitting ? "Submitting..." : "Submit" : "Next"}
			</Button>
		</div>
	);
}
