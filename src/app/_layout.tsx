import "@/global.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";

import { queryClient } from "@/api/api";
import { tokenAtom } from "@/atoms";
import { getItem } from "@/storage";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ fade: true });

export default function RootLayout() {
	const setToken = useSetAtom(tokenAtom);
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		const init = async () => {
			const token = await getItem("access-token");
			if (token) setToken(token);
			setInitialized(true);
		};

		init();
	}, []);

	useEffect(() => {
		if (initialized) {
			SplashScreen.hideAsync();
		}
	}, [initialized]);

	if (!initialized) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<Stack />
		</QueryClientProvider>
	);
}
