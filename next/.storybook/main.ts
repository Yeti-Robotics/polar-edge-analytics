import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
	stories: [
		"../lib/components/**/*.mdx",
		"../lib/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"@chromatic-com/storybook",
		"@storybook/addon-interactions",
		"@storybook/addon-a11y",
		"@storybook/addon-coverage",
	],
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	staticDirs: ["../public"],
};
export default config;
