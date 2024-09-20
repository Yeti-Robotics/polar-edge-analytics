import { Meta, StoryObj } from "@storybook/react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from ".";
import { Button } from "../button";
import { expect, userEvent, within, waitFor } from "@storybook/test";

/** Link to original docs https://ui.shadcn.com/docs/components/hover-card */
const meta = {
	component: HoverCard,
	title: "Components/shadcn/HoverCard",
} satisfies Meta<typeof HoverCard>;

export default meta;

type Story = StoryObj<typeof HoverCard>;

export const Usage: Story = {
	args: {
		open: false,
		defaultOpen: false,
		openDelay: 0,
		closeDelay: 0.2,
	},
	render() {
		return (
			<div className="flex w-full justify-center">
				<HoverCard>
					<HoverCardTrigger>Hover Here</HoverCardTrigger>
					<HoverCardContent className="flex justify-center">
						test
					</HoverCardContent>
				</HoverCard>
			</div>
		);
	},
	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
		const hoverCard = canvas.getByText("Hover Here");
		await step("Expect state to be closed at start", async () => {
			await expect(hoverCard.getAttribute("data-state")).toEqual(
				"closed"
			);
		});
		await step("Hover here to open the hover card", async () => {
			await userEvent.hover(hoverCard);
		});
		await step(
			"Expect the text 'test' to appear in the hover card content",
			async () => {
				await waitFor(() => {
					expect(canvas.getByText("test")).toBeInTheDocument();
				});
				const hoverCardContent = canvas.getByText("test");
				await expect(hoverCardContent).toBeInTheDocument();
			}
		);
		await step("Expect state to be open while hovering", async () => {
			await expect(hoverCard.getAttribute("data-state")).toEqual("open");
		});
		await step("Stop hovering over the card to get rid of it", async () => {
			await userEvent.unhover(hoverCard);
			await waitFor(() => {
				expect(canvas.queryByText("test")).not.toBeInTheDocument();
			});
		});
		await step("Expect state to be closed after unhovering", async () => {
			await expect(hoverCard.getAttribute("data-state")).toEqual(
				"closed"
			);
		});
	},
};
