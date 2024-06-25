import { Meta, StoryObj } from "@storybook/react";

import { Snowverlay } from "@/lib/components/decorative/snowverlay";

const meta = {
	component: Snowverlay,
	title: "Components/Decorative/Snowverlay",
	parameters: {
		backgrounds: {
			default: "yeti-blue",
			values: [{ name: "yeti-blue", value: "#54B6E5" }],
		},
	},
} satisfies Meta<typeof Snowverlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
	args: {
		numSnowflakes: 75,
		blurFrequency: 0.7,
	},
	parameters: {},
};
