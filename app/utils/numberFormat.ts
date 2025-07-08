interface FormatOptions {
	isCurrency?: boolean;
}

/**
 * Formats card values with smart currency detection
 * @param value - The value to format
 * @param options - Formatting options
 * @returns Formatted string with currency symbol where appropriate
 */
export const formatCardValue = (
	value: number | string,
	options?: FormatOptions
): string => {
	// Handle string values
	if (typeof value === "string") return value;

	// Determine if should format as currency
	const shouldFormatAsCurrency =
		options?.isCurrency ?? (typeof value === "number" && value > 1000);

	if (shouldFormatAsCurrency) {
		if (value >= 1000000) {
			return `$${(value / 1000000).toFixed(1)}M`;
		}
		if (value >= 1000) {
			return `$${(value / 1000).toFixed(1)}k`;
		}
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			maximumFractionDigits: 0,
		}).format(value);
	}

	return value.toString();
};
