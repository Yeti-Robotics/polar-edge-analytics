export default function PolarEdgeLogo({
	width,
	height,
}: {
	width: number;
	height: number;
}) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 603 384"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M0 0H603L571.624 51.7258H42.328L0 0Z"
				className="fill-black dark:fill-white"
			/>
			<path
				d="M223.532 20.6904L294.294 41.92L155.12 366.117L80.7292 364.051L223.532 20.6904Z"
				className="fill-black dark:fill-white"
			/>
			<path
				d="M522.49 128.402L571.624 51.7256H479.392L430.417 144.906C430.244 145.235 429.904 145.441 429.532 145.441H273.978L251.585 196.558H331.625H482.572C484.406 196.558 486.093 195.553 486.967 193.94L522.49 128.402Z"
				className="fill-black dark:fill-white"
			/>
			<g filter="url(#filter0_d_263_304)">
				<path
					d="M276.686 82.7611L289.236 51.7256H479.504L462.885 82.7611H276.686Z"
					fill="url(#paint0_linear_263_304)"
				/>
			</g>
			<defs>
				<filter
					id="filter0_d_263_304"
					x="272.686"
					y="51.7256"
					width="210.819"
					height="39.0356"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_263_304"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_263_304"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_263_304"
					x1="276.686"
					y1="67.2433"
					x2="479.504"
					y2="67.2433"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#56B7E7" />
					<stop offset="1" stopColor="#449AC5" />
				</linearGradient>
			</defs>
		</svg>
	);
}
