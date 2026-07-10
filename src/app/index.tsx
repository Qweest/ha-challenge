import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Stack } from "expo-router";
import { useSetAtom } from "jotai";
import { Alert, Pressable } from "react-native";

import { useProfile } from "@/api/hooks";
import { tokenAtom } from "@/atoms";
import { Page } from "@/components/page";
import { UserCard } from "@/components/user-card";
import Themes from "@/theme";

export default function Home() {
	const setToken = useSetAtom(tokenAtom);
	const profile = useProfile();

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
							className="h-10 w-10 items-center justify-center"
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

			<UserCard
				name={profile.data?.name}
				email={profile.data?.email}
				loading={profile.isLoading}
			/>
		</Page>
	);
}
