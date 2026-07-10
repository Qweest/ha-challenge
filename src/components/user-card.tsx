import { Ionicons } from "@react-native-vector-icons/ionicons";
import { View } from "react-native";

import { Card } from "@/components/card";
import { Text } from "@/components/text";
import Themes from "@/theme";

interface UserCardProps {
	name?: string;
	email?: string;
	loading?: boolean;
}

export function UserCard({ name, email, loading = false }: UserCardProps) {
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
			</View>
		</Card>
	);
}
