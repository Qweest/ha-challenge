import { Redirect } from "expo-router";
import { useAtomValue } from "jotai";
import { Text, View } from "react-native";

import { tokenAtom } from "@/atoms";

export default function Root() {
	const token = useAtomValue(tokenAtom);

	if (!token) {
		return <Redirect href="/login" />;
	}

	return (
		<View className="flex-1 items-center justify-center">
			<Text>Edit src/app/index.tsx to edit this screen.</Text>
		</View>
	);
}
