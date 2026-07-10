import { ScrollView, type ScrollViewProps } from "react-native";

export function Page({
	children,
	className,
	contentContainerClassName,
	...props
}: ScrollViewProps) {
	return (
		<ScrollView
			{...props}
			contentInsetAdjustmentBehavior="automatic"
			className={`flex-1 bg-zinc-950 ${className ?? ""}`}
			contentContainerClassName={`flex-grow gap-4 px-5 py-6 ${contentContainerClassName ?? ""}`}
		>
			{children}
		</ScrollView>
	);
}
