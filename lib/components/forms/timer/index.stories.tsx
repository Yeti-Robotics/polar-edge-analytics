import { Meta, StoryObj } from "@storybook/react";
import { Timer } from ".";
import { Button } from "../../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../ui/card";
import { expect, userEvent, within } from "@storybook/test";

const meta = {
	component: Timer,
	title: "Components/forms/Timer",
} as Meta<typeof Timer>;

export default meta;

type Story = StoryObj<typeof Timer>;

export const Default: Story = {
	async play({ canvasElement, step }) {
		await step(
			"Verify timer is starting at 0, and click the start button to begin the timer.",
			async () => {
				await expect(
					canvasElement.querySelector("input[type='hidden']")
				).toHaveValue("0");
				const startButton = canvasElement.querySelector(
					"button[aria-label='Start timer']"
				);
				if (!startButton) {
					throw new Error("Start button missing correct aria-label.");
				}
				await userEvent.click(startButton);
			}
		);
		await step("Wait for a couple seconds.", async () => {
			await new Promise((resolve) => setTimeout(resolve, 2000));
		});
		await step("Click the pause button to stop the timer.", async () => {
			const pauseButton = canvasElement.querySelector(
				"button[aria-label='Pause timer']"
			);
			if (!pauseButton) {
				throw new Error("Pause button missing correct aria-label.");
			}
			await userEvent.click(pauseButton);
			const timerDisplay =
				await within(canvasElement).findByRole("timer");
			await expect(timerDisplay).toHaveTextContent(/00:02/);
		});
	},
};

export const InForm: Story = {
	render: () => (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const data = new FormData(e.currentTarget);
				const timer = data.get("timer");
				alert(timer);
			}}
		>
			<Card>
				<CardHeader>
					<CardTitle>Timer</CardTitle>
					<CardDescription>
						Track the time it takes to complete a task.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Timer name="timer" />
				</CardContent>
				<CardFooter>
					<Button type="submit">Submit</Button>
				</CardFooter>
			</Card>
		</form>
	),
};
