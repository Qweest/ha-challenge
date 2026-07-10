import { TextInput, type TextInputProps } from "react-native";

export function Input({
	className,
	placeholderTextColor = "#71717a",
	...props
}: TextInputProps) {
	return (
		<TextInput
			{...props}
			placeholderTextColor={placeholderTextColor}
			className={`rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-base text-zinc-100 ${className ?? ""}`}
		/>
	);
}
