"use client";

import { CoralInput } from "../ui/CoralInput";
import { CounterInput } from "../ui/CounterInput";

import { CardContent } from "@repo/ui/components/card";
import { Checkbox } from "@repo/ui/components/checkbox";
import { FormField, FormItem, FormLabel } from "@repo/ui/components/form";
import { useFormContext } from "react-hook-form";

export function AutoPeriod() {
	const form = useFormContext();

	return (
		<CardContent>
			<FormField
				control={form.control}
				name="auto.auto_initiation_line"
				render={({ field }) => (
					<FormItem className="flex items-center gap-x-2 mb-2">
						<Checkbox
							className="size-6 mb-0"
							checked={field.value}
							onCheckedChange={field.onChange}
						/>
						<FormLabel className="text-sm flex items-center gap-2">
							Moved off black line?
						</FormLabel>
					</FormItem>
				)}
			/>
			<div className="grid min-[375px]:grid-cols-2 gap-4">
				<CoralInput period="auto" />
				<div>
					<FormField
						control={form.control}
						name="auto.auto_algae_processed"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm">
									Processor
								</FormLabel>
								<CounterInput min={0} {...field} />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="auto.auto_algae_netted"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm">Barge</FormLabel>
								<CounterInput min={0} {...field} />
							</FormItem>
						)}
					/>
				</div>
			</div>
		</CardContent>
	);
}
