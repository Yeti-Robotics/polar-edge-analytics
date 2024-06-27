import { Meta, StoryObj } from "@storybook/react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from ".";
import { Bookmark, ShareIcon, Smile, ThumbsUp } from "lucide-react";
import { expect, userEvent, within } from "@storybook/test";

const meta = {
	component: Command,
	title: "Components/shadcn/Command",
	decorators: [
		(Story) => (
			<div className="flex w-full justify-center">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Command>;

export default meta;

type Story = StoryObj<typeof Command>;

/** Default usage without search/groups */
export const Default: Story = {
	render() {
		return (
			<Command className=" max-w-sm rounded-lg border shadow-md">
				<CommandList>
					<CommandItem>
						<ThumbsUp className="mr-2 size-4" />
						<span>Like</span>
					</CommandItem>
					<CommandItem>
						<Bookmark className="mr-2 size-4" />
						<span>Bookmark</span>
					</CommandItem>
					<CommandItem>
						<ShareIcon className="mr-2 size-4" />
						<span>Share</span>
					</CommandItem>
				</CommandList>
			</Command>
		);
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement);
		const commands = canvas.getAllByRole("option");
		await expect(commands.length).toEqual(3);
		await userEvent.hover(commands[1]);
		await expect(commands[0].getAttribute("data-selected")).toEqual(
			"false"
		);
		await userEvent.hover(commands[0]);
		await expect(commands[0].getAttribute("data-selected")).toEqual("true");
	},
};

/** Command supports search, along with a placeholder that will show if no search result exists. */
export const WithSearch: Story = {
	render() {
		return (
			<Command className="max-w-sm rounded-lg border shadow-md">
				<CommandInput placeholder="Search" />
				<CommandList>
					<CommandEmpty>No results found</CommandEmpty>
					<CommandItem>
						<ThumbsUp className="mr-2 size-4" />
						<span>Like</span>
					</CommandItem>
					<CommandItem>
						<Bookmark className="mr-2 size-4" />
						<span>Bookmark</span>
					</CommandItem>
					<CommandItem>
						<ShareIcon className="mr-2 size-4" />
						<span>Share</span>
					</CommandItem>
				</CommandList>
			</Command>
		);
	},
	async play({ canvasElement, step }) {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("combobox");
		await step("Type 'Shared' in the search input", async () => {
			await userEvent.type(input, "Shared");
			const empty = canvas.getByText("No results found");
			await expect(empty).toBeInTheDocument();
		});
		await step("Clear the search input", async () => {
			await userEvent.clear(input);
			const commands = canvas.getAllByRole("option");
			expect(commands.length).toEqual(3);
		});
		await step("Type 'Share' in the search input", async () => {
			await userEvent.type(input, "Share");
			const commands = canvas.getAllByRole("option");
			expect(commands.length).toEqual(1);
			expect(commands[0].textContent).toEqual("Share");
		});
	},
};

/** Command also lets you group CommandItems together via the use of a CommandGroup. Headings can be controlled using a prop. */
export const WithGroups: Story = {
	render() {
		return (
			<Command className="max-w-sm rounded-lg border shadow-md">
				<CommandList>
					<CommandGroup heading="React">
						<CommandItem>
							<ThumbsUp className="mr-2 size-4" />
							<span>Like</span>
						</CommandItem>
					</CommandGroup>
					<CommandGroup heading="Save & Share">
						<CommandItem>
							<Bookmark className="mr-2 size-4" />
							<span>Bookmark</span>
						</CommandItem>
						<CommandItem>
							<ShareIcon className="mr-2 size-4" />
							<span>Share</span>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		);
	},
};
