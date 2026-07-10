import { DarkTheme } from "expo-router";

const Themes = {
	dark: {
		...DarkTheme,
		colors: {
			...DarkTheme.colors,
			primary: "#f97316",
			background: "#09090b",
			card: "#18181b",
			text: "#f4f4f5",
			border: "#27272a",
			notification: "#ef4444",
		},
	},
};

export default Themes;
