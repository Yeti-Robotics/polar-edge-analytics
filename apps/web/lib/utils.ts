export function getNodeEnv() {
	return process.env.NODE_ENV;
}

export const prettyPrint = (string: string) =>
	string
		.split("_")
		.map((s) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`)
		.join(" ");
