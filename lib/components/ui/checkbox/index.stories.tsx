import { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from ".";
import { expect, userEvent, within } from "@storybook/test";
import { Button } from "../button";

const meta = {
	component: Checkbox,
	title: "Components/shadcn/Checkbox",
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Usage: Story = {
	args: {
		defaultChecked: false,
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const checkbox = canvas.getByRole("checkbox");
		await userEvent.click(checkbox);
		await expect(checkbox.getAttribute("data-state")).toEqual(
			args.defaultChecked ? "unchecked" : "checked"
		);
		await userEvent.click(checkbox);
		await expect(checkbox.getAttribute("data-state")).toEqual(
			args.defaultChecked ? "checked" : "unchecked"
		);
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const checkbox = canvas.getByRole("checkbox");
		await userEvent.click(checkbox);
		await expect(checkbox.getAttribute("data-state")).toEqual(
			args.disabled ? "unchecked" : "checked"
		);
	},
};
