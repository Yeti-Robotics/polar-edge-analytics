import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ui/components/dialog";

/**
 * CoralInput component provides a dialog interface for inputting coral-related data
 * in both autonomous and teleop periods. It uses a dialog to display input fields
 * for different coral levels (trough, low, mid, high).
 *
 * The component integrates with the form schema defined in ../data/schema.ts,
 * which validates coral inputs as non-negative integers for each level and period.
 *
 * @component
 * @example
 * ```tsx
 * <CoralInput period="auto" />
 * ```
 */

export function CoralInput({ period }: { period: "auto" | "teleop" }) {
	return (
		<Dialog>
			<DialogTrigger>Do the coral nOW!</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Do the coral NOW!</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
