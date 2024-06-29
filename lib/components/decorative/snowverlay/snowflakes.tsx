const snowflakes = [
	<Snowflake1 key="1" />,
	<Snowflake2 key="2" />,
	<Snowflake3 key="3" />,
	<Snowflake4 key="4" />,
];

export function getRandomSnowflake() {
	if (Math.random() < 0.01) {
		return <YETIHead />;
	}
	return snowflakes[Math.floor(Math.random() * snowflakes.length)];
}

function Snowflake1() {
	return (
		<svg
			viewBox="0 0 770 766"
			className="fill-white/50"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M334.873 138.4C334.873 135.638 337.112 133.4 339.873 133.4H429.873C432.635 133.4 434.873 135.638 434.873 138.4V628.4C434.873 631.161 432.635 633.4 429.873 633.4H339.873C337.112 633.4 334.873 631.161 334.873 628.4V138.4Z" />
			<path d="M176.277 245.514C174.324 243.561 174.324 240.395 176.277 238.443L239.917 174.803C241.869 172.85 245.035 172.85 246.988 174.803L593.47 521.285C595.423 523.238 595.423 526.404 593.47 528.356L529.83 591.996C527.878 593.949 524.712 593.949 522.759 591.996L176.277 245.514Z" />
			<path d="M522.759 174.803C524.712 172.85 527.878 172.85 529.83 174.803L593.47 238.443C595.423 240.395 595.423 243.561 593.47 245.514L246.988 591.996C245.035 593.949 241.869 593.949 239.917 591.996L176.277 528.356C174.324 526.404 174.324 523.238 176.277 521.285L522.759 174.803Z" />
			<path d="M697.569 219.194C699.522 217.241 702.688 217.241 704.64 219.194L768.28 282.833C770.233 284.786 770.233 287.952 768.28 289.904L658.002 400.182C656.049 402.135 652.884 402.135 650.931 400.182L587.291 336.543C585.339 334.59 585.339 331.424 587.291 329.471L697.569 219.194Z" />
			<path d="M768.304 477.347C770.243 479.313 770.222 482.479 768.256 484.418L704.191 547.629C702.225 549.569 699.06 549.547 697.12 547.582L587.585 436.566C585.645 434.601 585.667 431.435 587.632 429.495L651.698 366.284C653.663 364.345 656.829 364.366 658.769 366.332L768.304 477.347Z" />
			<path d="M220.667 72.9742C218.715 71.0216 218.715 67.8557 220.667 65.9031L284.307 2.26351C286.26 0.31089 289.426 0.31089 291.378 2.26351L401.656 112.541C403.609 114.494 403.609 117.66 401.656 119.612L338.016 183.252C336.064 185.205 332.898 185.205 330.945 183.252L220.667 72.9742Z" />
			<path d="M478.821 2.23968C480.787 0.300205 483.953 0.32145 485.892 2.28713L549.103 66.3524C551.043 68.3181 551.021 71.4839 549.056 73.4233L438.04 182.959C436.074 184.898 432.909 184.877 430.969 182.911L367.758 118.846C365.819 116.88 365.84 113.714 367.806 111.775L478.821 2.23968Z" />
			<path d="M549.079 693.825C551.032 695.777 551.032 698.943 549.079 700.896L485.44 764.535C483.487 766.488 480.321 766.488 478.369 764.535L368.091 654.257C366.138 652.305 366.138 649.139 368.091 647.186L431.73 583.547C433.683 581.594 436.849 581.594 438.801 583.547L549.079 693.825Z" />
			<path d="M290.926 764.559C288.96 766.499 285.794 766.477 283.855 764.512L220.644 700.446C218.704 698.481 218.726 695.315 220.691 693.376L331.707 583.84C333.672 581.901 336.838 581.922 338.778 583.888L401.989 647.953C403.928 649.919 403.907 653.084 401.941 655.024L290.926 764.559Z" />
			<path d="M72.1777 547.606C70.2251 549.558 67.0592 549.558 65.1066 547.606L1.467 483.966C-0.485618 482.013 -0.485618 478.848 1.467 476.895L111.745 366.617C113.698 364.664 116.863 364.664 118.816 366.617L182.456 430.257C184.408 432.209 184.408 435.375 182.456 437.328L72.1777 547.606Z" />
			<path d="M1.44317 289.452C-0.496304 287.486 -0.475059 284.321 1.49062 282.381L65.5559 219.17C67.5216 217.231 70.6873 217.252 72.6268 219.217L182.162 330.233C184.102 332.199 184.08 335.364 182.115 337.304L118.049 400.515C116.084 402.454 112.918 402.433 110.978 400.468L1.44317 289.452Z" />
			<path d="M629.873 333.4C632.635 333.4 634.873 335.638 634.873 338.4V428.4C634.873 431.161 632.635 433.4 629.873 433.4L139.873 433.4C137.112 433.4 134.873 431.161 134.873 428.4V338.4C134.873 335.638 137.112 333.4 139.873 333.4L629.873 333.4Z" />
		</svg>
	);
}

function Snowflake2() {
	return (
		<svg
			viewBox="0 0 1024 920"
			className="fill-white/50"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M774 816L715.177 634.962H524.823L678.823 523.075L620 342.038L774 453.925L928 342.038L869.177 523.075L1023.18 634.962H832.823L774 816Z" />
			<path d="M664 474L605.177 292.962H414.823L568.823 181.075L510 0.0375366L664 111.925L818 0.0375366L759.177 181.075L913.177 292.962H722.823L664 474Z" />
			<path d="M250 95L308.823 276.038H499.177L345.177 387.925L404 568.962L250 457.075L96.0003 568.962L154.823 387.925L0.823196 276.038H191.177L250 95Z" />
			<path d="M356 474L297.177 292.962H106.823L260.823 181.075L202 0.0375366L356 111.925L510 0.0375366L451.177 181.075L605.177 292.962H414.823L356 474Z" />
			<path d="M666 446L724.823 627.038H915.177L761.177 738.925L820 919.962L666 808.075L512 919.962L570.823 738.925L416.823 627.038H607.177L666 446Z" />
			<path d="M358 446L416.823 627.038H607.177L453.177 738.925L512 919.962L358 808.075L204 919.962L262.823 738.925L108.823 627.038H299.177L358 446Z" />
			<path d="M774 95L832.823 276.038H1023.18L869.177 387.925L928 568.962L774 457.075L620 568.962L678.823 387.925L524.823 276.038H715.177L774 95Z" />
			<path d="M250 816L191.177 634.962H0.823181L154.823 523.075L96.0002 342.038L250 453.925L404 342.038L345.177 523.075L499.177 634.962H308.823L250 816Z" />
		</svg>
	);
}

