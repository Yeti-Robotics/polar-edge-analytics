import { Meta, StoryObj } from "@storybook/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from ".";
import React from "react";
import { Button } from "../button";
import { Label } from "recharts";
import { Input } from "../input";

type CardCustomProps = React.ComponentProps<typeof Card> & {
	title: string;
	description: string;
	content: React.ReactNode;
	footer: React.ReactNode;
};

/** Link to original docs https://ui.shadcn.com/docs/components/card */
const meta = {
	component: Card,
	title: "Components/shadcn/Card",
	parameters: {
		docs: {
			description: {
				component: "Card component",
			},
		},
	},
	argTypes: {
		title: {
			control: "text",
		},
		description: {
			control: "text",
		},
		content: {
			control: "text",
		},
		footer: {
			control: "text",
		},
	},
	args: {
		title: "Card Title",
		description: "Card Description",
		content: "Card Content",
		footer: "Card Footer",
	},
	render: (args: CardCustomProps) => {
		return (
			<Card>
				<CardHeader>
					<CardTitle>{args.title}</CardTitle>
					<CardDescription>{args.description}</CardDescription>
				</CardHeader>
				<CardContent>{args.content}</CardContent>
				<CardFooter>{args.footer}</CardFooter>
			</Card>
		);
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Usage: Story = {};
export const WithEnrichedContent: Story = {
	args: {
		content: "Email",
		footer: "Submit",
	},
	render: (args) => {
		return (
			<Card>
				<CardHeader>
					<CardTitle>{args.title}</CardTitle>
					<CardDescription>{args.description}</CardDescription>
				</CardHeader>
				<CardContent>
					<Label>{args.content}</Label>
					<Input type="email" placeholder="Email" />
				</CardContent>
				<CardFooter>
					<Button>Button: {args.footer}</Button>
				</CardFooter>
			</Card>
		);
	},
};
