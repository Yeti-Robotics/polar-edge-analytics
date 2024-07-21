import { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { Progress } from ".";

/**
 * Link to original docs: <a href="https://ui.shadcn.com/docs/components/progress" target="_blank">https://ui.shadcn.com/docs/components/progress</a>
 */
const meta = {
	component: Progress,
	title: "Components/shadcn/Progress",
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
	args: {
		value: 50,
	},
	async play({ args, canvasElement, step }) {
		const canvas = within(canvasElement);
		let defaultValue = args.value || 50;
		const progressBar = canvas.getByRole("progressbar");
		const loadProgress = progressBar.childNodes[0] as HTMLDivElement;
		await step("Verify correct render", async () => {
			await expect(progressBar).toBeInTheDocument();
			await expect(loadProgress.style?.transform).toEqual(
				`translateX(-${100 - defaultValue}%)`
			);
		});
	},
};

export const NoValueSpecified: Story = {
	args: {},
	async play({ canvasElement, step }) {
		const canvas = within(canvasElement);
		const progressBar = canvas.getByRole("progressbar");
		const loadProgress = progressBar.childNodes[0] as HTMLDivElement;
		await step("Verify initial render at 0", async () => {
			await expect(progressBar).toBeInTheDocument();
			await expect(loadProgress.style?.transform).toEqual(
				`translateX(-${100}%)`
			);
		});
	},
};