function Snowflake3() {
	return (
		<svg
			viewBox="0 0 376 432"
			className="fill-white/50 stroke-black stroke-1"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M44.1239 298.455L44.8332 297.667L44.7224 298.721L45.6907 299.152L44.6539 299.373L44.5431 300.427L44.0131 299.509L42.9762 299.729L43.6855 298.942L43.1555 298.024L44.1239 298.455ZM77.9976 216L75.6942 218.558V213.442L77.9976 216ZM79.4944 177.109L76.8364 151.82L100.067 141.477L130.689 127.843L130.079 129.721L135.791 125.571L142.241 122.7L140.309 122.289L167.428 102.586L188 87.6393L208.572 102.586L235.691 122.289L233.759 122.7L240.209 125.571L245.921 129.721L245.311 127.843L275.933 141.477L299.164 151.82L296.506 177.109L293.002 210.446L291.68 208.978L292.418 216L291.68 223.022L293.002 221.554L296.506 254.891L299.164 280.18L275.933 290.523L245.311 304.157L245.921 302.279L240.209 306.429L233.759 309.3L235.691 309.711L208.572 329.414L188 344.361L167.428 329.414L140.309 309.711L142.241 309.3L135.791 306.429L130.079 302.279L130.689 304.157L100.067 290.523L76.8364 280.18L79.4944 254.891L82.9983 221.554L84.32 223.022L83.582 216L84.32 208.978L82.9983 210.446L79.4944 177.109ZM134.063 117.461L132.999 120.735L129.632 120.019L134.063 117.461ZM45.6907 132.847L44.7224 133.279L44.8332 134.333L44.1239 133.545L43.1555 133.976L43.6855 133.058L42.9762 132.271L44.0131 132.491L44.5431 131.573L44.6539 132.627L45.6907 132.847ZM243.001 120.735L241.937 117.461L246.368 120.019L243.001 120.735ZM298.002 216L300.306 213.442V218.558L298.002 216ZM243.001 311.265L246.368 311.98L241.937 314.539L243.001 311.265ZM187.47 381.828L187.142 380.82L188 381.443L188.858 380.82L188.53 381.828L189.388 382.451H188.328L188 383.459L187.672 382.451H186.612L187.47 381.828ZM132.999 311.265L134.063 314.539L129.632 311.981L132.999 311.265ZM331.346 299.373L330.309 299.152L331.278 298.721L331.167 297.667L331.876 298.455L332.844 298.024L332.314 298.942L333.024 299.73L331.987 299.509L331.457 300.427L331.346 299.373ZM331.876 133.545L331.167 134.333L331.278 133.279L330.309 132.848L331.346 132.627L331.457 131.573L331.987 132.491L333.024 132.27L332.314 133.058L332.844 133.976L331.876 133.545ZM188.328 49.5491H189.388L188.53 50.1722L188.858 51.1803L188 50.5573L187.142 51.1803L187.47 50.1722L186.612 49.5491H187.672L188 48.541L188.328 49.5491Z"
				stroke="white"
			/>
		</svg>
	);
}

function Snowflake4() {
	return (
		<svg
			viewBox="0 0 161 161"
			className="fill-white/50 stroke-black"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect width="161" height="161" fill="#F5F5F5" />
			<path d="M108.969 69.431L140.683 44.1501M141.516 45.3513L156.996 51.4187M139.527 44.1355L154.701 36.8122M138.42 46.1708L144.981 26.4389M110.547 94.6975L144.187 117.222M144.344 118.805L147.551 137.002M143.845 115.937L156.514 128.582M141.39 116.536L158.76 115.521M84.6082 107.266L85.0652 142.703M84.5547 143.652L69.2238 156.495M86.1569 141.6L82.3429 157.4M84.261 140.649L96.6093 151.49M53.4821 65.3488L17.0655 49.5683M16.9787 47.776L11.7063 32.3944M17.5509 50.493L3.36885 40.9519M20.303 50.0434L2.91901 52.8283M56.8366 95.8763L23.5075 111.024M22.8895 109.993L9.55825 99.4494M24.6055 111.456L9.42056 114.053M25.831 109.776L16.6219 127.042M83.9426 54.9124L81.3083 18.0271M82.0307 17.2633L96.9183 4.48284M80.3274 19.1422L83.2603 2.84865M82.1378 20.2496L68.851 8.50335M84 40L122.971 61V103L84 124L45.0289 103V61L84 40Z" />
		</svg>
	);
}

