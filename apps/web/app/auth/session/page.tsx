import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function SessionPage() {
	if (process.env.NODE_ENV !== "development") {
		return notFound();
	}

	const session = await auth();

	return (
		<div className="min-h-screen bg-gray-50 py-8 px-4">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-2xl font-bold text-gray-900 mb-6">
					Session Information
				</h1>
				<div className="bg-white shadow rounded-lg overflow-hidden">
					<div className="px-6 py-5 border-b border-gray-200">
						<h2 className="text-lg font-medium text-gray-900">
							Active Session Details
						</h2>
					</div>
					<div className="px-6 py-5">
						{session ? (
							<div className="space-y-4">
								{Object.entries(session).map(([key, value]) => (
									<div
										key={key}
										className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
									>
										<h3 className="text-sm font-medium text-gray-500 mb-1">
											{key}
										</h3>
										<pre className="text-sm text-gray-900 whitespace-pre-wrap break-words bg-gray-50 p-3 rounded">
											{JSON.stringify(value, null, 2)}
										</pre>
									</div>
								))}
							</div>
						) : (
							<div className="text-gray-500 text-sm">
								No active session found
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
