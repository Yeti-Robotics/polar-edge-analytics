import type { Meta, StoryObj } from "@storybook/react";

import { Button, buttonVariants } from ".";
import { ChevronRight } from "lucide-react";

/** Link to original docs https://ui.shadcn.com/docs/components/button 	*/
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
			control: "select",
		},
		disabled: {
			control: "boolean",
		},
		size: {
			control: "select",
			options: ["default", "sm", "lg", "icon"],
		},
		asChild: {
			control: "boolean",
		},
	},
	args: {
		children: "This is a Button",
	},
	render: (args) => {
		if (args.size === "icon") {
			return (
				<Button {...args}>
					<ChevronRight className="size-4" />
				</Button>
			);
		}

		return <Button {...args} />;
	},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Usage: Story = {};
