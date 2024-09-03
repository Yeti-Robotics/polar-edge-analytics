import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getNodeEnv() {
	return process.env.NODE_ENV;
}

export const prettyPrint = (string: string) =>
	string
		.split("_")
		.map((s) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`)
		.join(" ");
