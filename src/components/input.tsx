import { TextInput, type TextInputProps } from "react-native";

import { classnames } from "@/helpers";

export function Input({
	className,
	placeholderTextColor = "#71717a",
	...props
}: TextInputProps) {
	return (
		<TextInput
			{...props}
			placeholderTextColor={placeholderTextColor}
			className={classnames(
				"rounded-xl border border-zinc-700 bg-zinc-900 h-15 pl-4 pr-4 py-0 text-base leading-5 text-zinc-100 focus:border-orange-500",
				className,
			)}
		/>
	);
}
