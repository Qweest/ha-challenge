import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
	getCustomerRelationship,
	getProfile,
	getRewards,
	login,
	redeemCode,
	redeemReward,
} from "./requests";

const queryKeys = {
	login: "login",
	customerRelationship: "customer-relationship",
	profile: "profile",
	rewards: "rewards",
} as const;

export function useLogin() {
	return useMutation({ mutationFn: login });
}

export function useCustomerRelationship() {
	return useQuery({
		queryKey: [queryKeys.customerRelationship],
		queryFn: getCustomerRelationship,
	});
}

export function useProfile() {
	return useQuery({
		queryKey: [queryKeys.profile],
		queryFn: getProfile,
	});
}

export function useRewards() {
	return useQuery({
		queryKey: [queryKeys.rewards],
		queryFn: getRewards,
	});
}

export function useRedeemCode() {
	const cache = useQueryClient();

	return useMutation({
		mutationFn: redeemCode,
		onSuccess: async () => {
			await Promise.all([
				cache.invalidateQueries({
					queryKey: [queryKeys.customerRelationship],
				}),
				cache.invalidateQueries({ queryKey: [queryKeys.rewards] }),
			]);
		},
	});
}

export function useRedeemReward() {
	const cache = useQueryClient();

	return useMutation({
		mutationFn: redeemReward,
		onSuccess: async () => {
			await Promise.all([
				cache.invalidateQueries({
					queryKey: [queryKeys.customerRelationship],
				}),
				cache.invalidateQueries({ queryKey: [queryKeys.rewards] }),
			]);
		},
	});
}
