import { type Meta, StoryObj } from "@storybook/react";
import { within, expect, userEvent } from "@storybook/test";
import { CounterInput, type CounterInputProps } from ".";

const meta: Meta<typeof CounterInput> = {
	title: "Components/Forms/Counter Input",
	component: CounterInput,
};

export default meta;
type Story = StoryObj<typeof CounterInput>;

/** Counter Input with default arguments provided. */
export const Default: Story = {
	args: {
		name: "counter",
	},
};

/** Increments are set to 3 to increase, and 2 to decrease. */
export const DifferentIncrements: Story = {
	args: {
		name: "counter",
		increaseBy: 3,
		decreaseBy: 2,
		defaultValue: 0,
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const defaultValue = args.defaultValue ? args.defaultValue : 0;
		const [decrement, increment] = canvas.getAllByRole("button");
		await userEvent.click(increment);
		await userEvent.click(increment);
		await userEvent.click(decrement);
		await userEvent.click(decrement);
		await expect(canvas.getByRole("textbox")).toHaveValue(
			`${
				defaultValue +
				2 * (args.increaseBy || 1) -
				2 * (args.decreaseBy || 1)
			}`
		);
	},
};

/** Max/min are set to 5/-5, and won't allow the user to exceed these bounds. */
export const MaxMinSet: Story = {
	args: {
		name: "counter",
		max: 5,
		min: -5,
	},
};
