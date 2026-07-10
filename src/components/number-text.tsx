import { useEffect, useState } from "react";

import { Text, type TextProps } from "@/components/text";

type NumberTextProps = Omit<TextProps, "children"> & {
	value: number;
};

export function NumberText({ value, ...props }: NumberTextProps) {
	const [displayedValue, setDisplayedValue] = useState(0);

	useEffect(() => {
		const startValue = displayedValue;
		const difference = value - startValue;

		if (difference === 0) return;

		const steps = Math.min(Math.abs(difference), 50);
		let currentStep = 0;

		const interval = setInterval(() => {
			currentStep += 1;
			const progress = currentStep / steps;
			const easedProgress = 1 - (1 - progress) ** 4;

			setDisplayedValue(Math.round(startValue + difference * easedProgress));

			if (currentStep === steps) clearInterval(interval);
		}, 20);

		return () => clearInterval(interval);
	}, [value]);

	return <Text {...props}>{displayedValue}</Text>;
}
