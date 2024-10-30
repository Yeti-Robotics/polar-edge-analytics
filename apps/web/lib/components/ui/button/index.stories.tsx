import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@components/ui/button";

const meta = {
	component: Button,
	title: "Components/shadcn/Button",
	argTypes: {
		variant: {
			options: [
				"default",
				"secondary",
				"destructive",
				"outline",
				"ghost",
				"link",
			],
		},
	},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
	args: {
		children: "This is a Button",
		variant: "default",
	},
	argTypes: {
		disabled: { control: "boolean" },
		variant: { control: "select" },
	},
};
