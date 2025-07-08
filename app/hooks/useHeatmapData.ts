import { useBlockStore } from "../stores/blockStore";
import { useCallback } from "react";

export const useHeatmapData = () => {
	const {
		fetchHeatmapData,
		heatmapViewMode,
		setHeatmapViewMode,
		heatmapSelectedYear,
		heatmapSelectedMonth,
		setHeatmapYear,
		setHeatmapMonth,
		heatmapData,
		isLoading,
		generateHeatmapData,
		selectedMeterId,
	} = useBlockStore();

	const refreshHeatmapData = useCallback(() => {
		fetchHeatmapData(selectedMeterId || undefined);
	}, [fetchHeatmapData, selectedMeterId]);

	// useEffect(() => {
	// 	// Convert null to undefined for the generateHeatmapData function
	// 	const meterIdParam = selectedMeterId === null ? undefined : selectedMeterId;
	// 	generateHeatmapData(heatmapSelectedYear, meterIdParam);
	// }, [generateHeatmapData, heatmapSelectedYear, selectedMeterId]);

	console.log(heatmapData[0]);

	return {
		refreshHeatmapData,
		data: heatmapData,
		viewMode: heatmapViewMode,
		setViewMode: setHeatmapViewMode,
		selectedYear: heatmapSelectedYear,
		selectedMonth: heatmapSelectedMonth,
		setYear: setHeatmapYear,
		setSelectedMonth: setHeatmapMonth,
		generateData: generateHeatmapData,
		isLoading,
		selectedMeterId,
	};
};
