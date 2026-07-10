import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

type StorageKey = "access-token";

function getWebStorage() {
	if (typeof localStorage === "undefined") {
		return null;
	}

	return localStorage;
}

export async function getItem(key: StorageKey) {
	if (Platform.OS === "web") {
		return getWebStorage()?.getItem(key) ?? null;
	}

	return SecureStore.getItemAsync(key);
}

export async function setItem(key: StorageKey, value: string) {
	if (Platform.OS === "web") {
		getWebStorage()?.setItem(key, value);
		return;
	}

	await SecureStore.setItemAsync(key, value);
}

export async function deleteItem(key: StorageKey) {
	if (Platform.OS === "web") {
		getWebStorage()?.removeItem(key);
		return;
	}

	await SecureStore.deleteItemAsync(key);
}
