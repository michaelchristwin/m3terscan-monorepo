import { create } from "zustand";
import type { BlockStore, BlockData } from "./types";
import { staticBlockData, globalStablecoinData } from "./constants";
import {
	fetchBlockDataFromApi,
	fetchEnergyUsageFromApi,
	fetchStablecoinDataFromApi,
	fetchHeatmapDataFromApi,
} from "./api/fetchers";
import {
	generateHourlyEnergyUsage,
	generateMeterStablecoins,
	generateMockHeatmapData,
	generateMockHeatmapDataByYear,
} from "./utils/mockGenerators";

export const useBlockStore = create<BlockStore>((set, get) => {
	// Initialize with mock data
	const staticHourlyEnergyUsage = generateHourlyEnergyUsage(staticBlockData);
	const staticMeterStablecoins = generateMeterStablecoins(
		staticBlockData,
		globalStablecoinData
	);
	const staticHeatmapData = generateMockHeatmapData(staticBlockData);

	return {
		// Initial state
		blockData: staticBlockData,
		filteredData: [],
		hourlyEnergyUsage: [],
		stablecoinData: [],
		heatmapData: [],
		allHourlyEnergyUsage: staticHourlyEnergyUsage,
		allStablecoinData: globalStablecoinData,
		allHeatmapData: staticHeatmapData,
		allMeterStablecoins: staticMeterStablecoins,
		heatmapViewMode: "yearly-weeks",
		heatmapSelectedYear: new Date().getFullYear(),
		heatmapSelectedMonth: null,
		selectedMeterId: null,
		meterIdBlocks: [],
		meterEnergyUsage: [],
		meterStablecoins: [],
		isLoading: false,
		error: null,
		useMockData: true,

		// Methods implementation
		setHeatmapYear: (year: number) => {
			set({ heatmapSelectedYear: year });
			const { selectedMeterId } = get();
			get().generateHeatmapData(year, selectedMeterId || undefined);
		},

		setHeatmapMonth: (month: number | null) => {
			set({ heatmapSelectedMonth: month });
		},

		// setHeatmapViewMode: (mode: "yearly-weeks" | "yearly-days" | "monthly") => {
		// 	set({ heatmapViewMode: mode });
		// },
		setHeatmapViewMode: (mode) => {
			set({ heatmapViewMode: mode });
		},

		generateHeatmapData: (year: number, meterId?: string) => {
			const { useMockData } = get();

			if (useMockData) {
				// Generate mock data for the specified year and meter
				const mockData = generateMockHeatmapDataByYear(
					get().blockData,
					year,
					meterId
				);
				set({
					allHeatmapData: generateMockHeatmapDataByYear(get().blockData, year),
					heatmapData: meterId
						? mockData.filter((d) => d.meterId === meterId)
						: mockData,
				});
				return;
			}

			set({ isLoading: true });
			fetchHeatmapDataFromApi(year, meterId)
				.then((data) => {
					set({
						allHeatmapData: data,
						heatmapData: meterId
							? data.filter((d) => d.meterId === meterId)
							: data,
						isLoading: false,
					});
				})
				.catch((error) => {
					set({
						isLoading: false,
						error:
							error instanceof Error
								? error.message
								: "Failed to generate heatmap data",
					});
				});
		},

		searchBlocks: (query) => {
			const normalizedQuery = query.toLowerCase().trim();
			set((state) => {
				if (!normalizedQuery) return { filteredData: [] };
				const results = state.blockData.filter((block) => {
					return (
						block.proposer.toLowerCase().includes(normalizedQuery) ||
						block.number.toString().includes(normalizedQuery)
					);
				});
				return { filteredData: results };
			});
		},

		searchProposer: (query: string) => {
			const lowercaseQuery = query.toLowerCase();
			const results = get().blockData.filter((block: BlockData) =>
				block.proposer.toLowerCase().includes(lowercaseQuery)
			);
			set({ filteredData: results });
		},

		searchBlockNumber: (query: string) => {
			const results = get().blockData.filter((block: BlockData) =>
				block.number.toString().includes(query)
			);
			set({ filteredData: results });
		},

		clearSearch: () => set({ filteredData: [] }),

		selectMeterId: (meterId: string) => {
			const { heatmapSelectedYear } = get();
			set((state) => {
				const meterIdBlocks = state.blockData.filter(
					(block) => block.meterId === meterId
				);
				const meterEnergyUsage = state.allHourlyEnergyUsage.filter(
					(usage) => usage.meterId === meterId
				);
				const meterStablecoins = state.allMeterStablecoins[meterId] || [];
				const meterHeatmapData = state.allHeatmapData.filter(
					(day) => day.meterId === meterId
				);

				return {
					selectedMeterId: meterId,
					meterIdBlocks,
					hourlyEnergyUsage: meterEnergyUsage,
					stablecoinData: meterStablecoins,
					heatmapData: meterHeatmapData,
					meterEnergyUsage,
					meterStablecoins,
				};
			});
			// Regenerate heatmap data for the selected meter
			get().generateHeatmapData(heatmapSelectedYear, meterId);
		},

		clearSelectedMeterId: () => {
			set({
				selectedMeterId: null,
				meterIdBlocks: [],
				// Clear the main data arrays when no meter is selected
				hourlyEnergyUsage: [],
				stablecoinData: [],
				heatmapData: [],
				// Clear deprecated fields
				meterEnergyUsage: [],
				meterStablecoins: [],
			});
		},

		fetchBlockData: async () => {
			const { useMockData } = get();
			if (useMockData) {
				set({ blockData: staticBlockData, error: null });
				return;
			}

			set({ isLoading: true, error: null });
			try {
				const apiBlockData = await fetchBlockDataFromApi();
				set({
					blockData: apiBlockData,
					isLoading: false,
					error: null,
				});
			} catch (error) {
				set({
					isLoading: false,
					error:
						error instanceof Error
							? error.message
							: "Failed to fetch block data",
				});
			}
		},

		fetchEnergyUsageData: async (meterId?: string) => {
			const { useMockData, selectedMeterId } = get();
			const targetMeterId = meterId || selectedMeterId || undefined;

			if (useMockData) {
				const mockData = generateHourlyEnergyUsage(get().blockData);
				const filteredData = targetMeterId
					? mockData.filter((usage) => usage.meterId === targetMeterId)
					: [];

				set({
					allHourlyEnergyUsage: mockData,
					hourlyEnergyUsage: filteredData,
					error: null,
				});
				return;
			}

			set({ isLoading: true, error: null });
			try {
				const apiEnergyData = await fetchEnergyUsageFromApi(targetMeterId);
				set({
					allHourlyEnergyUsage: apiEnergyData,
					hourlyEnergyUsage: targetMeterId
						? apiEnergyData.filter((usage) => usage.meterId === targetMeterId)
						: [],
					isLoading: false,
					error: null,
				});
			} catch (error) {
				set({
					isLoading: false,
					error:
						error instanceof Error
							? error.message
							: "Failed to fetch energy data",
				});
			}
		},

		fetchStablecoinData: async (meterId?: string) => {
			const { useMockData, selectedMeterId } = get();
			const targetMeterId = meterId || selectedMeterId || undefined;

			if (useMockData) {
				const mockMeterData = generateMeterStablecoins(
					get().blockData,
					globalStablecoinData
				);
				const filteredData = targetMeterId
					? mockMeterData[targetMeterId] || []
					: [];

				set({
					allStablecoinData: globalStablecoinData,
					stablecoinData: filteredData,
					allMeterStablecoins: mockMeterData,
					error: null,
				});
				return;
			}

			set({ isLoading: true, error: null });
			try {
				const { stablecoins, meterStablecoins } =
					await fetchStablecoinDataFromApi(targetMeterId);
				const filteredData = targetMeterId
					? meterStablecoins[targetMeterId] || []
					: [];

				set({
					allStablecoinData: stablecoins,
					stablecoinData: filteredData,
					allMeterStablecoins: meterStablecoins,
					isLoading: false,
					error: null,
				});
			} catch (error) {
				set({
					isLoading: false,
					error:
						error instanceof Error
							? error.message
							: "Failed to fetch stablecoin data",
				});
			}
		},

		fetchHeatmapData: async (meterId?: string) => {
			const { useMockData, selectedMeterId, heatmapSelectedYear } = get();
			const targetMeterId = meterId || selectedMeterId || undefined;

			set({ isLoading: true, error: null });

			try {
				if (useMockData) {
					// Generate consistent mock data for both all data and filtered data
					const allMockData = generateMockHeatmapDataByYear(
						get().blockData,
						heatmapSelectedYear
					);

					const filteredMockData = targetMeterId
						? allMockData.filter((day) => day.meterId === targetMeterId)
						: allMockData;

					set({
						allHeatmapData: allMockData,
						heatmapData: filteredMockData,
						isLoading: false,
						error: null,
					});
					return;
				}

				// Real API call - single request that handles filtering server-side
				const apiData = await fetchHeatmapDataFromApi(
					heatmapSelectedYear,
					targetMeterId
				);

				// For allHeatmapData, we could either:
				// 1. Store only the relevant year's data (current implementation)
				// 2. Append to existing data if we want multi-year support
				set({
					allHeatmapData: apiData, // or [...get().allHeatmapData, ...apiData] for multi-year
					heatmapData: apiData, // Already filtered by API if targetMeterId was provided
					isLoading: false,
					error: null,
				});
			} catch (error) {
				set({
					isLoading: false,
					error:
						error instanceof Error
							? error.message
							: "Failed to fetch heatmap data",
				});
			}
		},

		clearError: () => set({ error: null }),

		setMockMode: (useMock: boolean) => {
			set({ useMockData: useMock });
			// Refresh all data when switching modes
			const { selectedMeterId } = get();
			const meterIdParam = selectedMeterId || undefined;
			if (useMock) {
				get().fetchBlockData();
				get().fetchEnergyUsageData(meterIdParam);
				get().fetchStablecoinData(meterIdParam);
				get().fetchHeatmapData(meterIdParam);
			} else {
				Promise.all([
					get().fetchBlockData(),
					get().fetchEnergyUsageData(meterIdParam),
					get().fetchStablecoinData(meterIdParam),
					get().fetchHeatmapData(meterIdParam),
				]);
			}
		},
	};
});
