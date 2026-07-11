import {
	type BarcodeScanningResult,
	CameraView,
	useCameraPermissions,
} from "expo-camera";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useRef } from "react";
import { View } from "react-native";

import { useRedeemCode } from "@/api/hooks";
import { Button } from "@/components/button";
import { Text } from "@/components/text";

export default function ScanCode() {
	const [permission, requestPermission] = useCameraPermissions();
	const redeemCode = useRedeemCode();
	const scanned = useRef(false);

	const handlePermission = () => {
		if (permission?.canAskAgain) {
			requestPermission();
		} else {
			Linking.openSettings();
		}
	};

	const handleScan = ({ data }: BarcodeScanningResult) => {
		if (scanned.current) return;

		scanned.current = true;
		redeemCode.mutate(data);
		router.back();
	};

	if (!permission) {
		return <View className="flex-1 bg-black" />;
	}

	if (!permission.granted) {
		return (
			<View className="flex-1 items-center justify-center gap-4 p-6">
				<Text>Camera access is required to scan a QR code.</Text>
				<Button onPress={handlePermission}>
					{permission.canAskAgain ? "Allow camera" : "Open settings"}
				</Button>
			</View>
		);
	}

	return (
		<CameraView
			style={{ flex: 1 }}
			onBarcodeScanned={handleScan}
			barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
		/>
	);
}
