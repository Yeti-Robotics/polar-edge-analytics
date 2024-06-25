import { ReactElement } from "react";
import { Snowflake } from "./snowflake";

interface SnowverlayProps {
	numSnowflakes: number;
	blurFrequency: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
}

export function Snowverlay({ numSnowflakes, blurFrequency }: SnowverlayProps) {
	let snowflakes: ReactElement[] = [];
	for (let i = 0; i < numSnowflakes; i++) {
		snowflakes.push(<Snowflake key={i} blurFrequency={blurFrequency} />);
	}

	return (
		<div className="absolute left-0 top-0 z-0 h-screen w-screen overflow-hidden">
			{snowflakes}
		</div>
	);
}
