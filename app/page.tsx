import { Button } from "@components/ui/button";
import { Snowverlay } from "@/lib/components/decorative/snowverlay";

function MountainUnderlay() {
	return (
		<svg
			viewBox="0 0 1280 620"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="inset-y-0 left-0 z-[-1] w-full overflow-hidden object-contain"
		>
			<path
				d="M116.7 279.131L0 396.352V620H1279L1280 467.057L1129.96 243.779L1061.42 349.836L913.227 215.869L794.674 279.131L757.627 158.188L663.155 0.0327454L485.326 279.131L338.987 158.188L196.353 349.836L116.7 279.131Z"
				fill="url(#paint0_linear_2_3)"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_2_3"
					x1="640"
					y1="0.0327454"
					x2="640"
					y2="620"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#FCFCFC" />
					<stop offset="1" stop-color="#9CCFEB" />
				</linearGradient>
			</defs>
		</svg>
	);
}

export default async function Home() {
	return (
		<main className="relative min-h-[360px] items-center overflow-hidden bg-white to-90% sm:min-h-[500px]">
			<div className="absolute bottom-0 left-0 z-0 max-h-full w-full overflow-hidden">
				<MountainUnderlay />
			</div>
			<div className="absolute left-0 top-0 flex size-full items-center bg-gradient-to-br from-primary from-20% via-fuchsia-500/60 to-orange-400 p-8">
				<Snowverlay numSnowflakes={100} blurFrequency={0.6} />
				<div className="z-10 text-white">
					<h1 className="text-5xl font-extrabold sm:text-7xl">
						POLAR EDGE
					</h1>
					<p>YETI Robotics Scouting Platform</p>
					<Button className="mt-4" variant="secondary">
						Learn More
					</Button>
				</div>
			</div>
		</main>
	);
}
