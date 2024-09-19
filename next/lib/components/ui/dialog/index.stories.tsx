import { Meta, StoryObj } from "@storybook/react";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from ".";
import { Button } from "@components/ui/button";
import { expect, userEvent, waitFor, within } from "@storybook/test";

export default {
	title: "Components/shadcn/Dialog",
	component: Dialog,
} as Meta<typeof Dialog>;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
	render() {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="destructive">Delete Form</Button>
				</DialogTrigger>
				<DialogContent style={{ fontFamily: "Libre Franklin" }}>
					<DialogHeader>
						<DialogTitle>Are you sure?</DialogTitle>
						<DialogDescription>
							This action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="flex justify-start sm:justify-start">
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button variant="destructive">Delete</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	},
	async play({ canvasElement, step }) {
		const canvas = within(canvasElement);
		let body = within(canvasElement.parentElement!);
		const button = await canvas.findByText("Delete Form");
		await step("Click button and verify the dialog is open", async () => {
			await userEvent.click(button);
			await body.findByText("Are you sure?");
			await body.findByText("This action cannot be undone.");
			await body.findByText("Cancel");
		});
		await step(
			"Click on the delete button and verify the dialog is closed",
			async () => {
				const deleteButton = await body.findByText("Delete");
				await userEvent.click(deleteButton);
				await waitFor(() =>
					expect(body.queryByRole("dialog")).toBeNull()
				);
			}
		);
	},
};
