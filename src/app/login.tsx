import { useRouter } from "expo-router";
import { useSetAtom } from "jotai";
import { useState } from "react";
import { View } from "react-native";

import { useLogin } from "@/api/hooks";
import { tokenAtom } from "@/atoms";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Page } from "@/components/page";
import { Text } from "@/components/text";

export default function Login() {
	const router = useRouter();

	const setToken = useSetAtom(tokenAtom);
	const login = useLogin();

	const [email, setEmail] = useState("testUser@dev.null");
	const [password, setPassword] = useState("challenge-2026");
	const [error, setError] = useState<string | null>(null);

	const handleLogin = async () => {
		if (login.isPending) return;

		setError(null);

		if (!email.trim() || !password) {
			setError("Please enter your email and password.");
			return;
		}

		try {
			const response = await login.mutateAsync({
				email: email.trim(),
				password,
			});

			setToken(response.token);
			router.replace("/");
		} catch {
			setError(
				"Unable to sign in. Please check your credentials and try again.",
			);
		}
	};

	return (
		<Page>
			<View className="gap-2 pb-4">
				<Text size="xlarge">Welcome</Text>
				<Text variant="secondary">Sign in to see your points and rewards.</Text>
			</View>

			<View className="gap-4">
				<Input
					value={email}
					onChangeText={setEmail}
					placeholder="Email"
					accessibilityLabel="Email"
					autoCapitalize="none"
					autoComplete="email"
					keyboardType="email-address"
					returnKeyType="next"
					textContentType="emailAddress"
				/>

				<Input
					value={password}
					onChangeText={setPassword}
					placeholder="Password"
					accessibilityLabel="Password"
					autoCapitalize="none"
					autoComplete="current-password"
					returnKeyType="go"
					textContentType="password"
					onSubmitEditing={handleLogin}
					secureTextEntry
				/>

				{error ? (
					<Text selectable variant="danger" size="small">
						{error}
					</Text>
				) : null}

				<Button
					loading={login.isPending}
					disabled={login.isPending}
					onPress={handleLogin}
				>
					{login.isPending ? "Signing in..." : "Sign in"}
				</Button>
			</View>
		</Page>
	);
}
