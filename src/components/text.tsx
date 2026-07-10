import { Text as RNText, type TextProps as RNTextProps } from "react-native";

import { classnames } from "@/helpers";

type TextVariant = "primary" | "secondary" | "danger";
type TextSize = "small" | "medium" | "large";

interface TextProps extends RNTextProps {
	variant?: TextVariant;
	size?: TextSize;
	className?: string;
}

const variantClasses: Record<TextVariant, string> = {
	primary: "text-zinc-100",
	secondary: "text-zinc-400",
	danger: "text-red-400",
};

const sizeClasses: Record<TextSize, string> = {
	small: "text-sm",
	medium: "text-base",
	large: "text-2xl font-semibold",
};

export function Text({
	children,
	className,
	variant = "primary",
	size = "medium",
	...props
}: TextProps) {
	return (
		<RNText
			{...props}
			className={classnames(
				variantClasses[variant],
				sizeClasses[size],
				className,
			)}
		>
			{children}
		</RNText>
	);
}
