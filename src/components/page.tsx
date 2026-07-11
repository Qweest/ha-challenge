import { ScrollView, type ScrollViewProps } from "react-native";

import { classnames } from "@/helpers";

export interface PageProps extends ScrollViewProps {}

export function Page({
	children,
	className,
	contentContainerClassName,
	...rest
}: PageProps) {
	return (
		<ScrollView
			alwaysBounceVertical={false}
			keyboardShouldPersistTaps="handled"
			contentInsetAdjustmentBehavior="automatic"
			className={classnames("flex-1", className)}
			contentContainerClassName={classnames(
				"gap-4 p-6",
				contentContainerClassName,
			)}
			{...rest}
		>
			{children}
		</ScrollView>
	);
}
