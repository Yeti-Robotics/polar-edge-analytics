import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from ".";
import { Meta, StoryObj } from "@storybook/react";

type AvatarCustomProps = React.ComponentProps<typeof Avatar> & {
	avatarUrl: string;
	avatarFallbackText?: string;
};

/** Link to original docs https://ui.shadcn.com/docs/components/avatar */
const meta: Meta<AvatarCustomProps> = {
	component: Avatar,
	title: "Components/shadcn/Avatar",
	parameters: {
		avatarFallbackText: { include: /^hello*/ },
	},
	argTypes: {
		avatarUrl: { control: "text" },
		avatarFallbackText: { control: "text" },
	},
	args: {
		avatarFallbackText: "JD",
	},
	render: ({ avatarUrl, avatarFallbackText }) => (
		<Avatar>
			<AvatarImage src={avatarUrl} />
			<AvatarFallback>{avatarFallbackText}</AvatarFallback>
		</Avatar>
	),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Image: Story = {
	args: {
		avatarUrl: "https://avatars.githubusercontent.com/u/11473773?v=4",
	},
};

export const Fallback: Story = {
	args: {
		avatarUrl: "",
	},
};
