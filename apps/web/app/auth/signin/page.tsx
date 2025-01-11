import { signIn } from "../auth";

export default function SignInPage() {
	return (
		<>
			<form
				action={async () => {
					"use server";
					await signIn("discord", { redirectTo: "/scout" });
				}}
			>
				<button type="submit">Sign in With Discord</button>
			</form>
		</>
	);
}
