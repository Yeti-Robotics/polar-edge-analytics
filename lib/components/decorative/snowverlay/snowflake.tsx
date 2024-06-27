import styles from "./snow.module.css";
import { getRandomSnowflake } from "./snowflakes";

interface SnowflakeProps {
	blurFrequency: number;
}

function generateRandomInt(upperBound: number, lowerBound: number = 0) {
	return lowerBound + Math.floor(Math.random() * upperBound + 1);
}

export function Snowflake({ blurFrequency }: SnowflakeProps) {
	const size = `${generateRandomInt(15, 5)}px`;
	return (
		<div
			className={`${styles.snowflake} absolute top-[-25px] z-0 overflow-hidden rounded-[50%] fill-white/50`}
			style={
				{
					width: size,
					height: size,
					left: `${Math.random() * 100}vw`,
					animationDelay: `${Math.random() * 15}s`,
					filter:
						generateRandomInt(10) < 10 * blurFrequency
							? `blur(1px)`
							: "none",
					"--init": `${Math.random() * 20 - 10}vw`,
					"--end": `${Math.random() * 20 - 10}vw`,
					"--rotation-init": `${generateRandomInt(720, -720)}deg`,
					"--rotation-end": `${generateRandomInt(720, -720)}deg`,
				} as React.CSSProperties
			}
		>
			{getRandomSnowflake()}
		</div>
	);
}
