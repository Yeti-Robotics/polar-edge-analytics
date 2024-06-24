import type { Preview } from "@storybook/react";
import { Libre_Franklin } from "next/font/google";
import "../app/globals.css";
import React from "react";

const fontLibreFranklin = Libre_Franklin({
	subsets: ["latin"],
	variable: "--font-libre-franklin",
});

const preview: Preview = {
	tags: ["autodocs"],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		(Story) => (
			<main className={`${fontLibreFranklin.variable} font-sans`}>
				<Story />
			</main>
		),
	],
};

export default preview;
