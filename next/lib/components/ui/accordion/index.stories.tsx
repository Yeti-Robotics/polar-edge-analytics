import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/lib/components/ui/accordion";
import { AccordionHeader } from "@radix-ui/react-accordion";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
	component: Accordion,
	title: "Components/shadcn/Accordion",
	argTypes: {
		type: ["single", "multiple"],
	},
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Single: Story = {
	args: {
		type: "single",
		children: (
			<>
				<AccordionItem value="item-0">
					<AccordionHeader>This is a title</AccordionHeader>
				</AccordionItem>
				<AccordionItem value="item-1">
					<AccordionTrigger>Is it accessible?</AccordionTrigger>
					<AccordionContent>
						Yes. It adheres to the WAI-ARIA design pattern.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>Is it styled?</AccordionTrigger>
					<AccordionContent>
						Yes. It comes with default styles that matches the other
						components&apos; aesthetic.
					</AccordionContent>
				</AccordionItem>
			</>
		),
	},
};

export const Multiple: Story = {
	args: {
		type: "multiple",
		children: (
			<>
				<AccordionItem value="item-0">
					<AccordionHeader>This is a title</AccordionHeader>
				</AccordionItem>
				<AccordionItem value="item-1">
					<AccordionTrigger>Is it accessible?</AccordionTrigger>
					<AccordionContent>
						Yes. It adheres to the WAI-ARIA design pattern.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>Is it styled?</AccordionTrigger>
					<AccordionContent>
						Yes. It comes with default styles that matches the other
						components&apos; aesthetic.
					</AccordionContent>
				</AccordionItem>
			</>
		),
	},
};
