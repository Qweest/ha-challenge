import * as Haptics from "expo-haptics";
import {
	type GestureResponderEvent,
	Pressable as RNPressable,
	type PressableProps as RNPressableProps,
} from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(RNPressable);

export interface PressableProps extends RNPressableProps {
	haptics?: boolean;
	animated?: boolean;
}

export function Pressable({
	haptics = true,
	animated = true,
	onPress,
	onPressIn,
	onPressOut,
	style,
	...props
}: PressableProps) {
	const active = useSharedValue(false);

	const animatedStyle = useAnimatedStyle(() => {
		const opacity = withTiming(active.get() ? 0.75 : 1, { duration: 90 });
		const scale = withTiming(active.get() ? 0.98 : 1, { duration: 90 });
		return {
			opacity,
			transform: [{ scale }],
		};
	});

	const handlePressIn = (event: GestureResponderEvent) => {
		if (animated) active.set(true);
		onPressIn?.(event);
	};

	const handlePressOut = (event: GestureResponderEvent) => {
		if (animated) active.set(false);
		onPressOut?.(event);
	};

	const handlePress = (event: GestureResponderEvent) => {
		if (haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
		onPress?.(event);
	};

	return (
		<AnimatedPressable
			{...props}
			onPress={handlePress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			style={[animatedStyle, style]}
		/>
	);
}
