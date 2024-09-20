import { TabsContent } from "../../ui/tabs";

export function TabsContentForceMount({
	value,
	children,
	activeTab,
}: {
	value: string;
	children: React.ReactNode;
	activeTab: string;
}) {
	return (
		<TabsContent value={value} forceMount hidden={value !== activeTab}>
			{children}
		</TabsContent>
	);
}
