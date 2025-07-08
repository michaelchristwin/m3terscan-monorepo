import { useCallback } from "react";
import { useBlockStore } from "../stores/blockStore";

export const useBlockData = () => {
	const store = useBlockStore();
	const { fetchBlockData, fetchEnergyUsageData, fetchStablecoinData } = store;

	const refreshBlocks = useCallback(() => {
		fetchBlockData();
	}, [fetchBlockData]);

	const refreshEnergyData = useCallback(() => {
		fetchEnergyUsageData();
	}, [fetchEnergyUsageData]);

	const refreshStablecoinData = useCallback(() => {
		fetchStablecoinData();
	}, [fetchStablecoinData]);

	return {
		...store,
		refreshBlocks,
		refreshEnergyData,
		refreshStablecoinData,
	};
};
