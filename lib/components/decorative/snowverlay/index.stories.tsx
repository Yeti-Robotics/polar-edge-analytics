import { Meta, StoryObj } from "@storybook/react";

import { Snowverlay } from "@/lib/components/decorative/snowverlay";

const meta = {
	component: Snowverlay,
	title: "Components/Decorative/Snowverlay",
	parameters: {
		backgrounds: {
			default: "sunset",
			values: [
				{ name: "yeti-blue", value: "#54B6E5" },
				{
					name: "sunset",
					value: "linear-gradient(to bottom right, #54B6E5 20%, rgba(217, 70, 239, 0.6), #fb923c 100%)",
				},
			],
		},
	},
	argTypes: {
		numSnowflakes: {
			control: { type: "range", min: 0, max: 125, step: 5 },
		},
		blurFrequency: {
			control: { type: "range", min: 0, max: 1, step: 0.1 },
		},
	},
	decorators: [
		(Story) => (
			<div style={{ height: "100vh" }}>
				<Story />
			</div>
		),
	],
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
