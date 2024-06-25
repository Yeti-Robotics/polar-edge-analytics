import styles from "./snow.module.css";

interface SnowflakeProps {
	blurFrequency: number;
}

function generateRandomInt(upperBound: number, lowerBound: number = 0) {
	return lowerBound + Math.floor(Math.random() * upperBound + 1);
}

export function Snowflake({ blurFrequency }: SnowflakeProps) {
	const size = `${generateRandomInt(20, 5)}px`;
	return (
		<div
			className={`${styles.snowflake} absolute top-[-25px] overflow-hidden rounded-[50%] bg-white/70`}
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
				} as React.CSSProperties
			}
		></div>
	);
}
