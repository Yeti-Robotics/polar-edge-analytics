import { CounterInput } from "@/lib/components/forms/counter-input";
import { Label } from "@/lib/components/ui/label";
import { TabsContent, TabsList, TabsTrigger } from "@/lib/components/ui/tabs";
import { Button } from "@/lib/components/ui/button";
import { ForceMountTabs } from "@/lib/components/forms/force-mount-tabs";

export default function ScoutingPage() {
	return (
		<form
			action={async (d) => {
				"use server";
				console.log(d);
			}}
		>
			<ForceMountTabs defaultValue="account" className="max-w-[400px]">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="account">Account</TabsTrigger>
					<TabsTrigger value="password">Password</TabsTrigger>
				</TabsList>
				<TabsContent value="account">
					<div className="space-y-2">
						<Label htmlFor="speaker_auto">Speaker Auto</Label>
						<CounterInput name="speaker_auto" />
					</div>
				</TabsContent>
				<TabsContent value="password">
					<div className="space-y-2">
						<Label htmlFor="speaker_teleop">Speaker Teleop</Label>
						<CounterInput name="speaker_teleop" />
					</div>
				</TabsContent>
				<Button type="submit" className="mt-4 w-full">
					Submit
				</Button>
			</ForceMountTabs>
		</form>
	);
}
