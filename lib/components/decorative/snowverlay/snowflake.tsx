import { cn } from "@/lib/utils";
import styles from "./snow.module.css";
import { getRandomSnowflake, SnowflakeSVGProps } from "./snowflakes";
import { ComponentType } from "react";

export interface SnowflakeProps {
	blurFrequency: number;
}

function generateRandomInt(upperBound: number, lowerBound: number = 0) {
	return lowerBound + Math.floor(Math.random() * upperBound + 1);
}

function withStyles(
	UnstyledSnowflake: ComponentType<SnowflakeSVGProps>,
	blurFrequency: number
) {
	const size = `${generateRandomInt(15, 5)}`;
	const classes = `${styles.snowflake} absolute top-[-25px] z-0 overflow-hidden rounded-[50%] fill-white/50`;
	const cssStyles = {
		width: `${size}px`,
		height: `${size}px`,
		left: `${Math.random() * 100}vw`,
		animationDelay: `${Math.random() * 15}s`,
		filter:
			generateRandomInt(10) < 10 * blurFrequency &&
			UnstyledSnowflake.displayName !== "YETIHead"
				? `blur(1px)`
				: "none",
		"--init": `${Math.random() * 20 - 10}vw`,
		"--end": `${Math.random() * 20 - 10}vw`,
		"--rotation-init": `${generateRandomInt(720, -720)}deg`,
		"--rotation-end": `${generateRandomInt(720, -720)}deg`,
	};
	const Component = (props: JSX.IntrinsicAttributes) => (
		<UnstyledSnowflake {...props} className={classes} styles={cssStyles} />
	);
	Component.displayName = "StyledSnowflake";
	return Component;
}

export function Snowflake({ blurFrequency }: SnowflakeProps) {
	const StyledSnowflake = withStyles(getRandomSnowflake(), blurFrequency);
	return <StyledSnowflake />;
}
