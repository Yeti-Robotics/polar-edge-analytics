export const prettyPrint = (string: string) =>
	string
		.split("_")
		.map((s) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`)
		.join(" ");

export const pascalToSpace = (string: string) => {
	return string.replace(/([A-Z])/g, ' $1');
}