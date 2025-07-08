import { API_BASE_URL } from "../constants";
import type {
	ApiBlockData,
	ApiHourlyEnergyUsage,
	ApiStablecoinData,
	ApiHeatmapData,
	BlockData,
	HourlyEnergyUsage,
	StablecoinData,
	DayData,
} from "../types";
import {
	transformBlockData,
	transformEnergyUsageData,
	transformStablecoinData,
	transformHeatmapData,
} from "./transformers";

export const fetchBlockDataFromApi = async (): Promise<BlockData[]> => {
	const response = await fetch(`${API_BASE_URL}/blocks`);
	if (!response.ok) {
		throw new Error(`Failed to fetch block data: ${response.statusText}`);
	}
	const data: ApiBlockData[] = await response.json();
	return transformBlockData(data);
};

export const fetchEnergyUsageFromApi = async (
	meterId?: string
): Promise<HourlyEnergyUsage[]> => {
	const url = meterId
		? `${API_BASE_URL}/energy-usage?meterId=${meterId}`
		: `${API_BASE_URL}/energy-usage`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(
			`Failed to fetch energy usage data: ${response.statusText}`
		);
	}
	const data: ApiHourlyEnergyUsage[] = await response.json();
	return transformEnergyUsageData(data);
};

export const fetchStablecoinDataFromApi = async (
	meterId?: string
): Promise<{
	stablecoins: StablecoinData[];
	meterStablecoins: Record<string, StablecoinData[]>;
}> => {
	const url = meterId
		? `${API_BASE_URL}/stablecoins?meterId=${meterId}`
		: `${API_BASE_URL}/stablecoins`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch stablecoin data: ${response.statusText}`);
	}
	const data: {
		globalStablecoins: ApiStablecoinData[];
		meterStablecoins: Record<string, ApiStablecoinData[]>;
	} = await response.json();

	return {
		stablecoins: transformStablecoinData(data.globalStablecoins),
		meterStablecoins: Object.fromEntries(
			Object.entries(data.meterStablecoins).map(([meterId, coins]) => [
				meterId,
				transformStablecoinData(coins),
			])
		),
	};
};

export const fetchHeatmapDataFromApi = async (
	year: number,
	meterId?: string
): Promise<DayData[]> => {
	const url = meterId
		? `${API_BASE_URL}/heatmap?year=${year}&meterId=${meterId}`
		: `${API_BASE_URL}/heatmap?year=${year}`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch heatmap data: ${response.statusText}`);
	}
	const data: ApiHeatmapData[] = await response.json();
	return transformHeatmapData(data);
};
