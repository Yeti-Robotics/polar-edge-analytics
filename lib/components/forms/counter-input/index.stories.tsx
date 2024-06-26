import { type Meta, StoryObj } from "@storybook/react";
import { CounterInput, type CounterInputProps } from ".";

const meta: Meta<typeof CounterInput> = {
	title: "Components/Forms/Increment Input",
	component: CounterInput,
	render: ({ ...args }) => <ExampleCounterInput {...args} />,
};

export default meta;
type Story = StoryObj<typeof CounterInput>;

const ExampleCounterInput = (props: CounterInputProps) => {
	console.log(props);
	return (
		<form
			className="w-full max-w-sm space-y-2"
			onSubmit={(e) => {
				e.preventDefault();
				const formData = new FormData(e.currentTarget);
			}}
		>
			<CounterInput {...props} />
		</form>
	);
};

export const Default: Story = {
	args: {
		name: "counter",
	},
};

export const NonOneIncrements: Story = {
	args: {
		name: "counter",
		increaseBy: 3,
		decreaseBy: 2,
	},
};

export const MaxMinSet: Story = {
	args: {
		name: "counter",
		max: 5,
		min: -5,
	},
};
