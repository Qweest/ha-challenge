import { useWindowDimensions, View } from "react-native";
import RenderHtml from "react-native-render-html";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Text } from "@/components/text";
import Themes from "@/theme";

interface RewardCardProps {
	name: string;
	description: string;
	points: number;
	redeemable: boolean;
	loading?: boolean;
	onRedeem: () => void;
}

export function RewardCard({
	name,
	description,
	points,
	redeemable,
	loading,
	onRedeem,
}: RewardCardProps) {
	const { width } = useWindowDimensions();

	return (
		<Card className="gap-4 p-5 min-h-40 justify-between">
			<View className="gap-2">
				<Text size="large">{name}</Text>
				<RenderHtml
					contentWidth={width}
					source={{ html: description }}
					baseStyle={{
						color: Themes.dark.colors.text,
						fontSize: 14,
						lineHeight: 20,
					}}
					tagsStyles={{ p: { marginTop: 0, marginBottom: 0 } }}
				/>
			</View>

			<View className="flex-row items-center justify-between gap-4">
				<Text className="font-semibold text-orange-500">{points} points</Text>
				{redeemable ? (
					<Button className="h-11" loading={loading} onPress={onRedeem}>
						Redeem
					</Button>
				) : (
					<Text variant="secondary">Redeem not available</Text>
				)}
			</View>
		</Card>
	);
}
