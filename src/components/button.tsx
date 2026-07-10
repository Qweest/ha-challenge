import Ionicons from "@react-native-vector-icons/ionicons";
import type { ComponentProps } from "react";
import {
	ActivityIndicator,
	type GestureResponderEvent,
	Pressable,
	type PressableProps,
} from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

import { Text } from "@/components/text";
import { classnames } from "@/helpers";
import Themes from "@/theme";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = Omit<PressableProps, "children"> & {
	children: string;
	variant?: ButtonVariant;
	loading?: boolean;
	iconRight?: ComponentProps<typeof Ionicons>["name"];
};

const variantClasses: Record<ButtonVariant, string> = {
	primary: "bg-orange-700 active:bg-orange-800",
	secondary: "border border-zinc-700 bg-zinc-800 active:bg-zinc-700",
};

const textVariantClasses: Record<ButtonVariant, string> = {
	primary: "text-zinc-100",
	secondary: "text-zinc-100",
};

export function Button({
	children,
	className,
	variant = "primary",
	iconRight,
	loading,
	disabled,
	onPressIn,
	onPressOut,
	...props
}: ButtonProps) {
	const scale = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}));

	const handlePressIn = (event: GestureResponderEvent) => {
		scale.value = withTiming(0.98, { duration: 90 });
		onPressIn?.(event);
	};

	const handlePressOut = (event: GestureResponderEvent) => {
		scale.value = withTiming(1, { duration: 120 });
		onPressOut?.(event);
	};

	return (
		<Animated.View style={animatedStyle}>
			<Pressable
				{...props}
				accessibilityRole="button"
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				disabled={disabled || loading}
				className={classnames(
					"flex-row gap-2 items-center justify-center rounded-xl px-4 py-2 h-15 disabled:opacity-50",
					variantClasses[variant],
					className,
					(disabled || loading) && "opacity-50",
				)}
			>
				<Text
					className={classnames(
						"font-semibold",
						textVariantClasses[variant],
						loading && "opacity-0",
					)}
				>
					{children}
				</Text>

				{iconRight ? (
					<Ionicons
						name={iconRight}
						size={18}
						color={Themes.dark.colors.text}
					/>
				) : null}

				<ActivityIndicator
					color={Themes.dark.colors.text}
					className={classnames("absolute opacity-0", loading && "opacity-100")}
				/>
			</Pressable>
		</Animated.View>
	);
}
