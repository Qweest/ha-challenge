import type { ScrollViewProps } from "react-native";
import { styled } from "react-native-css";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { type Edge, SafeAreaView } from "react-native-safe-area-context";

import { classnames } from "@/utils/helpers";

// @ts-expect-error TS2590: styled(KeyboardAwareScrollView) produces a union type too complex to represent
const ScrollView = styled(KeyboardAwareScrollView);

export interface PageProps extends ScrollViewProps {
	contentClassName?: string;
	edges?: Edge[];
}

export function Page({
	children,
	className,
	contentContainerClassName,
	contentClassName,
	edges,
	...props
}: PageProps) {
	return (
		<ScrollView
			bottomOffset={62}
			alwaysBounceVertical={false}
			className={classnames("flex-1 bg-zinc-950", className)}
			contentContainerClassName={classnames("grow", contentContainerClassName)}
			{...props}
		>
			<SafeAreaView
				edges={edges}
				className={classnames("grow gap-4 px-5 py-6", contentClassName)}
			>
				{children}
			</SafeAreaView>
		</ScrollView>
	);
}
