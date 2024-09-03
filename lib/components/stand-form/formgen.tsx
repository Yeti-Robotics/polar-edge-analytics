import { FormProvider, useForm } from "react-hook-form";
import { AnyZodObject, z, ZodType } from "zod";
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

type ZodSchema = AnyZodObject;
type UiSchemaConfig = {
	label?: string;
	description?: string;
	render: () => JSX.Element;
};

type UiSchema<Schema extends ZodSchema, RootSchema extends object> = {
	[K in keyof Schema["shape"]]: UiSchemaConfig;
};

type FormUiSchema<Schema extends ZodSchema> = Partial<
	UiSchema<Schema, z.infer<Schema>>
>;

type AutoFormProps = {
	title: string;
	dataSchema: ZodSchema;
	uiSchema: FormUiSchema<ZodSchema>;
	onSubmit: (data: z.infer<ZodSchema>) => void;
	groupings: Record<string, (keyof ZodSchema)[]> & {
		header?: (keyof ZodSchema)[];
	};
};

type FormContentProps = Pick<AutoFormProps, "dataSchema" | "uiSchema"> & {
	fields: string[];
} & ComponentProps<"div">;

type FormFieldProps = {
	type: string;
	name: string;
	render?: () => JSX.Element;
};

const formFieldComponents: Record<
	string,
	<T extends ZodType>(name: string, type: ZodType<T>) => JSX.Element
> = {
	boolean: (name, type) => {
		return <Checkbox name={name} className="mr-2 size-6" />;
	},
	number: (name) => {
		return <CounterInput name={name} />;
	},
};

function FormField(props: FormFieldProps) {
	return <div>{formFieldComponents[props.type](props.name)}</div>;
}

function FormContent(props: FormContentProps) {
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

function TabbedForm(
	props: Pick<AutoFormProps, "dataSchema" | "uiSchema" | "groupings">
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

function AutoForm({ groupings = {}, ...props }: AutoFormProps) {
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
