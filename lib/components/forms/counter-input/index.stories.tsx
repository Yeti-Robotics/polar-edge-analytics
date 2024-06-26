import { type Meta, StoryObj } from "@storybook/react";
import { CounterInput, type CounterInputProps } from ".";
import { Label } from "../../ui/label";

const meta: Meta<typeof CounterInput> = {
	title: "Components/Forms/Counter Input",
	component: CounterInput,
	render: ({ ...args }) => <ExampleCounterInput {...args} />,
};

export default meta;
type Story = StoryObj<typeof CounterInput>;

const ExampleCounterInput = (props: CounterInputProps) => {
	return (
		<form
			className="mx-auto w-full max-w-sm space-y-2"
			onSubmit={(e) => {
				e.preventDefault();
				const formData = new FormData(e.currentTarget);
			}}
		>
			<CounterInput {...props} />
		</form>
	);
};

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
