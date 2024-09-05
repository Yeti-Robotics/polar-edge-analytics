import { FormProvider, useForm } from "react-hook-form";
import {
	AnyZodObject,
	z,
	ZodBoolean,
	ZodBooleanDef,
	ZodNumber,
	ZodString,
	ZodType,
	ZodTypeDef,
} from "zod";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/lib/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/lib/components/ui/tabs";
import React, { ComponentProps, useState } from "react";
import { prettyPrint } from "@/lib/utils";
import { TabsContentForceMount } from "./force-mount-tab";
import { Checkbox } from "@radix-ui/react-checkbox";
import { CounterInput } from "../forms/counter-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";

type ZodSchema = AnyZodObject;
type UiSchemaConfig = {
	label?: string;
	description?: string;
	render?: () => JSX.Element;
};

type UiSchema<Schema extends ZodSchema> = {
	[K in keyof Schema["shape"]]: UiSchemaConfig;
};

type FormUiSchema<Schema extends ZodSchema> = Partial<UiSchema<Schema>>;

type AutoFormProps<T extends ZodSchema> = {
	title: string;
	dataSchema: T;
	uiSchema: FormUiSchema<T>;
	onSubmit: (data: z.infer<T>) => void;
	groupings: Record<string, Extract<keyof T, string>[]>;
};

type FormContentProps<T extends ZodSchema> = Pick<
	AutoFormProps<T>,
	"dataSchema" | "uiSchema"
> & {
	fields: string[];
} & ComponentProps<"div">;

type FormFieldProps = {
	type: string;
	name: string;
	render?: () => JSX.Element;
};

function FormField(props: FormFieldProps) {
	return <div>{formFieldComponents[props.type](props.name)}</div>;
}

function FormContent<T extends ZodSchema>(props: FormContentProps<T>) {
	return (
		<div {...props}>
			{props.fields.map((field) => (
				<>
					<FormField type="boolean" name={field} />
				</>
			))}
		</div>
	);
}

function TabbedForm<T extends ZodSchema>(
	props: Pick<AutoFormProps<T>, "dataSchema" | "uiSchema" | "groupings">
) {
	const labels = Object.keys(props.groupings);
	const [activeTab, setActiveTab] = useState(labels[0]);

	return (
		<Tabs
			value={activeTab}
			onValueChange={setActiveTab}
			className="max-w-min"
		>
			<TabsList>
				{labels.map((label) => (
					<TabsTrigger key={label} value={label}>
						{prettyPrint(label)}
					</TabsTrigger>
				))}
			</TabsList>
			{labels.map((label) => (
				<TabsContentForceMount
					activeTab={activeTab}
					key={label}
					value={label}
				>
					{<FormContent fields={props.groupings[label]} {...props} />}
				</TabsContentForceMount>
			))}
		</Tabs>
	);
}

export function AutoForm<T extends ZodSchema>({
	groupings = {},
	...props
}: AutoFormProps<T>) {
	const groups = Object.keys(groupings);
	const form = useForm({
		resolver: zodResolver(props.dataSchema),
	});

	return (
		<FormProvider {...form}>
			<Card>
				<CardHeader>
					<CardTitle>{props.title}</CardTitle>
				</CardHeader>
				<CardContent>
					{groups.length ? (
						<TabbedForm groupings={groupings} {...props} />
					) : (
						<FormContent
							{...props}
							fields={Object.keys(props.dataSchema)}
						/>
					)}
				</CardContent>
			</Card>
		</FormProvider>
	);
}
