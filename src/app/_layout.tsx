import "@/global.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";

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
			try {
				const token = await getItem("access-token");
				setToken(token);
			} catch (e) {
				console.error(e);
			}

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
			<KeyboardProvider>
				<Stack />
			</KeyboardProvider>
		</QueryClientProvider>
	);
}
