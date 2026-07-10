import type { ScrollViewProps } from "react-native";
import { styled } from "react-native-css";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { type Edge, SafeAreaView } from "react-native-safe-area-context";

import { classnames } from "@/helpers";

// @ts-expect-error TS2590: styled(KeyboardAwareScrollView) produces a union type too complex to represent
const StyledScrollView = styled(KeyboardAwareScrollView);
const StyledSafeAreaView = styled(SafeAreaView);

export interface PageProps extends ScrollViewProps {
	edges?: Edge[];
}

export function Page({
	children,
	className,
	contentContainerClassName,
	edges = ["bottom"],
	...rest
}: PageProps) {
	return (
		<StyledScrollView
			bottomOffset={62}
			alwaysBounceVertical={false}
			className={classnames("flex-1", className)}
			contentContainerClassName={"grow"}
			{...rest}
		>
			<StyledSafeAreaView
				edges={edges}
				className={classnames("flex-1 gap-4 p-6", contentContainerClassName)}
			>
				{children}
			</StyledSafeAreaView>
		</StyledScrollView>
	);
}
