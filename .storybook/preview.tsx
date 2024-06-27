import type { Preview } from "@storybook/react";
import { Libre_Franklin } from "next/font/google";
import { ThemeProvider } from "../lib/components/structural/ThemeProvider";
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
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "hsl(0 0% 100%)" },
				{
					name: "dark",
					value: "hsl(222.2 84% 4.9%)",
				},
			],
		},
	},
	decorators: [
		(Story, context) => {
			const { backgrounds } = context.globals;
			const theme =
				backgrounds?.value === "hsl(222.2 84% 4.9%)" ? "dark" : "light";
			console.log(backgrounds?.value, theme);
			return (
				<main
					className={`${fontLibreFranklin.variable} storybook-main font-sans`}
				>
					<ThemeProvider forcedTheme={theme} attribute="class">
						<Story />
					</ThemeProvider>
				</main>
			);
		},
	],
};

export default preview;
