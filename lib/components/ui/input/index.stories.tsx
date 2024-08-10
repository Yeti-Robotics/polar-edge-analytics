import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { expect, userEvent, within, waitFor } from "@storybook/test";

/** Link to original docs https://ui.shadcn.com/docs/components/input */
const meta = {
	component: Input,
	title: "Components/shadcn/Input",
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
	render() {
		return (
			<div className="flex w-full justify-center">
				<Input type="email" placeholder="Email" />
			</div>
		);
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText("Email");
		await step("Click on input", async () => {
			await userEvent.click(input);
		});
		await step("Type in the input", async () => {
			await userEvent.type(input, "example@email.com");
		});
	},
};

export const File: Story = {
	render() {
		return (
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="picture">Picture</Label>
				<Input id="picture" type="file" />
			</div>
		);
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText("Picture");
		await step("Click on input", async () => {
			await userEvent.click(input);
		});
	},
};

export const Disabled: Story = {
	render() {
		return <Input disabled type="email" placeholder="Email" />;
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText("Email");
		await step("Click on input", async () => {
			await userEvent.click(input);
		});
		await expect("disabled").toEqual("disabled");
	},
};

export const WithLabel: Story = {
	render() {
		return (
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="email">Email</Label>
				<Input type="email" id="email" placeholder="Email" />
			</div>
		);
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText("Email");
		await step("Click on input", async () => {
			await userEvent.click(input);
		});
		await step("Type in the input", async () => {
			await userEvent.type(input, "example@email.com");
		});
	},
};

export const WithButton: Story = {
	render() {
		return (
			<div className="flex w-full max-w-sm items-center space-x-2">
				<Input type="email" placeholder="Email" />
				<Button type="submit">Subscribe</Button>
			</div>
		);
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText("Email");
		const button = canvas.getByText("Subscribe");
		await step("Click on input", async () => {
			await userEvent.click(input);
		});
		await step("Type in the input", async () => {
			await userEvent.type(input, "example@email.com");
		});
		await step("Click on button", async () => {
			await userEvent.click(button);
		});
	},
};
