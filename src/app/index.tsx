import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Redirect, Stack } from "expo-router";
import { useAtom } from "jotai";
import { Alert, Pressable, View } from "react-native";

import { tokenAtom } from "@/atoms";
import { Page } from "@/components/page";
import { Text } from "@/components/text";
import Themes from "@/theme";

export default function Root() {
	const [token, setToken] = useAtom(tokenAtom);

	if (!token) {
		return <Redirect href="/login" />;
	}

	const logout = () => {
		Alert.alert("Log Out", "Are you sure you want to log out?", [
			{
				text: "Yes",
				isPreferred: true,
				onPress: () => setToken(null),
			},
			{
				text: "Cancel",
				style: "cancel",
			},
		]);
	};

	return (
		<Page edges={["bottom"]}>
			<Stack.Screen
				options={{
					title: "",
					headerBackground: () => null,
					headerRight: () => (
						<Pressable
							onPress={logout}
							accessibilityRole="button"
							accessibilityLabel="Log out"
							className="w-10 h-10 items-center justify-center"
						>
							<Ionicons
								name="log-out-outline"
								size={24}
								color={Themes.dark.colors.notification}
							/>
						</Pressable>
					),
				}}
			/>
			<View className="flex-1 items-center justify-center">
				<Text>Edit src/app/index.tsx to edit this screen.</Text>
			</View>
		</Page>
	);
}
