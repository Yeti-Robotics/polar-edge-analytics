"use client";

import { HTMLAttributes, ReactElement, useState } from "react";
import { Tabs, TabsContent } from "../../ui/tabs";
import {
	TabsContentProps,
	TabsListProps,
	TabsProps,
} from "@radix-ui/react-tabs";

type TabsP = TabsProps & HTMLAttributes<HTMLDivElement>;

interface ForceMountTabsProps extends TabsP {
	defaultValue: string;
	children: ReactElement<TabsContentProps>[];
}

export function ForceMountTabs({
	defaultValue,
	children,
	...props
}: ForceMountTabsProps) {
	const [activeTab, setActiveTab] = useState<string>(defaultValue);

	return (
		<Tabs
			defaultValue={defaultValue}
			onValueChange={setActiveTab}
			{...props}
		>
			{children?.map((child, i) => {
				const display = (
					child.type as React.ComponentType<
						TabsContentProps | TabsListProps
					>
				).displayName;
				if (display !== "TabsContent") return child;
				return (
					<TabsContent
						key={i}
						value={child.props.value}
						forceMount
						hidden={activeTab !== child.props.value}
					>
						{child.props.children}
					</TabsContent>
				);
			})}
		</Tabs>
	);
}
