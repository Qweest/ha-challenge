import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const apiClient = axios.create({
	baseURL: "https://api.demo.helloagain.at",
	headers: {
		Accept: "application/json",
	},
});

export function setApiToken(token: string | null) {
	if (token) {
		apiClient.defaults.headers.common.Authorization = `Token ${token}`;
	} else {
		delete apiClient.defaults.headers.common.Authorization;
	}
}

export const queryClient = new QueryClient();
