import type { ScrollViewProps } from "react-native";
import { styled } from "react-native-css";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

import { classnames } from "@/helpers";

// @ts-expect-error TS2590: styled(KeyboardAwareScrollView) produces a union type too complex to represent
const StyledScrollView = styled(KeyboardAwareScrollView);
const StyledSafeAreaView = styled(SafeAreaView);

export function Page({
	children,
	className,
	contentContainerClassName,
	...rest
}: ScrollViewProps) {
	return (
		<StyledScrollView
			bottomOffset={64}
			alwaysBounceVertical={false}
			keyboardShouldPersistTaps="handled"
			className={classnames("flex-1", className)}
			contentContainerClassName="grow"
			{...rest}
		>
			<StyledSafeAreaView
				edges={["bottom"]}
				className={classnames("flex-1 p-6 gap-4", contentContainerClassName)}
			>
				{children}
			</StyledSafeAreaView>
		</StyledScrollView>
	);
}
