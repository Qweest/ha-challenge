import {
	type TextProps as NativeTextProps,
	Text as RNText,
} from "react-native";

type TextVariant = "primary" | "secondary" | "danger";
type TextSize = "small" | "medium" | "large";

type TextProps = Omit<NativeTextProps, "children"> & {
	children: string;
	variant?: TextVariant;
	size?: TextSize;
};

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
			className={`${variantClasses[variant]} ${sizeClasses[size]} ${className ?? ""}`}
		>
			{children}
		</RNText>
	);
}
