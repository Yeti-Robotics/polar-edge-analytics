import { HTMLAttributes, ReactElement } from "react";
import { Tabs, TabsContent } from "../../ui/tabs";
import { TabsProps } from "@radix-ui/react-tabs";

type TabsP = TabsProps & HTMLAttributes<HTMLDivElement>;

interface ForceMountTabsProps extends TabsP {
	defaultValue: string;
	children: ReactElement[];
}

/**
 * Force mounts all children that are instances of TabsContent
 * @param children - The children of the ForceMountTabs component
 * @returns Children with TabsContent components forced to be mounted
 */
function forceMountAllTabsContentChildren(children: ReactElement[]) {
	return children?.map((child, i) => {
		if (child.type !== TabsContent) return child;
		return (
			<TabsContent
				{...child.props}
				key={i}
				value={child.props.value}
				forceMount
				className="data-[state=inactive]:hidden"
			>
				{child.props.children}
			</TabsContent>
		);
	});
}

/**
 * Extension of shadcn tabs built for multi-tabbed forms, forces TabsContent
 * to be mounted so you don't have to worry about it!
 *
 * Only downside is it can't be wrapped in a component.
 *
 * Oh...and it all works with RSC.
 * */
export function ForceMountTabs({
	defaultValue,
	children,
	...props
}: ForceMountTabsProps) {
	return (
		<Tabs defaultValue={defaultValue} {...props}>
			{forceMountAllTabsContentChildren(children)}
		</Tabs>
	);
}
