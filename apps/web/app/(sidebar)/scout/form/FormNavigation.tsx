"use client";

import { useStandForm } from "./FormProvider";

import { Button } from "@repo/ui/components/button";

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
	} = useStandForm();

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

			{isLastStep ? (
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Submitting..." : "Submit"}
				</Button>
			) : (
				<Button
					type="button"
					onClick={goToNextStep}
					disabled={!canGoNext}
				>
					Next
				</Button>
			)}
		</div>
	);
}
