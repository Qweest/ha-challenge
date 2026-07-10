import type { ScrollViewProps } from "react-native";
import { styled } from "react-native-css";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { classnames } from "@/helpers";

// @ts-expect-error TS2590: styled(KeyboardAwareScrollView) produces a union type too complex to represent
const StyledScrollView = styled(KeyboardAwareScrollView);

export interface PageProps extends ScrollViewProps {}

export function Page({
	children,
	className,
	contentContainerClassName,
	...rest
}: PageProps) {
	return (
		<StyledScrollView
			bottomOffset={62}
			alwaysBounceVertical={false}
			keyboardShouldPersistTaps="handled"
			contentInsetAdjustmentBehavior="always"
			className={classnames("flex-1", className)}
			contentContainerClassName={classnames(
				"gap-4 p-6",
				contentContainerClassName,
			)}
			{...rest}
		>
			{children}
		</StyledScrollView>
	);
}
