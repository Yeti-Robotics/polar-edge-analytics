import { DevToolsContainer } from "./DevToolsContainer";

import { Button } from "@repo/ui/components/button";
import {
	Drawer,
	DrawerContent,
	DrawerTitle,
	DrawerTrigger,
} from "@repo/ui/components/drawer";
import { WrenchIcon } from "lucide-react";
import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
} from "@repo/ui/components/tabs";
import { auth } from "@/lib/auth";

function SessionStatus({ isActive }: { isActive: boolean }) {
	return (
		<span
			className={`font-medium ${isActive ? "text-green-500" : "text-red-500"}`}
		>
			{isActive ? "Active" : "Inactive"}
		</span>
	);
}

function UserInfoCard({
	user,
}: {
	user: NonNullable<Awaited<ReturnType<typeof auth>>>["user"];
}) {
	return (
		<div className="space-y-2">
			<h3 className="text-sm font-medium leading-none">User</h3>
			<div className="rounded-lg border p-4 space-y-3">
				<div>
					<div className="font-medium">{user.name}</div>
					<div className="text-sm text-muted-foreground break-all">
						ID: {user.id}
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
					<div>
						<div className="font-medium">Role</div>
						<div className="text-muted-foreground">{user.role}</div>
					</div>
					<div>
						<div className="font-medium">Guild Nickname</div>
						<div className="text-muted-foreground break-all">
							{user.guildNickname}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function RawDataViewer({ data }: { data: unknown }) {
	return (
		<div className="space-y-2">
			<h3 className="text-sm font-medium leading-none">
				Raw Session Data
			</h3>
			<div className="h-[300px] overflow-auto">
				<pre className="rounded-lg border bg-muted/50 p-4 text-sm font-mono whitespace-pre overflow-x-auto">
					{JSON.stringify(data, null, 2)}
				</pre>
			</div>
		</div>
	);
}

async function SessionTool() {
	const session = await auth();

	return (
		<TabsContent value="session" className="mt-0 border-none">
			<div className="space-y-6 min-w-0">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
					<h2 className="text-lg font-semibold leading-none tracking-tight">
						Session Info
					</h2>
					<div className="text-sm text-muted-foreground whitespace-nowrap">
						Status: <SessionStatus isActive={!!session} />
					</div>
				</div>

				{session?.user && (
					<div className="space-y-4 min-w-0">
						<UserInfoCard user={session.user} />
						<RawDataViewer data={session} />
					</div>
				)}

				{!session && (
					<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
						<div className="text-sm text-destructive">
							No active session found
						</div>
					</div>
				)}
			</div>
		</TabsContent>
	);
}

export function DevTools() {
	return (
		<DevToolsContainer>
			<div className="fixed bottom-4 right-4 z-50">
				<Drawer>
					<DrawerTitle className="sr-only">DevTools</DrawerTitle>
					<DrawerTrigger asChild>
						<Button
							variant="default"
							className="size-16 p-0 [&_svg]:size-8 rounded-full shadow-lg hover:shadow-xl shadow-black/40 hover:shadow-black/25 transition-all duration-300"
						>
							<WrenchIcon className="text-white" />
							<span className="sr-only">Open DevTools</span>
						</Button>
					</DrawerTrigger>
					<DrawerContent className="max-h-[85vh]">
						<div className="h-full flex flex-col">
							<div className="flex-1 min-h-0">
								<Tabs
									defaultValue="session"
									orientation="vertical"
									className="flex h-full divide-x"
								>
									<div className="w-40 shrink-0">
										<div className="p-1">
											<TabsList className="flex flex-col h-auto space-y-2 bg-transparent">
												<TabsTrigger
													value="session"
													className="w-full justify-start data-[state=active]:bg-muted/80"
												>
													Session
												</TabsTrigger>
											</TabsList>
										</div>
									</div>
									<div className="flex-1 min-w-0 overflow-auto">
										<div className="p-4">
											<SessionTool />
										</div>
									</div>
								</Tabs>
							</div>
						</div>
					</DrawerContent>
				</Drawer>
			</div>
		</DevToolsContainer>
	);
}
