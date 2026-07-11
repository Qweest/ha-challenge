import "@/global.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { queryClient } from "@/api/api";
import { tokenAtom } from "@/atoms";
import { getItem } from "@/storage";
import Themes from "@/theme";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ fade: true });

export default function RootLayout() {
	const [token, setToken] = useAtom(tokenAtom);
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
			<ThemeProvider value={Themes.dark}>
				<KeyboardProvider>
					<Stack screenOptions={{ headerShown: false }}>
						<Stack.Protected guard={!token}>
							<Stack.Screen name="login" />
						</Stack.Protected>
						<Stack.Protected guard={Boolean(token)}>
							<Stack.Screen name="index" />
							<Stack.Screen
								name="scan-code"
								options={{
									presentation: "formSheet",
									sheetAllowedDetents: [0.9],
									sheetGrabberVisible: true,
								}}
							/>
						</Stack.Protected>
					</Stack>
				</KeyboardProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
