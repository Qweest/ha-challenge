export type LoginCredentials = {
	email: string;
	password: string;
};

export type LoginResponse = {
	id: number;
	success: boolean;
	access_token: string;
	token: string;
};

export type CustomerRelationship = {
	id: number;
	points: number;
	appuser: {
		id: string;
		email: string;
		name: string;
	};
};

export type Profile = {
	id: string;
	email: string;
	name: string;
	first_name: string;
	last_name: string;
	locale: string;
	customer_id: string;
};

export type Reward = {
	id: string;
	name: string;
	description: string;
	is_redeemable: boolean;
	needed_points: number;
	cr_points: number;
};

export type RedeemCodeResponse = {
	success: boolean;
	coupon: string;
	points: number;
	cr_points: number;
};

export type RedeemRewardResponse = {
	bounty_id: string;
};
