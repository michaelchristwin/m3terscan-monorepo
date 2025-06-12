import { useCallback } from "react";
import { useCardStore } from "../state/cardStore";

export const useCardData = () => {
	const store = useCardStore();
	const { fetchMonthlyData, fetchCardData } = store;

	// Memoize the refreshData function to prevent unnecessary re-renders
	const refreshData = useCallback(() => {
		fetchMonthlyData();
		fetchCardData();
	}, [fetchMonthlyData, fetchCardData]);

	return {
		...store,
		refreshData,
	};
};
