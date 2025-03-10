"use client";

import { submitStandForm } from "../actions/submitForm";
import { TeamInMatch } from "../actions/teamsInMatch";
import { StandFormSubmissionErrors } from "../actions/utils";
import { formMetadata, StandFormData, standFormSchema } from "../data/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@repo/ui/components/form";
import { ToastAction } from "@repo/ui/components/toast";
import { useToast } from "@repo/ui/hooks/use-toast";
import { createContext, Dispatch, SetStateAction, startTransition, useContext, useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { deleteLocalSave, getLocalSave, SaveInformation, standFormDefaultValues, updateLocalSave } from "../saves/hooks/save";

type ScoutFormContextType = {
	currentStepIndex: number;
	currentStep: (typeof formMetadata.steps)[number] | undefined;
	goToNextStep: () => void;
	goToPreviousStep: () => void;
	canGoNext: boolean;
	canGoPrevious: boolean;
	isLastStep: boolean;
	isFirstStep: boolean;
	progress: number;
	submitForm: (data: StandFormData) => Promise<void>;
	isSubmitting: boolean;
	formState: {
		errors: FieldErrors<StandFormData>;
		isDirty: boolean;
		isValid: boolean;
	};
	standForm: {
		teams: TeamInMatch[],
		setTeams: Dispatch<SetStateAction<TeamInMatch[]>>
	}
};

const ScoutFormContext = createContext<ScoutFormContextType | null>(null);


/**
 * Provider component for the stand form
 *
 * @component
 * @example
 * ```tsx
 * <StandFormProvider>
 *  <StandForm />
 * </StandFormProvider>
 * ```
 */
export function StandFormProvider({ children }: { children: React.ReactNode }) {
	const { toast } = useToast();
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const form = useForm<StandFormData>({
		resolver: zodResolver(standFormSchema),
		mode: "onBlur",
		defaultValues: standFormDefaultValues,
	});

	const formData = form.watch();

	const [teams, setTeams] = useState<TeamInMatch[]>([]);
	const [matchDetail, setMatchDetail] = useState<SaveInformation>();
	const currentStep = formMetadata.steps[currentStepIndex];

	// Determine if the current step is the first or last step
	const isFirstStep = currentStepIndex === 0;
	const isLastStep = currentStepIndex === formMetadata.steps.length - 1;

	useEffect(() => {
		const matchNumber = formData.match_detail.match_number;
		const teamNumber = formData.match_detail.team_number;

		if (matchNumber && teamNumber && !isFirstStep) {
			const isNewMatch = !matchDetail || matchNumber !== matchDetail.matchNumber || teamNumber !== matchDetail.teamNumber;

			if (isNewMatch) {

				if (matchDetail) {
					deleteLocalSave(matchDetail.matchNumber, matchDetail.teamNumber);
				} else {
					const possibleSave = getLocalSave(matchNumber, teamNumber);

					if (possibleSave.match_detail.match_number === matchNumber && possibleSave.match_detail.team_number === teamNumber) {
						const teamMatchInfo = `Match ${matchNumber} - Team ${teamNumber}`;
						toast({
							title: "Save found",
							description: `Found a save for ${teamMatchInfo}`,
							action: (<ToastAction onClick={() => {
								form.reset(possibleSave)

								startTransition(async () => {
									toast({
										title: "Save loaded",
										description: teamMatchInfo
									})
								})
							}} altText="Load Saved Form">
								Load
							</ToastAction>)
						})
					}
				}

				setMatchDetail({ matchNumber, teamNumber });
			}

			updateLocalSave(matchNumber, teamNumber, formData);
		}
	}, [formData, currentStepIndex])

	// Validate the current step against the schema for the current step
	// This is used to determine if the user can go back or forward
	const validateCurrentStep = () => {
		const currentStepId = currentStep?.id;

		if (!currentStepId) {
			console.warn("No step id found for current step");
			return false;
		}

		const currentSchema = currentStep?.schema;

		if (!currentSchema) {
			console.warn("No schema found for current step");
			return false;
		}

		const currentValues = form.getValues();

		if (currentStepId === "match_detail") {
			const matchDetails = currentValues.match_detail;
			if (
				matchDetails.team_number === ("" as unknown as number) ||
				matchDetails.match_number === ("" as unknown as number)
			) {
				return false;
			}
		}

		try {
			currentSchema.parse(
				currentValues[currentStepId as keyof StandFormData]
			);
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	};

	// Determine if the user can go back or forward
	const canGoPrevious = !isFirstStep;
	const canGoNext = !isLastStep && validateCurrentStep();

	const progress = ((currentStepIndex + 1) / formMetadata.steps.length) * 100;

	const goToNextStep = () => {
		if (canGoNext) {
			setCurrentStepIndex((curr) => curr + 1);
		}
	};

	const goToPreviousStep = () => {
		if (canGoPrevious) {
			setCurrentStepIndex((curr) => curr - 1);
		}
	};

	const onSubmit = async (data: StandFormData) => {
		startTransition(async () => {
			try {
				const formSubmission = await submitStandForm(data);

				if (formSubmission.success) {
					form.reset(); // Wipe the form data
					deleteLocalSave(data.match_detail.match_number, data.match_detail.team_number);
					setTeams([]);
					setMatchDetail(undefined);
					setCurrentStepIndex(0); // Go back to the starting state
					toast({
						title: "Stand form submitted!"
					});
				} else if (formSubmission.error === StandFormSubmissionErrors.TEAM_MATCH) {
					const teamMatches = formSubmission.errorData!;
					form.setError("match_detail.team_number", { message: "Invalid team number, please re-enter" });
					setTeams(teamMatches)
					setCurrentStepIndex(0);
				} else {
					throw new Error(formSubmission.error);
				}
			} catch (error) {
				console.error("Form submission failed:", error);
				toast({
					title: "Stand form submission failed!",
					variant: "destructive"
				});
			}
		});
	};

	const contextValue = {
		currentStepIndex,
		currentStep,
		goToNextStep,
		goToPreviousStep,
		canGoNext,
		canGoPrevious,
		isLastStep,
		isFirstStep,
		progress,
		submitForm: onSubmit,
		isSubmitting: false,
		formState: {
			errors: form.formState.errors,
			isDirty: form.formState.isDirty,
			isValid: form.formState.isValid,
		},
		standForm: {
			teams,
			setTeams
		}
	};

	return (
		<ScoutFormContext.Provider value={contextValue}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
			</Form>
		</ScoutFormContext.Provider>
	);
}

export const useStandForm = () => {
	const context = useContext(ScoutFormContext);

	if (!context) {
		throw new Error("useStandForm must be used within a StandFormProvider");
	}

	return context;
};
