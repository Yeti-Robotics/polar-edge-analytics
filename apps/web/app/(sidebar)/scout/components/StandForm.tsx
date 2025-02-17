"use client";

import { AutoForm, FormAction } from "./AutoForm";
import { StandFormData, standFormSchema } from "../data/schema";

import { Cage } from "@/lib/database/schema";
import { Input } from "@repo/ui/components/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui/components/select";
import { Textarea } from "@repo/ui/components/textarea";
import { KeyboardEvent } from "react";
import { DefaultValues } from "react-hook-form";

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
					comments: {
						Component: (props) => (
							<Textarea {...props} placeholder="Notes" />
						),
					},
					defense: {
						Component: (props) => {
							return (
								/* eslint-disable react/prop-types */
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
					cage_climb: {
						Component: (props) => {
							return (
								<Select
									value={props.value}
									onValueChange={props.onChange}
									name="cage_climb"
								>
									<SelectTrigger>
										<SelectValue placeholder="Select climb config" />
									</SelectTrigger>
									<SelectContent>
										{Object.values(Cage).map((c, i) => (
											<SelectItem
												key={i}
												value={c}
											>{`${c.charAt(0).toUpperCase()}${c.slice(1)}`}</SelectItem>
										))}
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
					endgame: ["cage_climb"],
					misc: ["defense", "comments"],
				}}
				defaultValues={
					{
						team_number: "",
						match_number: "",
						initiation_line: false,
						auto_coral_level_1: 0,
						auto_coral_level_2: 0,
						auto_coral_level_3: 0,
						auto_coral_level_4: 0,
						auto_algae_processed: 0,
						auto_algae_netted: 0,
						teleop_coral_level_1: 0,
						teleop_coral_level_2: 0,
						teleop_coral_level_3: 0,
						teleop_coral_level_4: 0,
						teleop_algae_processed: 0,
						teleop_algae_netted: 0,
						teleop_algae_thrown: 0,
						cage_climb: "",
						defense: "",
						comments: "",
					} as DefaultValues<unknown>
				}
			/>
		</div>
	);
}
