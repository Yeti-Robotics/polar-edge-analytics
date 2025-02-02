import { TabsContent } from "@repo/ui/components/tabs";

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
