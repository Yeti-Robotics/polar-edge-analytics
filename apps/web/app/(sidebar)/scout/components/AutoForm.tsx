import { CounterInput } from "./CounterInput";
import { TabsContentForceMount } from "./ForceMountTab";
import { deleteLocalSave, getLocalSave, setLocalSave } from "./localStorage";
import { prettyPrint } from "./utils";

import { ServerActionResult } from "@/lib/actions/actions-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import { Checkbox } from "@repo/ui/components/checkbox";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@repo/ui/components/form";
import { ClickablePopover } from "@repo/ui/components/popover";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/tabs";
import { ToastAction } from "@repo/ui/components/toast";
import { useToast } from "@repo/ui/hooks/use-toast";
import { Info } from "lucide-react";
import React, { ComponentProps, useEffect, useState } from "react";
import {
	ControllerRenderProps,
	DefaultValues,
	Path,
	useForm,
	useFormContext,
	useFormState,
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

export type ZodSchema = AnyZodObject;

type UiSchemaConfig = {
	label?: string;
	description?: string;
	position?: "header";
	Component?: (props: ControllerRenderProps) => JSX.Element;
};

type FormUiSchema<Schema extends ZodSchema> = Partial<{
	[K in keyof Schema["shape"]]: UiSchemaConfig;
}>;

export type FormAction<T extends ZodSchema> = (
	data: z.infer<T>
) => Promise<ServerActionResult<unknown>>;

type AutoFormProps<T extends ZodSchema> = {
	title: string;
	data: T;
	ui: FormUiSchema<T>;
	onSubmit: FormAction<T>;
	groupings: Record<string, Extract<keyof z.infer<T>, string>[]>;
	defaultValues: DefaultValues<z.infer<T>>;
};

type AutoFormData<T extends ZodSchema> = Pick<
	AutoFormProps<T>,
	"groupings" | "data" | "ui"
>;
type FormContentProps<T extends ZodSchema> = {
	fields: Extract<keyof z.infer<T>, string>[];
} & ComponentProps<"div"> &
	Omit<AutoFormData<T>, "groupings">;

const formFieldComponents = [
	{
		type: ZodBoolean,
		render: (props: ControllerRenderProps) => {
			return (
				<Checkbox
					className="size-6"
					checked={props.value}
					onCheckedChange={props.onChange}
					{...props}
				/>
			);
		},
	},
	{
		type: ZodNumber,
		render: (props: ControllerRenderProps) => <CounterInput {...props} />,
	},
];

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
											<div className="flex items-center gap-x-2">
												<FormLabel className="text-nowrap text-sm">
													{ui[name]?.label ??
														prettyPrint(name)}
												</FormLabel>
												<Info className="size-3 self-start stroke-primary" />
											</div>
										</ClickablePopover>
										<FormDescription className="sr-only">
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
	const formState = useFormState();

	/* eslint-disable react-hooks/exhaustive-deps */
	useEffect(() => {
		if (formState.errors) {
			for (const label of labels) {
				const labelGroupings = groupings[label] ?? [];

				if (
					Object.keys(formState.errors).some((e) =>
						labelGroupings.includes(
							e as Extract<keyof z.infer<T>, string>
						)
					)
				) {
					setActiveTab(label);
					break;
				}
			}
		}

		if (formState.isSubmitted && formState.isSubmitSuccessful) {
			setActiveTab(labels[0]);
		}
	}, [formState.errors, formState.isSubmitted, formState.isSubmitSuccessful]);

	return (
		<Tabs value={activeTab} onValueChange={setActiveTab}>
			<div className="flex justify-center">
				<TabsList className="grid grid-cols-4">
					{labels.map((label) => (
						<TabsTrigger
							onClick={() => setActiveTab(label)}
							key={label}
							value={label}
						>
							{prettyPrint(label)}
						</TabsTrigger>
					))}
				</TabsList>
			</div>
			{labels.map((label) => (
				<TabsContentForceMount
					activeTab={activeTab ?? ""}
					key={label}
					value={label}
				>
					{
						<FormContent
							fields={groupings[label] ?? []}
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
	defaultValues,
	...props
}: AutoFormProps<T>) {
	const groups = Object.keys(groupings);
	const [showMainForm, setShowMainForm] = useState(false);

	const headerFields = Object.entries(ui)
		.filter(([, u]) => u?.position === "header")
		.map(([name]) => name) as Extract<keyof z.infer<T>, string>[];

	const form = useForm<z.infer<T>>({
		resolver: zodResolver(data),
		defaultValues,
	});

	const { toast } = useToast();

	useEffect(() => {
		const existingLocalSave = getLocalSave(props.title);

		if (existingLocalSave) {
			const loadSave = (saveData: z.infer<T>) => {
				form.reset(saveData);
				handleContinue();

				setTimeout(() => {
					toast({
						title: "Local save loaded.",
					});
				});
			};

			setTimeout(() => {
				toast({
					title: "Saved form",
					description: "Load local save?",
					action: (
						<ToastAction
							onClick={() => loadSave(existingLocalSave)}
							altText="Load local save"
						>
							Load
						</ToastAction>
					),
				});
			});
		}

		const { unsubscribe } = form.watch((watched) => {
			setLocalSave(props.title, watched);
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const formMsg = form.formState.errors.root?.serverError
			? `Error: ${form.formState.errors.root?.serverError.message}`
			: form.formState.isSubmitSuccessful &&
				  !form.formState.isSubmitting &&
				  !form.formState.isDirty
				? `Successfully submitted!`
				: "";

		if (formMsg?.length) {
			toast({
				title: formMsg,
				variant:
					form.formState.errors.root?.serverError && "destructive",
			});
		}
	}, [
		form.formState.errors.root?.serverError,
		form.formState.isSubmitSuccessful,
	]);

	const submitHandler = async (formData: z.infer<T>) => {
		try {
			const result = await onSubmit(formData);

			if (result.success) {
				form.reset(defaultValues);
				deleteLocalSave(props.title);
				setShowMainForm(false);
			} else {
				if (
					result.error.toLowerCase().startsWith("invalid input") &&
					result.details
				) {
					const formErrors = result.details as Record<
						Extract<keyof z.infer<T>, string>,
						string[]
					>;

					for (const [name, errors] of Object.entries(formErrors)) {
						form.setError(name as Path<z.infer<T>>, {
							type: "validate",
							message: errors.join("\n"),
						});
					}
				} else {
					form.setError("root.serverError", {
						message: result.error,
					});
				}
			}
		} catch {
			form.setError("root.serverError", {
				message: "Server Error",
			});
		}
	};

	const handleContinue = () => {
		const headerValues = headerFields.reduce(
			(acc, field) => ({
				...acc,
				[field]: form.getValues(field as unknown as Path<z.infer<T>>),
			}),
			{}
		);

		const headerSchema = z.object(
			headerFields.reduce(
				(acc, field) => ({
					...acc,
					[field]: data.shape[field],
				}),
				{}
			)
		);

		const result = headerSchema.safeParse(headerValues);

		if (result.success) {
			setShowMainForm(true);
		} else {
			result.error.errors.forEach((error) => {
				form.setError(error.path[0] as unknown as Path<z.infer<T>>, {
					type: "validate",
					message: error.message,
				});
			});
		}
	};

	const handleBack = () => {
		setShowMainForm(false);
	};

	return (
		<Form {...form}>
			<form {...props} onSubmit={form.handleSubmit(submitHandler)}>
				<Card className=" min-w-xs">
					<CardHeader className="flex flex-row items-center justify-between pb-0">
						<CardTitle className="text-lg">{props.title}</CardTitle>
					</CardHeader>
					<CardContent>
						{!showMainForm ? (
							<div className="flex flex-col items-center space-y-6">
								<div className="w-full max-w-sm space-y-4">
									<FormContent
										fields={headerFields}
										data={data}
										ui={ui}
									/>
									<Button
										type="button"
										className="w-full py-1"
										onClick={handleContinue}
									>
										Continue
									</Button>
								</div>
							</div>
						) : (
							<>
								<div className="flex w-full items-center gap-x-2 pb-2">
									<div className="text-sm font-medium text-muted-foreground">
										Team{" "}
										{form.getValues(
											headerFields[0] as unknown as Path<
												z.infer<T>
											>
										)}{" "}
										/ Match{" "}
										{form.getValues(
											headerFields[1] as unknown as Path<
												z.infer<T>
											>
										)}
									</div>
									<Button
										type="button"
										variant="ghost"
										onClick={handleBack}
										className="text-muted-foreground hover:text-primary"
									>
										Edit
									</Button>
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
							</>
						)}
					</CardContent>
					{showMainForm && (
						<CardFooter className="flex flex-col space-y-4">
							<Button type="submit" className="flex w-full">
								Submit
							</Button>
						</CardFooter>
					)}
				</Card>
			</form>
		</Form>
	);
}
