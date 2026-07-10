import { ActivityIndicator, View, type ViewProps } from "react-native";

import { classnames } from "@/helpers";
import Themes from "@/theme";

interface CardProps extends ViewProps {
	loading?: boolean;
}

export function Card({
	children,
	className,
	loading,
	style,
	...props
}: CardProps) {
	return (
		<View
			className={classnames(
				"rounded-3xl bg-zinc-900 shadow-lg shadow-black",
				className,
			)}
			{...props}
		>
			{loading ? (
				<View className="absolute inset-0 items-center justify-center">
					<ActivityIndicator color={Themes.dark.colors.text} />
				</View>
			) : (
				children
			)}
		</View>
	);
}
