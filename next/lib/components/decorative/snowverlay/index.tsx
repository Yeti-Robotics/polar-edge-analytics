import { ReactElement } from "react";
import { Snowflake } from "./snowflake";

export interface SnowverlayProps {
	/** Number of snowflakes to generate. Max is 125, and will set to 125 if greater number is provided. */
	numSnowflakes: number;
	/** Frequency at which a blur filter will be put on a snowflake.
	 *  0 means no snowflakes will have a blur effect, 1 means every snowflake will have a blur effect.
	 */
	blurFrequency: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
}

/** A decorative component for the homepage that uses JavaScript to generate a specified number of
 * snowflake components, with CSS taking care of the rest. No client-side components needed!
 *
 * Background not included.
 *
 * Based on the following CodePen:
 * <br>https://codepen.io/alvaromontoro/pen/GRNmdzB
 */
export function Snowverlay({ numSnowflakes, blurFrequency }: SnowverlayProps) {
	let snowflakes: ReactElement[] = [];
	for (let i = 0; i < Math.min(numSnowflakes, 125); i++) {
		snowflakes.push(<Snowflake key={i} blurFrequency={blurFrequency} />);
	}

	return (
		<div className="absolute left-0 top-0 z-0 h-screen w-screen overflow-hidden">
			{snowflakes}
		</div>
	);
}