function YETIHead() {
	return (
		<svg
			viewBox="0 0 329 364"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clipRule="evenodd"
				d="M213.151 2.64228C176.216 12.1316 136.465 28.8911 103.511 48.8672C96.1457 53.3316 89.6037 56.7866 88.9734 56.5453C86.3921 55.5548 81.8878 34.4197 81.2365 20.2386C81.1039 17.3511 80.5463 14.9483 79.9978 14.8984C77.8404 14.7029 67.8245 44.4287 65.675 57.405C65.1295 60.6965 64.3625 66.5313 63.9705 70.3714L63.2563 77.3532L61.3353 73.0444C59.0593 67.9387 57.0724 58.7914 55.5544 46.4335C54.948 41.4964 54.0603 37.0629 53.5815 36.5801C52.5043 35.4949 45.0867 58.7087 42.5413 71.1314C41.5209 76.1134 40.3719 85.153 39.9879 91.2202L39.2898 102.251L34.576 108.753C4.32481 150.477 -5.82575 198.05 5.15466 246.643C13.3862 283.076 33.9736 315.051 62.0086 334.945C72.0115 342.044 91.1308 351.697 102.938 355.61C129.572 364.438 158.842 365.417 191.795 358.584C267.755 342.832 313.963 305.682 326.356 250.404C328.615 240.329 329.516 208.416 327.889 196.158C326.217 183.566 322.397 165.963 318.828 154.403C315.645 144.095 303.818 119.486 296.982 108.945C291.943 101.177 276.675 85.7883 264.019 75.7225C252.408 66.4874 251.789 65.7703 252.611 62.4968C253.567 58.6887 263.375 50.1668 273.825 44.0647C278.874 41.1163 283.247 38.3116 283.545 37.8309C284.481 36.3148 275.176 36.8823 264.961 38.9639C253.824 41.234 242.218 45.2735 232.928 50.113C229.457 51.9213 226.308 53.5441 225.931 53.7196C224.649 54.3161 227.299 46.4515 230.276 40.8221C232.839 35.9797 246.059 21.62 254.793 14.1953C260.168 9.62614 255.606 10.2096 236.267 16.5681C227.844 19.3369 214.419 25.1249 199.612 32.3701C186.762 38.6577 176.247 43.4323 176.247 42.9785C176.247 41.6709 194.355 26.3397 210.34 14.1145C218.394 7.95448 225.519 2.27124 226.172 1.48428C227.895 -0.591324 224.597 -0.298086 213.151 2.64228Z"
				fill="#7F7FFF"
			/>
			<path
				fill-rule="evenodd"
				clipRule="evenodd"
				d="M213.151 2.64228C176.216 12.1316 136.465 28.8911 103.511 48.8672C96.1457 53.3316 89.6037 56.7866 88.9734 56.5453C86.3921 55.5548 81.8878 34.4197 81.2365 20.2386C81.1039 17.3511 80.5463 14.9483 79.9978 14.8984C77.8404 14.7029 67.8245 44.4287 65.675 57.405C65.1295 60.6965 64.3625 66.5313 63.9705 70.3714L63.2563 77.3532L61.3353 73.0444C59.0593 67.9387 57.0724 58.7914 55.5544 46.4335C54.948 41.4964 54.0603 37.0629 53.5815 36.5801C52.5043 35.4949 45.0867 58.7087 42.5413 71.1314C41.5209 76.1134 40.3719 85.153 39.9879 91.2202L39.2898 102.251L34.576 108.753C4.32481 150.477 -5.82575 198.05 5.15466 246.643C13.3862 283.076 33.9736 315.051 62.0086 334.945C72.0115 342.044 91.1308 351.697 102.938 355.61C129.572 364.438 158.842 365.417 191.795 358.584C267.755 342.832 313.963 305.682 326.356 250.404C328.615 240.329 329.516 208.416 327.889 196.158C326.217 183.566 322.397 165.963 318.828 154.403C315.645 144.095 303.818 119.486 296.982 108.945C291.943 101.177 276.675 85.7883 264.019 75.7225C252.408 66.4874 251.789 65.7703 252.611 62.4968C253.567 58.6887 263.375 50.1668 273.825 44.0647C278.874 41.1163 283.247 38.3116 283.545 37.8309C284.481 36.3148 275.176 36.8823 264.961 38.9639C253.824 41.234 242.218 45.2735 232.928 50.113C229.457 51.9213 226.308 53.5441 225.931 53.7196C224.649 54.3161 227.299 46.4515 230.276 40.8221C232.839 35.9797 246.059 21.62 254.793 14.1953C260.168 9.62614 255.606 10.2096 236.267 16.5681C227.844 19.3369 214.419 25.1249 199.612 32.3701C186.762 38.6577 176.247 43.4323 176.247 42.9785C176.247 41.6709 194.355 26.3397 210.34 14.1145C218.394 7.95448 225.519 2.27124 226.172 1.48428C227.895 -0.591324 224.597 -0.298086 213.151 2.64228Z"
				fill="#54B6E5"
			/>
			<path
				fill-rule="evenodd"
				clipRule="evenodd"
				d="M224.04 167.022C223.811 167.243 212.178 167.739 198.19 168.125C183.074 168.541 172.503 169.231 172.133 169.825C171.735 170.462 171.247 170.4 170.785 169.652C170.108 168.555 167.531 168.628 154.304 170.116C152.933 170.27 147.861 170.724 143.033 171.125C138.204 171.526 133.716 172.359 133.058 172.978C132.368 173.627 127.438 174.209 121.39 174.353C115.63 174.492 110.244 174.891 109.421 175.24C108.598 175.589 106.55 175.785 104.868 175.676C100.085 175.365 60.2012 180.533 59.132 181.603C57.4813 183.253 63.9335 206.716 68.6781 216.317C74.0192 227.122 85.6609 239.366 94.9587 243.958C100.698 246.792 101.494 246.913 114.408 246.911C124.996 246.909 129.045 246.507 133.359 245.027C140.989 242.409 149.166 238.198 154.446 234.167L158.918 230.754L161.133 234.133C164.108 238.671 167.335 239.753 175.664 239.008C186.696 238.02 186.849 237.932 190.858 230.304C194.807 222.79 197.002 220.964 200.912 221.946C203.39 222.568 203.434 222.489 202.795 218.491L202.141 214.399L205.9 215.138C207.968 215.545 212.892 215.865 216.841 215.848C222.871 215.822 225.066 215.304 230.514 212.622C238.251 208.813 242.932 203.713 247.561 194.05C250.622 187.662 254.044 174.744 254.044 169.58C254.044 167.577 253.63 167.484 246.063 167.792C241.673 167.971 238.082 167.78 238.084 167.369C238.086 166.611 224.806 166.283 224.04 167.022ZM132.045 178.778C131.727 179.573 131.491 179.336 131.443 178.174C131.4 177.123 131.635 176.535 131.966 176.866C132.297 177.197 132.333 178.058 132.045 178.778ZM176.654 199.037C178.248 201.47 178.226 201.531 175.771 201.531C173.996 201.531 173.255 200.992 173.255 199.703C173.255 198.147 174.04 196.544 174.803 196.544C174.922 196.544 175.755 197.666 176.654 199.037ZM208.378 245.368C207.725 249.181 206.472 254.094 205.595 256.287C204.126 259.955 203.59 260.353 198.851 261.287C192.693 262.498 132.26 270.721 113.915 272.843C89.9438 275.615 78.5714 274.469 68.746 268.291C66.7591 267.042 66.3522 267.05 65.5204 268.357C62.6289 272.902 64.6885 274.489 77.7755 277.797L86.8468 280.09L88.2123 284.772C90.0804 291.178 98.4596 299.838 103.733 300.812C105.815 301.197 107.788 301.242 108.117 300.914C108.446 300.584 107.579 297.726 106.191 294.56C104.804 291.394 103.387 286.896 103.043 284.565L102.415 280.326H105.799C108.975 280.326 109.253 280.601 110.308 284.788C112.291 292.661 118.223 297.5 128.621 299.726C130.129 300.048 131.364 300.179 131.364 300.015C131.364 299.851 130.029 296.589 128.399 292.765C124.967 284.717 124.542 279.847 127.151 278.451C128.125 277.929 131.829 276.976 135.379 276.332C138.931 275.688 150.589 273.224 161.286 270.855C183.003 266.045 201.914 262.742 213.151 261.793C220.551 261.169 220.654 261.193 222.744 264.042C226.255 268.83 229.053 274.981 230.242 280.523L231.367 285.772L235.22 281.431C239.626 276.465 241.393 271.116 240.914 264.195L240.579 259.379L247.561 259.16C251.401 259.039 256.651 258.928 259.226 258.912C264.566 258.878 266.263 257.668 266.263 253.895C266.263 249.431 264.906 249.124 256.942 251.782C249.447 254.283 223.507 258.737 221.97 257.787C221.508 257.501 221.13 256.599 221.13 255.781C221.13 252.867 212 238.435 210.157 238.435C209.833 238.435 209.033 241.555 208.378 245.368ZM45.5873 321.597C45.5873 321.803 46.3722 322.589 47.3327 323.342C48.9146 324.582 48.9495 324.547 47.7098 322.965C46.4061 321.304 45.5873 320.776 45.5873 321.597Z"
				fill="#00FFFF"
			/>
			<path
				fill-rule="evenodd"
				clipRule="evenodd"
				d="M224.04 167.022C223.811 167.243 212.179 167.739 198.19 168.125C183.074 168.541 172.503 169.231 172.133 169.825C171.735 170.462 171.247 170.4 170.785 169.652C170.108 168.555 167.531 168.628 154.304 170.116C152.933 170.27 147.861 170.724 143.033 171.125C138.204 171.526 133.716 172.359 133.059 172.978C132.368 173.627 127.438 174.209 121.39 174.353C115.63 174.492 110.244 174.891 109.421 175.24C108.598 175.589 106.55 175.785 104.868 175.676C100.085 175.365 60.2013 180.533 59.1321 181.603C57.4814 183.253 63.9336 206.716 68.6782 216.317C74.0193 227.122 85.661 239.366 94.9588 243.958C100.698 246.792 101.494 246.913 114.408 246.911C124.997 246.909 129.045 246.507 133.359 245.027C140.989 242.409 149.166 238.198 154.446 234.167L158.918 230.754L161.133 234.133C164.108 238.671 167.335 239.753 175.664 239.008C186.696 238.02 186.849 237.932 190.858 230.304C194.807 222.79 197.002 220.964 200.912 221.946C203.39 222.568 203.434 222.489 202.795 218.491L202.141 214.399L205.9 215.138C207.968 215.545 212.892 215.865 216.841 215.848C222.871 215.822 225.066 215.304 230.514 212.622C238.251 208.813 242.932 203.713 247.561 194.05C250.622 187.662 254.044 174.744 254.044 169.58C254.044 167.577 253.631 167.484 246.063 167.792C241.673 167.971 238.082 167.78 238.084 167.369C238.086 166.611 224.806 166.283 224.04 167.022ZM132.045 178.778C131.727 179.573 131.491 179.336 131.443 178.174C131.4 177.123 131.635 176.535 131.966 176.866C132.298 177.197 132.333 178.058 132.045 178.778ZM176.654 199.037C178.248 201.47 178.226 201.531 175.771 201.531C173.996 201.531 173.255 200.992 173.255 199.703C173.255 198.147 174.04 196.544 174.803 196.544C174.923 196.544 175.755 197.666 176.654 199.037ZM208.378 245.368C207.725 249.181 206.472 254.094 205.595 256.287C204.126 259.955 203.59 260.353 198.851 261.287C192.693 262.498 132.26 270.721 113.915 272.843C89.9438 275.615 78.5715 274.469 68.746 268.291C66.7592 267.042 66.3523 267.05 65.5204 268.357C62.629 272.902 64.6886 274.489 77.7755 277.797L86.8469 280.09L88.2123 284.772C90.0805 291.178 98.4597 299.838 103.733 300.812C105.816 301.197 107.788 301.242 108.118 300.914C108.446 300.584 107.579 297.726 106.192 294.56C104.804 291.394 103.387 286.896 103.043 284.565L102.415 280.326H105.8C108.975 280.326 109.254 280.601 110.308 284.789C112.291 292.661 118.223 297.5 128.621 299.726C130.129 300.048 131.364 300.179 131.364 300.015C131.364 299.851 130.029 296.589 128.399 292.765C124.967 284.717 124.542 279.847 127.151 278.451C128.125 277.929 131.829 276.976 135.38 276.332C138.931 275.688 150.589 273.224 161.286 270.855C183.003 266.045 201.914 262.742 213.151 261.793C220.551 261.169 220.654 261.193 222.744 264.042C226.255 268.83 229.054 274.981 230.242 280.523L231.368 285.772L235.221 281.431C239.626 276.465 241.393 271.116 240.914 264.195L240.58 259.379L247.561 259.16C251.401 259.039 256.651 258.928 259.226 258.912C264.566 258.878 266.263 257.668 266.263 253.895C266.263 249.431 264.906 249.124 256.942 251.782C249.447 254.283 223.507 258.737 221.97 257.787C221.508 257.501 221.13 256.599 221.13 255.781C221.13 252.867 212 238.435 210.157 238.435C209.833 238.435 209.033 241.555 208.378 245.368Z"
				fill="#8A8B8B"
			/>
			<path
				fill-rule="evenodd"
				clipRule="evenodd"
				d="M189.025 168.405L180.357 168.692L179.958 171.896L179.558 175.099L179.399 171.858C179.25 168.849 178.989 168.616 175.748 168.616C173.828 168.616 172.257 169.12 172.257 169.735C172.257 170.542 171.864 170.529 170.853 169.689C169.775 168.795 165.217 168.986 151.247 170.51C141.236 171.602 132.779 172.857 132.454 173.299C132.129 173.741 127.15 174.216 121.39 174.353C115.63 174.492 110.244 174.898 109.421 175.255C108.598 175.612 107.215 175.82 106.346 175.717C102.966 175.315 60.1075 180.627 59.1699 181.565C57.4793 183.255 63.8567 206.562 68.6782 216.317C74.0193 227.122 85.6609 239.366 94.9587 243.957C100.698 246.792 101.494 246.913 114.408 246.911C124.996 246.909 129.045 246.507 133.359 245.027C141.034 242.393 149.174 238.191 154.548 234.089L159.121 230.599L161.714 234.517L164.306 238.435H172.645C185.785 238.435 186.243 238.236 190.201 230.83C194.547 222.694 196.263 221.116 200.146 221.686C203.468 222.174 203.832 221.336 202.181 216.995L201.185 214.375L205.922 215.146C208.526 215.571 213.693 215.881 217.402 215.838C225.938 215.735 235.236 211.484 240.61 205.229C245.61 199.41 250.611 188.513 252.476 179.38C255.169 166.182 258.367 167.566 225.868 167.861C210.371 168.002 193.791 168.247 189.025 168.405ZM200.845 172.855C200.569 173.541 200.342 172.98 200.342 171.608C200.342 170.237 200.569 169.676 200.845 170.362C201.122 171.048 201.122 172.17 200.845 172.855ZM132.024 179.837C131.748 180.523 131.522 179.962 131.522 178.59C131.522 177.219 131.748 176.658 132.024 177.344C132.301 178.03 132.301 179.152 132.024 179.837ZM176.654 199.037C178.248 201.47 178.226 201.531 175.771 201.531C173.996 201.531 173.255 200.992 173.255 199.702C173.255 198.146 174.04 196.544 174.803 196.544C174.922 196.544 175.755 197.666 176.654 199.037ZM118.647 227.126C117.962 227.403 116.84 227.403 116.154 227.126C115.468 226.85 116.029 226.624 117.4 226.624C118.772 226.624 119.333 226.85 118.647 227.126ZM125.629 227.126C124.944 227.403 123.822 227.403 123.135 227.126C122.45 226.85 123.011 226.624 124.382 226.624C125.754 226.624 126.315 226.85 125.629 227.126ZM208.723 243.671C208.356 246.551 207.215 251.37 206.188 254.379C204.786 258.49 204.613 260.066 205.495 260.708C206.227 261.242 205.964 261.334 204.794 260.952C203.763 260.616 201.519 260.788 199.807 261.333C196.978 262.234 147.102 269.113 116.433 272.833C93.3529 275.632 78.1026 274.595 70.9453 269.738C68.1156 267.818 67.0245 267.535 65.9333 268.441C62.0544 271.66 65.7219 274.446 77.961 277.577L86.771 279.83L88.1744 284.642C90.0804 291.181 98.4008 299.827 103.733 300.812C105.815 301.197 107.788 301.242 108.117 300.914C108.446 300.584 107.579 297.726 106.191 294.56C103.11 287.53 101.839 280.332 103.674 280.312C104.366 280.305 105.896 280.04 107.074 279.725C108.94 279.224 109.303 279.672 109.901 283.206C111.247 291.179 117.477 297.283 126.155 299.134C128.732 299.684 130.951 300.023 131.086 299.887C131.221 299.753 130.004 296.53 128.383 292.727C124.533 283.699 124.465 279.841 128.122 277.997C129.63 277.236 132.885 276.305 135.354 275.929C137.822 275.552 149.941 273.058 162.283 270.385C183.271 265.841 195.803 263.615 212.652 261.443C219.478 260.563 219.685 260.602 221.934 263.203C225.415 267.229 228.99 274.683 230.244 280.533L231.367 285.772L235.22 281.431C239.626 276.465 241.393 271.116 240.914 264.195C240.655 260.472 240.919 259.351 242.076 259.253C242.898 259.184 248.509 258.847 254.543 258.506L265.515 257.884L265.837 254.516C266.013 252.663 265.777 250.766 265.311 250.3C264.844 249.833 261.333 250.525 257.508 251.838C251.334 253.956 241.583 255.901 226.877 257.948C222.808 258.515 222.07 258.348 221.568 256.749C219.611 250.518 212.025 238.435 210.069 238.435C209.696 238.435 209.09 240.792 208.723 243.671Z"
				fill="#626464"
			/>
			<path
				fill-rule="evenodd"
				clipRule="evenodd"
				d="M198.19 168.288C195.173 168.454 189.925 168.852 186.529 169.174C180.783 169.719 180.326 169.945 179.946 172.429C179.58 174.825 179.523 174.767 179.389 171.858C179.25 168.847 178.991 168.616 175.748 168.616C173.828 168.616 172.257 169.12 172.257 169.735C172.257 170.523 171.827 170.497 170.803 169.648C169.657 168.697 165.782 168.882 152.554 170.523C143.317 171.668 135.219 172.606 134.559 172.606C133.898 172.606 133.359 173.334 133.359 174.224C133.359 175.548 133.088 175.617 131.866 174.604C130.145 173.175 109.824 174.139 108.864 175.694C108.556 176.19 105.782 176.595 102.698 176.595C99.6127 176.595 93.2433 177.023 88.5435 177.547C83.8427 178.07 75.5154 178.984 70.0377 179.578C64.559 180.171 59.6497 181.085 59.1271 181.607C57.4814 183.253 63.9446 206.74 68.6782 216.317C74.0193 227.122 85.661 239.366 94.9588 243.957C100.698 246.792 101.494 246.913 114.408 246.911C124.94 246.909 129.068 246.502 133.359 245.043C141.313 242.337 152.012 236.568 155.645 233.025L158.793 229.957L161.831 233.946C164.808 237.855 165.009 237.942 171.805 238.223C175.62 238.381 180.483 238.148 182.614 237.704C186.087 236.981 186.891 236.184 190.434 229.939C194.934 222.007 195.488 221.515 199.935 221.494C201.718 221.486 203.177 221.364 203.177 221.223C203.177 221.082 202.753 219.487 202.234 217.679L201.291 214.391L205.975 215.154C208.55 215.574 213.693 215.881 217.402 215.838C225.938 215.735 235.236 211.484 240.61 205.229C245.61 199.41 250.611 188.514 252.476 179.38C255.019 166.916 255.321 167.486 246.357 167.826C239.14 168.1 238.622 168.27 237.898 170.611C237.145 173.045 237.134 173.039 237.468 170.362L237.81 167.619H229.021C221.743 167.619 220.039 167.919 219.109 169.364C218.041 171.027 218.013 171.027 218.53 169.364C219.018 167.795 218.294 167.638 211.375 167.803C207.14 167.905 201.207 168.122 198.19 168.288ZM200.876 173.335C200.623 174.305 200.399 173.753 200.379 172.107C200.359 170.461 200.566 169.667 200.839 170.343C201.112 171.018 201.129 172.364 200.876 173.335ZM152.97 174.85C152.693 175.536 152.467 174.975 152.467 173.603C152.467 172.232 152.693 171.671 152.97 172.356C153.247 173.043 153.247 174.165 152.97 174.85ZM217.141 175.975C217.141 176.182 216.356 176.967 215.395 177.721C213.813 178.96 213.778 178.925 215.018 177.344C216.322 175.682 217.141 175.154 217.141 175.975ZM131.354 182.302C130.277 183.981 130.247 183.978 130.789 182.249C131.106 181.244 131.425 179.449 131.5 178.259C131.635 176.099 131.636 176.099 132.064 178.312C132.3 179.531 131.98 181.326 131.354 182.302ZM236.772 178.778C236.454 179.573 236.218 179.336 236.17 178.174C236.127 177.123 236.363 176.535 236.694 176.866C237.025 177.197 237.061 178.058 236.772 178.778ZM153.967 181.832C153.691 182.518 153.464 181.957 153.464 180.585C153.464 179.214 153.691 178.653 153.967 179.338C154.244 180.025 154.244 181.147 153.967 181.832ZM209.888 180.19C209.557 180.521 208.697 180.557 207.977 180.269C207.182 179.951 207.418 179.714 208.58 179.666C209.631 179.624 210.22 179.859 209.888 180.19ZM80.1803 182.767C79.8621 183.562 79.6257 183.326 79.5778 182.164C79.535 181.113 79.7703 180.524 80.1015 180.855C80.4326 181.187 80.4685 182.047 80.1803 182.767ZM112.541 185.323C113.781 186.905 113.746 186.94 112.164 185.7C110.502 184.396 109.975 183.577 110.796 183.577C111.002 183.577 111.788 184.362 112.541 185.323ZM130.367 184.952C130.367 185.158 129.582 185.944 128.621 186.697C127.039 187.937 127.004 187.902 128.244 186.32C129.548 184.659 130.367 184.131 130.367 184.952ZM180.918 186.757C180.6 187.552 180.363 187.316 180.316 186.154C180.273 185.102 180.508 184.514 180.839 184.845C181.17 185.176 181.206 186.037 180.918 186.757ZM81.1777 188.752C80.8595 189.547 80.6231 189.31 80.5753 188.148C80.5324 187.097 80.7677 186.509 81.0989 186.84C81.43 187.171 81.4659 188.032 81.1777 188.752ZM186.72 197.541C187.712 198.638 188.301 199.536 188.026 199.536C187.752 199.536 186.715 198.638 185.722 197.541C184.73 196.444 184.142 195.546 184.416 195.546C184.69 195.546 185.727 196.444 186.72 197.541ZM176.654 199.037C178.248 201.47 178.226 201.531 175.771 201.531C173.996 201.531 173.255 200.992 173.255 199.702C173.255 198.146 174.04 196.544 174.803 196.544C174.923 196.544 175.755 197.666 176.654 199.037ZM227.115 197.918C227.115 198.125 226.329 198.911 225.369 199.664C223.787 200.903 223.752 200.868 224.992 199.287C226.296 197.625 227.115 197.097 227.115 197.918ZM153.988 201.718C153.67 202.513 153.434 202.277 153.386 201.115C153.343 200.063 153.578 199.475 153.909 199.806C154.24 200.137 154.276 200.998 153.988 201.718ZM168.995 202.133C168.664 202.464 167.803 202.5 167.084 202.212C166.288 201.894 166.524 201.657 167.686 201.609C168.738 201.567 169.326 201.802 168.995 202.133ZM183.956 202.133C183.625 202.464 182.764 202.5 182.045 202.212C181.249 201.894 181.485 201.657 182.647 201.609C183.699 201.567 184.287 201.802 183.956 202.133ZM212.881 204.128C212.55 204.459 211.689 204.495 210.97 204.207C210.174 203.889 210.41 203.652 211.572 203.604C212.623 203.561 213.212 203.797 212.881 204.128ZM197.691 208.513C198.684 209.61 199.272 210.507 198.998 210.507C198.724 210.507 197.686 209.61 196.694 208.513C195.701 207.415 195.113 206.518 195.387 206.518C195.662 206.518 196.699 207.415 197.691 208.513ZM94.4601 216.991C96.3212 218.911 97.6189 220.481 97.3446 220.481C97.0703 220.481 95.3238 218.911 93.4627 216.991C91.6015 215.071 90.3039 213.5 90.5782 213.5C90.8525 213.5 92.5989 215.071 94.4601 216.991ZM146.325 217.866C146.325 218.073 145.54 218.859 144.58 219.612C142.998 220.852 142.963 220.817 144.203 219.235C145.506 217.573 146.325 217.045 146.325 217.866ZM156.427 226.217C157.666 227.798 157.632 227.833 156.05 226.594C154.388 225.29 153.86 224.471 154.681 224.471C154.888 224.471 155.674 225.256 156.427 226.217ZM124.151 227.179C122.652 227.406 119.959 227.41 118.166 227.189C116.374 226.967 117.6 226.78 120.891 226.775C124.183 226.769 125.65 226.951 124.151 227.179ZM209.104 241.178C209.048 243.872 206.19 255.289 204.758 258.546C204.304 259.576 204.527 260.367 205.348 260.635C206.073 260.872 205.476 260.885 204.02 260.663C202.564 260.443 201.078 260.736 200.719 261.316C199.893 262.656 202.032 262.651 211.808 261.29L219.587 260.209L221.911 263.036C225.503 267.407 229.007 274.764 230.244 280.533L231.368 285.772L235.221 281.431C239.645 276.444 241.331 271.311 240.941 264.008L240.667 258.882L252.831 258.601C264.829 258.325 265.002 258.288 265.61 255.862C265.951 254.508 265.95 252.675 265.609 251.788C264.932 250.022 264.635 250.059 253.753 253.281C246.547 255.416 219.172 259.75 218.316 258.893C218.035 258.612 218.746 258.383 219.897 258.383C221.724 258.383 221.885 258.022 221.17 255.529C220.72 253.961 219.795 251.605 219.114 250.293C217.26 246.719 210.86 238.435 209.954 238.435C209.518 238.435 209.135 239.67 209.104 241.178ZM214.398 260.041C213.713 260.318 212.59 260.318 211.904 260.041C211.219 259.764 211.78 259.538 213.151 259.538C214.522 259.538 215.084 259.764 214.398 260.041ZM230.375 260.035C229.7 260.308 228.353 260.325 227.383 260.072C226.412 259.818 226.965 259.595 228.611 259.575C230.256 259.555 231.05 259.761 230.375 260.035ZM194.45 263.06C195.41 263.311 196.98 263.311 197.941 263.06C198.901 262.81 198.115 262.604 196.195 262.604C194.275 262.604 193.489 262.81 194.45 263.06ZM166.772 266.43C98.3919 276.238 79.2936 276.824 69.8602 269.403C67.242 267.345 67.0315 267.324 65.8047 269C65.0936 269.974 64.6617 271.237 64.8462 271.808C65.3938 273.505 71.7203 276.099 78.5735 277.436C86.04 278.892 86.7631 279.447 88.3091 284.92C90.4834 292.611 100.124 301.272 106.514 301.272C108.915 301.272 108.867 300.841 105.565 292.794C104.439 290.051 103.259 286.145 102.943 284.115L102.367 280.424L96.6683 280.065C92.5391 279.804 93.4876 279.654 100.107 279.517L109.246 279.329L109.916 283.295C111.247 291.178 117.516 297.292 126.156 299.134C128.732 299.684 130.949 300.024 131.083 299.89C131.216 299.757 129.962 296.399 128.293 292.43C124.721 283.927 124.743 279.788 128.372 277.862C129.743 277.135 138.944 274.851 148.819 272.788C186.707 264.87 192.611 263.537 189.712 263.553C188.066 263.562 177.743 264.856 166.772 266.43ZM125.109 277.936C124.778 278.267 123.917 278.303 123.198 278.015C122.402 277.697 122.639 277.46 123.801 277.413C124.852 277.37 125.44 277.605 125.109 277.936ZM117.65 278.991C116.964 279.269 115.842 279.269 115.156 278.991C114.471 278.715 115.032 278.489 116.403 278.489C117.774 278.489 118.336 278.715 117.65 278.991Z"
				fill="#292B2B"
			/>
			<path
				fill-rule="evenodd"
				clipRule="evenodd"
				d="M202.156 168.263C199.819 168.897 200.824 176.231 203.505 178.11C208.861 181.861 216.523 178.313 218.085 171.359L218.925 167.619L211.301 167.734C207.107 167.798 202.991 168.036 202.156 168.263ZM238.689 168.446C238.409 168.9 237.686 172.379 237.085 176.176C235.014 189.232 228.752 198.966 220.335 202.214C216.927 203.529 212.918 204.024 205.67 204.024C196.538 204.024 195.294 203.788 190.937 201.226C183.506 196.859 181.226 192.548 180.186 180.903C179.704 175.517 179.294 170.549 179.275 169.863C179.23 168.292 172.257 168.165 172.257 169.735C172.257 170.527 171.835 170.504 170.814 169.657C169.844 168.853 167.472 168.666 163.583 169.089C152.33 170.313 153.379 168.534 154.01 185.323C154.353 194.451 154.16 201.478 153.499 203.837C152.915 205.928 152.744 207.476 153.12 207.277C158.826 204.258 164.222 202.323 168.269 201.843C172.189 201.379 173.255 200.868 173.255 199.456C173.255 196.618 174.89 196.344 176.564 198.901C177.674 200.595 179.41 201.42 182.859 201.893C189.711 202.831 196.011 206.218 199.049 210.594C202.053 214.921 205.749 215.977 217.402 215.838C225.938 215.735 235.236 211.484 240.61 205.229C245.61 199.41 250.611 188.514 252.476 179.38C254.988 167.071 255.26 167.619 246.623 167.619C242.54 167.619 238.971 167.991 238.689 168.446ZM114.606 174.34C108.476 174.767 107.676 175.866 109.798 180.945C112.66 187.794 122.256 190.811 127.66 186.559C130.098 184.642 132.895 176.271 131.729 174.384C131.256 173.62 125.18 173.604 114.606 174.34ZM66.5328 179.761C62.9671 180.27 59.6278 181.107 59.1131 181.622C57.4823 183.252 63.9734 206.798 68.6782 216.317C74.0193 227.122 85.661 239.366 94.9588 243.957C100.698 246.792 101.494 246.913 114.408 246.911C124.997 246.909 129.045 246.507 133.359 245.027C144.552 241.186 158.294 232.926 158.294 230.04C158.294 229.269 156.899 227.464 155.195 226.031C152.678 223.914 151.461 223.543 148.715 224.057C145.342 224.691 145.335 224.685 145.985 221.434L146.636 218.176L142.242 221.18C135.468 225.808 130.99 226.946 119.75 226.892C110.416 226.848 109.126 226.595 103.097 223.626C91.1028 217.722 84.6366 207.633 81.1038 189.312L79.0362 178.59L76.0261 178.713C74.3704 178.781 70.0985 179.253 66.5328 179.761ZM208.378 245.368C206.862 254.211 204.408 260.378 202.404 260.378C201.549 260.378 201.055 260.583 201.306 260.835C201.557 261.085 206.008 260.644 211.197 259.855C216.386 259.065 220.937 258.411 221.31 258.401C222.127 258.379 220.834 253.605 219.114 250.293C217.474 247.131 210.904 238.435 210.157 238.435C209.833 238.435 209.033 241.555 208.378 245.368ZM225.789 260.098L219.975 260.483L222.404 263.671C226.131 268.568 229.002 274.738 230.242 280.522L231.368 285.772L235.22 281.431C239.595 276.501 241.32 271.363 240.882 264.565L240.58 259.879L236.091 259.796C233.623 259.75 228.987 259.886 225.789 260.098ZM117.65 278.66C113.01 279.224 109.423 280.132 109.427 280.741C109.461 287.362 115.262 295.361 121.686 297.647C126.139 299.231 131.364 300.51 131.364 300.015C131.364 299.851 130.029 296.589 128.399 292.765C124.984 284.757 124.554 279.909 127.125 278.411C129.145 277.235 129.465 277.226 117.65 278.66ZM87.6608 283.089C89.0471 288.204 91.798 292.456 96.417 296.631C100.078 299.938 106.701 302.33 108.159 300.871C108.511 300.519 107.794 298.162 106.567 295.633C105.338 293.105 103.903 288.772 103.379 286.006C102.854 283.24 102.317 280.894 102.183 280.791C102.049 280.688 98.5005 280.326 94.2965 279.987L86.6524 279.369L87.6608 283.089Z"
				fill="white"
			/>
			<path
				fill-rule="evenodd"
				clipRule="evenodd"
				d="M205.938 168.342C207.73 168.563 210.423 168.559 211.922 168.332C213.421 168.103 211.954 167.922 208.663 167.928C205.371 167.933 204.145 168.119 205.938 168.342ZM251.863 168.3C252.582 168.588 253.443 168.552 253.774 168.221C254.105 167.89 253.517 167.655 252.466 167.698C251.304 167.745 251.067 167.982 251.863 168.3ZM165.089 169.297C165.808 169.586 166.669 169.55 167 169.219C167.331 168.887 166.743 168.652 165.692 168.695C164.53 168.743 164.293 168.979 165.089 169.297ZM156.113 170.295C156.832 170.583 157.692 170.547 158.024 170.216C158.355 169.885 157.766 169.649 156.715 169.692C155.553 169.74 155.317 169.977 156.113 170.295ZM253.126 172.19C253.174 173.352 253.41 173.588 253.728 172.793C254.017 172.073 253.981 171.212 253.65 170.881C253.318 170.55 253.083 171.139 253.126 172.19ZM120.206 174.284C120.925 174.573 121.786 174.537 122.117 174.206C122.448 173.875 121.86 173.639 120.808 173.682C119.646 173.73 119.41 173.966 120.206 174.284ZM110.232 175.282C110.951 175.57 111.812 175.534 112.143 175.203C112.474 174.872 111.886 174.637 110.834 174.679C109.672 174.727 109.436 174.964 110.232 175.282ZM179.434 177.094C179.454 178.74 179.677 179.292 179.93 178.322C180.184 177.351 180.167 176.005 179.894 175.33C179.62 174.654 179.414 175.448 179.434 177.094ZM73.3281 179.271C74.0472 179.56 74.908 179.524 75.2391 179.193C75.5703 178.862 74.9818 178.626 73.9305 178.669C72.7686 178.717 72.5322 178.953 73.3281 179.271ZM65.3489 180.269C66.068 180.557 66.9288 180.521 67.2599 180.19C67.591 179.859 67.0026 179.624 65.9513 179.666C64.7893 179.714 64.553 179.951 65.3489 180.269ZM154.623 191.557C154.623 195.122 154.805 196.581 155.025 194.798C155.247 193.016 155.247 190.097 155.025 188.315C154.805 186.533 154.623 187.991 154.623 191.557ZM173.255 196.602C173.255 197.183 173.704 197.381 174.252 197.042C174.801 196.703 175.25 196.228 175.25 195.986C175.25 195.744 174.801 195.546 174.252 195.546C173.704 195.546 173.255 196.022 173.255 196.602ZM238.522 206.767L235.593 210.009L238.834 207.079C241.855 204.348 242.534 203.525 241.763 203.525C241.592 203.525 240.133 204.985 238.522 206.767ZM202.94 205.228C204.18 205.466 205.976 205.457 206.929 205.208C207.883 204.959 206.867 204.763 204.673 204.774C202.479 204.785 201.699 204.99 202.94 205.228ZM214.398 216.182C215.358 216.433 216.928 216.433 217.889 216.182C218.849 215.931 218.063 215.726 216.143 215.726C214.223 215.726 213.437 215.931 214.398 216.182ZM144.954 219.283C144.683 219.72 144.874 220.73 145.378 221.527C146.094 222.658 146.298 222.483 146.31 220.731C146.325 218.424 145.818 217.882 144.954 219.283ZM150.128 224.155C150.847 224.443 151.708 224.407 152.039 224.076C152.37 223.745 151.782 223.51 150.731 223.552C149.569 223.6 149.332 223.837 150.128 224.155ZM113.224 227.147C113.943 227.435 114.804 227.399 115.135 227.068C115.466 226.737 114.878 226.502 113.827 226.545C112.665 226.593 112.428 226.829 113.224 227.147ZM209.161 239.266C209.161 239.723 209.815 240.098 210.614 240.098C211.413 240.098 211.834 239.723 211.552 239.266C211.27 238.809 210.617 238.435 210.1 238.435C209.583 238.435 209.161 238.809 209.161 239.266ZM232.37 260.072C233.34 260.325 234.687 260.308 235.362 260.035C236.037 259.761 235.243 259.555 233.598 259.575C231.952 259.595 231.399 259.818 232.37 260.072ZM201.993 261.059C202.712 261.347 203.573 261.311 203.904 260.98C204.235 260.649 203.647 260.414 202.595 260.457C201.434 260.505 201.197 260.741 201.993 261.059ZM220.944 261.059C221.663 261.347 222.524 261.311 222.855 260.98C223.186 260.649 222.597 260.414 221.546 260.457C220.384 260.505 220.148 260.741 220.944 261.059ZM125.38 278.3C125.38 278.831 126.053 279.007 126.876 278.692C127.699 278.376 128.372 277.941 128.372 277.726C128.372 277.51 127.699 277.334 126.876 277.334C126.053 277.334 125.38 277.769 125.38 278.3ZM89.2865 280.01C90.0057 280.298 90.8664 280.262 91.1976 279.931C91.5287 279.6 90.9402 279.365 89.889 279.407C88.727 279.455 88.4906 279.692 89.2865 280.01ZM110.232 280.01C110.951 280.298 111.812 280.262 112.143 279.931C112.474 279.6 111.886 279.365 110.834 279.407C109.672 279.455 109.436 279.692 110.232 280.01Z"
				fill="#BCBCBC"
			/>
		</svg>
	);
}
