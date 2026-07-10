import { apiClient } from "./api";
import type {
	CustomerRelationship,
	LoginCredentials,
	LoginResponse,
	Profile,
	RedeemCodeResponse,
	RedeemRewardResponse,
	Reward,
} from "./types";

const CLIENT_ID = "753d6b63-dc6b-4b28-83fc-6ead93660958";

export async function login(credentials: LoginCredentials) {
	const { data } = await apiClient.post<LoginResponse>(
		"/api/v1/users/token/",
		credentials,
		{ params: { client_id: CLIENT_ID } },
	);

	return data;
}

export async function getCustomerRelationship() {
	const { data } = await apiClient.get<CustomerRelationship>(
		`/api/v1/customer-relationships/client/${CLIENT_ID}/`,
	);

	return data;
}

export async function getProfile() {
	const { data } = await apiClient.get<Profile>("/api/v1/users/profile/", {
		params: { client_id: CLIENT_ID },
	});

	return data;
}

export async function getRewards() {
	const { data } = await apiClient.get<Reward[]>(
		`/api/v1/clients/${CLIENT_ID}/bounties/`,
	);

	return data;
}

export async function redeemCode(code: string) {
	const { data } = await apiClient.post<RedeemCodeResponse>(
		`/api/v1/clients/${CLIENT_ID}/redeem/`,
		{ code },
	);

	return data;
}

export async function redeemReward(bountyId: string) {
	const { data } = await apiClient.post<RedeemRewardResponse>(
		`/api/v1/clients/${CLIENT_ID}/bounties/redeem/`,
		{ bounty_id: bountyId },
	);

	return data;
}
