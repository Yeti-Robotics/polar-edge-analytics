import { signInDevelopment, signUpDevelopment } from "@/lib/actions/auth";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/lib/components/ui/tabs";
import { redirect } from "next/navigation";

export default function DevelopmentLoginPage() {
	if (process.env.NODE_ENV !== "development") {
		redirect("/404");
	}

	return (
		<main className="grid grid-cols-1 sm:grid-cols-2">
			<div className="from-primary hidden bg-gradient-to-br from-20% via-fuchsia-500 to-orange-400 sm:block "></div>
			<div className="prose dark:prose-invert flex min-h-screen flex-col items-center justify-center p-4">
				<div>
					<h1 className="mb-2 text-center text-xl sm:text-3xl">
						Development Login
					</h1>
					<p className="mt-2 text-center text-sm">
						Auth for development.
					</p>
				</div>
				<Tabs
					className="flex min-h-64 w-3/4 flex-col items-center justify-start"
					defaultValue="login"
				>
					<TabsList className="mb-2 w-fit">
						<TabsTrigger value="login">Login</TabsTrigger>
						<TabsTrigger value="signup">Sign Up</TabsTrigger>
					</TabsList>
					<TabsContent value="login" className="w-full max-w-[280px]">
						<form
							action={signInDevelopment}
							className="flex flex-col justify-center gap-y-4"
						>
							<Input
								name="email"
								className="w-full"
								placeholder="Username"
								type="email"
							/>
							<Input
								name="password"
								className="w-full"
								placeholder="Password"
								type="password"
							/>
							<Button type="submit">Log in</Button>
						</form>
					</TabsContent>
					<TabsContent
						value="signup"
						className="w-full max-w-[280px]"
					>
						<form
							className="flex flex-col justify-center gap-y-4"
							action={signUpDevelopment}
						>
							<Input
								required
								name="email"
								className="w-full"
								placeholder="Username"
								type="email"
							/>
							<Input
								required
								name="password"
								className="w-full"
								placeholder="Password"
								type="password"
							/>
							<Button type="submit">Log in</Button>
						</form>
					</TabsContent>
				</Tabs>
			</div>
		</main>
	);
}
