import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useQueryClient } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import { useSetAtom } from "jotai";
import { useState } from "react";
import { Alert, RefreshControl, View } from "react-native";

import {
	useCustomerRelationship,
	useProfile,
	useRedeemReward,
	useRewards,
} from "@/api/hooks";
import { tokenAtom } from "@/atoms";
import { Card } from "@/components/card";
import { NumberText } from "@/components/number-text";
import { Page } from "@/components/page";
import { Pressable } from "@/components/pressable";
import { RewardCard } from "@/components/reward-card";
import { Text } from "@/components/text";
import { UserCard } from "@/components/user-card";
import Themes from "@/theme";

export default function Home() {
	const setToken = useSetAtom(tokenAtom);

	const queryClient = useQueryClient();
	const profile = useProfile();
	const customerRelationship = useCustomerRelationship();
	const rewards = useRewards();
	const redeemReward = useRedeemReward();

	const [refreshing, setRefreshing] = useState(false);

	const refresh = async () => {
		setRefreshing(true);

		try {
			await queryClient.refetchQueries({ type: "active" });
		} finally {
			setRefreshing(false);
		}
	};

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
		<Page
			contentContainerClassName="gap-6"
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={refresh}
					tintColor={Themes.dark.colors.text}
				/>
			}
		>
			<Stack.Screen
				options={{
					title: "",
					headerBackground: () => null,
					headerRight: () => (
						<Pressable
							animated={false}
							haptics={false}
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

			<View className="flex-row gap-6">
				<Card
					className="aspect-square flex-1 items-center justify-center gap-2 bg-orange-300/10"
					loading={customerRelationship.isLoading}
				>
					<NumberText
						value={customerRelationship.data?.points ?? 0}
						className="text-5xl font-bold text-orange-500"
					/>
					<Text variant="secondary" className="font-semibold">
						Points
					</Text>
				</Card>

				<Pressable
					accessibilityRole="button"
					onPress={() => router.navigate("/scan-code")}
					className="aspect-square flex-1"
				>
					<Card className="flex-1 items-center justify-center gap-2 bg-sky-800/10">
						<Ionicons name="scan" size={36} color={Themes.dark.colors.text} />
						<Text className="font-semibold">Scan code</Text>
					</Card>
				</Pressable>
			</View>

			<Text className="mt-4" size="large">
				Rewards
			</Text>

			{rewards.isLoading ? (
				<Card className="h-40" loading />
			) : rewards.data?.length ? (
				rewards.data.map((reward) => (
					<RewardCard
						key={reward.id}
						name={reward.name}
						description={reward.description}
						points={reward.needed_points}
						redeemable={reward.is_redeemable}
						loading={
							redeemReward.isPending && redeemReward.variables === reward.id
						}
						onRedeem={() => redeemReward.mutate(reward.id)}
					/>
				))
			) : (
				<Text variant="secondary">No rewards available.</Text>
			)}
		</Page>
	);
}
