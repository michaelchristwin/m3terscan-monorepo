import { useCallback } from "react";
import { useBlockStore } from "../stores/blockStore";

export const useBlockData = () => {
	const store = useBlockStore();
	const { fetchEnergyUsageData, fetchStablecoinData } = store;

	const refreshEnergyData = useCallback(() => {
		fetchEnergyUsageData();
	}, [fetchEnergyUsageData]);

	const refreshStablecoinData = useCallback(() => {
		fetchStablecoinData();
	}, [fetchStablecoinData]);

	return {
		...store,
		refreshEnergyData,
		refreshStablecoinData,
	};
};
