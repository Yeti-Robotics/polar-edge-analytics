import { Meta, StoryObj } from "@storybook/react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from ".";
import { Button } from "../button";
import { expect, userEvent, waitFor, within } from "@storybook/test";

const meta = {
	component: Drawer,
	title: "Components/shadcn/Drawer",
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
	render: () => (
		<Drawer>
			<DrawerTrigger asChild>
				<Button name="Open" variant="outline">
					Open
				</Button>
			</DrawerTrigger>
			<DrawerContent style={{ fontFamily: "Libre Franklin" }}>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader>
						<DrawerTitle>Are you absolutely sure?</DrawerTitle>
						<DrawerDescription>
							This action cannot be undone.
						</DrawerDescription>
					</DrawerHeader>
					<DrawerFooter>
						<Button>Submit</Button>
						<DrawerClose asChild>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const parent = within(canvasElement.parentElement!);
		const button = canvas.getByRole("button", { name: "Open" });
		await step("Open the drawer", async () => {
			await userEvent.click(button);
			await expect(parent.getByRole("dialog")).toBeInTheDocument();
		});
		await step("Close the drawer with the button", async () => {
			const closeButton = parent.getByRole("button", { name: "Cancel" });
			await userEvent.click(closeButton);
			await waitFor(() =>
				expect(parent.queryByRole("dialog")).not.toBeInTheDocument()
			);
		});
		await step("Open the drawer again", async () => {
			await userEvent.click(button);
			await expect(parent.getByRole("dialog")).toBeInTheDocument();
		});
		await step("Close the drawer by clicking outside", async () => {
			const overlay = parent.getByRole("dialog").previousElementSibling;
			if (!overlay) throw new Error("Overlay not found");
			await userEvent.click(overlay);
			await waitFor(() =>
				expect(parent.queryByRole("dialog")).not.toBeInTheDocument()
			);
		});
	},
};
