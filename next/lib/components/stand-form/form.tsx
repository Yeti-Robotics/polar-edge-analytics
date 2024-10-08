"use client";

import { KeyboardEvent, useEffect } from "react";
import {
	StandFormData,
	standFormSchema,
} from "@/lib/components/stand-form/schema";
import { Input } from "../ui/input";
import { DefaultValues, useFormContext } from "react-hook-form";
import { AutoForm, FormAction } from "../forms/autogenerate";
import { Textarea } from "../ui/textarea";
import { CounterInput } from "../forms/counter-input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { ServerActionResult } from "@/lib/actions/actions-utils";

const trimInput = (e: KeyboardEvent<HTMLInputElement>, maxLength: number) => {
	if (e.code === "Minus") {
		e.preventDefault();
	}

	if (e.currentTarget.value.length >= maxLength) {
		e.currentTarget.value = e.currentTarget.value.slice(0, maxLength - 1);
	}
};

export function StandForm({
	onSubmit,
}: {
	onSubmit: FormAction<typeof standFormSchema>;
}) {
	return (
		<div className="flex justify-center">
			<AutoForm
				title="Stand Form"
				data={standFormSchema}
				ui={{
					team_number: {
						position: "header",
						Component: (props) => (
							<Input
								{...props}
								type="number"
								min={0}
								max={99999}
								onKeyDown={(e) => trimInput(e, 5)}
							/>
						),
					},
					match_number: {
						position: "header",
						Component: (props) => (
							<Input
								{...props}
								type="number"
								min={0}
								max={200}
								onKeyDown={(e) => trimInput(e, 3)}
							/>
						),
					},
					notes: {
						Component: (props) => (
							<Textarea {...props} placeholder="Notes" />
						),
					},
					number_on_chain: {
						Component: (props) => {
							const { watch, setError, clearErrors, setValue } =
								useFormContext();
							const climbed = watch("climb");

							useEffect(() => {
								if (climbed) {
									clearErrors("bots_on_chain");
								} else {
									setValue("bots_on_chain", 0);
								}
							}, [setValue, clearErrors, climbed]);

							return (
								<div
									onClick={() => {
										if (!climbed) {
											setError("bots_on_chain", {
												type: "disabled",
												message:
													"Bot must climb to be on chain",
											});
										}
									}}
								>
									<CounterInput
										{...props}
										disabled={!climbed}
									/>
								</div>
							);
						},
					},
					defense: {
						Component: (props) => {
							return (
								<Select
									value={props.value}
									onValueChange={props.onChange}
									name="defense_rating"
								>
									<SelectTrigger>
										<SelectValue placeholder="Select a defense rating" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="1">
											1 - Little/No Defense
										</SelectItem>
										<SelectItem value="2">2</SelectItem>
										<SelectItem value="3">3</SelectItem>
										<SelectItem value="4">4</SelectItem>
										<SelectItem value="5">
											5 - Lockdown
										</SelectItem>
									</SelectContent>
								</Select>
							);
						},
					},
				}}
				onSubmit={onSubmit}
				groupings={{
					auto: Object.keys(standFormSchema.shape).filter((key) => {
						return key.includes("auto");
					}) as Extract<keyof StandFormData, string>[],
					teleop: Object.keys(standFormSchema.shape).filter((key) => {
						return key.includes("teleop");
					}) as Extract<keyof StandFormData, string>[],
					endgame: ["climb", "park", "number_on_chain"],
					misc: ["defense", "notes"],
				}}
				defaultValues={
					{
						team_number: "",
						match_number: "",
						auto_speaker_notes: 0,
						auto_amp_notes: 0,
						auto_shuttle_notes: 0,
						teleop_amp_notes: 0,
						teleop_shuttle_notes: 0,
						teleop_speaker_notes: 0,
						climb: false,
						park: false,
						number_on_chain: 0,
						defense: "",
						notes: "",
					} as DefaultValues<unknown>
				}
			/>
		</div>
	);
}
