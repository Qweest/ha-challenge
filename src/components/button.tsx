import {
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

type ButtonVariant = "primary" | "secondary";

type ButtonProps = Omit<PressableProps, "children"> & {
	children: string;
	variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
	primary: "bg-orange-500 active:bg-orange-600",
	secondary: "border border-zinc-700 bg-zinc-800 active:bg-zinc-700",
};

const textVariantClasses: Record<ButtonVariant, string> = {
	primary: "text-zinc-950",
	secondary: "text-zinc-100",
};

export function Button({
	children,
	className,
	variant = "primary",
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
				className={`items-center justify-center rounded-xl px-5 py-3.5 disabled:opacity-50 ${variantClasses[variant]} ${className ?? ""}`}
			>
				<Text className={`font-semibold ${textVariantClasses[variant]}`}>
					{children}
				</Text>
			</Pressable>
		</Animated.View>
	);
}
