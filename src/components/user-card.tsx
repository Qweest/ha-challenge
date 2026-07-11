import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useSetAtom } from "jotai";
import { Alert, View } from "react-native";

import { tokenAtom } from "@/atoms";
import { Card } from "@/components/card";
import { Text } from "@/components/text";
import Themes from "@/theme";
import { Pressable } from "./pressable";

interface UserCardProps {
	name?: string;
	email?: string;
	loading?: boolean;
}

export function UserCard({ name, email, loading = false }: UserCardProps) {
	const setToken = useSetAtom(tokenAtom);

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
		<Card className="h-24 justify-center p-4" loading={loading}>
			<View className="flex-row items-center gap-4">
				<View className="h-14 w-14 items-center justify-center rounded-full bg-zinc-800">
					<Ionicons name="person" size={28} color={Themes.dark.colors.text} />
				</View>
				<View className="flex-1 gap-1">
					<Text className="font-semibold">{name}</Text>
					<Text variant="secondary" size="small">
						{email}
					</Text>
				</View>

				<Pressable
					onPress={logout}
					accessibilityRole="button"
					accessibilityLabel="Log out"
					className="h-13 w-13 items-center justify-center rounded-full"
				>
					<Ionicons
						name="log-out-outline"
						size={24}
						color={Themes.dark.colors.notification}
					/>
				</Pressable>
			</View>
		</Card>
	);
}
