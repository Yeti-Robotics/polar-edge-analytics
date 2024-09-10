import {
	ControllerRenderProps,
	useForm,
	useFormContext,
} from "react-hook-form";
import {
	AnyZodObject,
	z,
	ZodBoolean,
	ZodDefault,
	ZodEffects,
	ZodNullable,
	ZodNumber,
	ZodOptional,
	ZodType,
} from "zod";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/lib/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/lib/components/ui/tabs";
import React, { ComponentProps, useEffect, useState } from "react";
import { prettyPrint } from "@/lib/utils";
import { TabsContentForceMount } from "../../stand-form/force-mount-tab";
import { CounterInput } from "../counter-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "../../ui/checkbox";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../ui/form";
import { Button } from "../../ui/button";
import { Info } from "lucide-react";
import { ClickablePopover } from "../../ui/popover/index";
import { Input } from "../../ui/input";

type ZodSchema = AnyZodObject;
type UiSchemaConfig = {
	label?: string;
	description?: string;
	position?: "header";
	Component?: (props: ControllerRenderProps) => JSX.Element;
};

type UiSchema<Schema extends ZodSchema> = {
	[K in keyof Schema["shape"]]: UiSchemaConfig;
};

type FormUiSchema<Schema extends ZodSchema> = Partial<UiSchema<Schema>>;

type AutoFormProps<T extends ZodSchema> = {
	title: string;
	data: T;
	ui: FormUiSchema<T>;
	onSubmit: (data: z.infer<T>) => void;
	groupings: Record<string, Extract<keyof z.infer<T>, string>[]>;
} & ComponentProps<"form">;

const formFieldComponents = [
	{
		type: ZodBoolean,
		render: (props: ControllerRenderProps) => (
			<Checkbox
				className="size-6"
				checked={props.value}
				onCheckedChange={props.onChange}
				{...props}
			/>
		),
	},
	{
		type: ZodNumber,
		render: (props: ControllerRenderProps) => <CounterInput {...props} />,
	},
];

type AutoFormData<T extends ZodSchema> = Pick<
	AutoFormProps<T>,
	"groupings" | "data" | "ui"
>;
type FormContentProps<T extends ZodSchema> = {
	fields: Extract<keyof z.infer<T>, string>[];
} & ComponentProps<"div"> &
	Omit<AutoFormData<T>, "groupings">;

function recurseSchema<T extends ZodType>(
	zodSchema: ZodEffects<T> | ZodDefault<T> | ZodType
) {
	if (zodSchema instanceof ZodEffects) {
		return recurseSchema(zodSchema._def.schema);
	} else if (
		zodSchema instanceof ZodDefault ||
		zodSchema instanceof ZodOptional ||
		zodSchema instanceof ZodNullable
	) {
		return recurseSchema(zodSchema._def.innerType);
	}

	return zodSchema;
}

function FormContent<T extends ZodSchema>({
	data,
	ui,
	fields,
	...props
}: FormContentProps<T>) {
	const { control } = useFormContext();

	return (
		<div className="space-y-4 py-2 md:space-y-6 md:py-4" {...props}>
			{fields.map((name, i) => {
				const FormComponent = ui[name]?.Component
					? ui[name].Component
					: formFieldComponents.find(
							(f) =>
								recurseSchema(data.shape[name]) instanceof
								f.type
						)?.render;

				if (!FormComponent) {
					throw new Error(`Form component for ${name} not found!`);
				}

				const description = ui[name]?.description
					? ui[name].description
					: data.shape[name].description;

				return (
					<FormField
						key={i}
						control={control}
						name={name}
						render={({ field }) => {
							return (
								<FormItem>
									<div className="space-y-0.5">
										<ClickablePopover content={description}>
											<div className="flex items-center space-x-1">
												<FormLabel className="text-nowrap text-base md:text-lg">
													{ui[name]?.label ??
														prettyPrint(name)}
												</FormLabel>
												<Info className="size-3 self-start stroke-primary md:hidden" />
											</div>
										</ClickablePopover>
										<FormDescription className="invisible size-0 md:visible md:size-fit md:text-nowrap">
											{description}
										</FormDescription>
										<FormMessage />
									</div>
									<FormControl>
										<FormComponent {...field} />
									</FormControl>
								</FormItem>
							);
						}}
					/>
				);
			})}
		</div>
	);
}

function TabbedForm<T extends ZodSchema>({
	groupings,
	data,
	ui,
}: AutoFormData<T>) {
	const labels = Object.keys(groupings);
	const [activeTab, setActiveTab] = useState(labels[0]);
	const { formState } = useFormContext();

	useEffect(() => {
		if (formState.errors) {
			for (const label of labels) {
				if (
					Object.keys(formState.errors).some((e) =>
						groupings[label].includes(
							e as Extract<keyof z.infer<T>, string>
						)
					)
				) {
					setActiveTab(label);
					break;
				}
			}
		}
	}, [groupings, labels, formState.errors]);

	return (
		<Tabs value={activeTab} onValueChange={setActiveTab}>
			<div className="flex justify-center">
				<TabsList className="flex w-fit justify-center">
					{labels.map((label) => (
						<TabsTrigger key={label} value={label}>
							{prettyPrint(label)}
						</TabsTrigger>
					))}
				</TabsList>
			</div>
			{labels.map((label) => (
				<TabsContentForceMount
					activeTab={activeTab}
					key={label}
					value={label}
				>
					{
						<FormContent
							fields={groupings[label]}
							data={data}
							ui={ui}
						/>
					}
				</TabsContentForceMount>
			))}
		</Tabs>
	);
}

export function AutoForm<T extends ZodSchema>({
	groupings = {},
	data,
	ui,
	onSubmit,
	...props
}: AutoFormProps<T>) {
	const groups = Object.keys(groupings);
	const headerFields = Object.entries(ui)
		.filter(([, u]) => u?.position === "header")
		.map(([name]) => name) as Extract<keyof z.infer<T>, string>[];
	const form = useForm<T>({
		resolver: zodResolver(data),
		defaultValues: {
			match_number: "",
			team_number: "",
			defense_rating: "",
			auto_line: false,
		},
	});

	return (
		<Form {...form}>
			<form {...props} onSubmit={form.handleSubmit(onSubmit)}>
				<Card>
					<CardHeader>
						<CardTitle className="md:text-3xl">
							{props.title}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="max-w-xs">
							{headerFields.length && (
								<FormContent
									className="grid w-full grid-cols-2 justify-between gap-2 space-x-4 pb-2 md:pb-6"
									fields={headerFields}
									data={data}
									ui={ui}
								/>
							)}
						</div>
						{groups.length ? (
							<TabbedForm
								groupings={groupings}
								data={data}
								ui={ui}
							/>
						) : (
							<FormContent
								fields={
									Object.keys(data) as Extract<
										keyof T,
										string
									>[]
								}
								data={data}
								ui={ui}
							/>
						)}
					</CardContent>
					<CardFooter className="space-x-2">
						<Button
							onClick={() => {}}
							type="submit"
							className="flex w-full"
						>
							Submit
						</Button>
						<Button
							onClick={() => {
								form.reset();
							}}
							type="button"
							className="flex w-full"
						>
							Reset
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}
