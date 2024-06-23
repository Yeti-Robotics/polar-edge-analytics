import type { Meta, StoryObj } from "@storybook/react";
import Button from ".";

const metadata = {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default metadata;
type Story = StoryObj<typeof metadata>;

export const Primary: Story = {
  args: {
    appName: "Button",
    children: "I am a primary button.",
  },
};
