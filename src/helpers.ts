import clsx, { type ClassValue } from "clsx/lite";
import { twMerge } from "tailwind-merge";

/**
 * Combines a set of class names into a single string. This function merges class names
 * using `clsx` and applies Tailwind-compatible deduplication using `twMerge` to preserve order.
 *
 * @param {...ClassValue[]} classes - A list of class names, arrays, or objects representing class names.
 * @return {string} A single string containing the combined class names with Tailwind class conflict resolution applied.
 */
export function classnames(...classes: ClassValue[]): string {
	return twMerge(clsx(...classes));
}
