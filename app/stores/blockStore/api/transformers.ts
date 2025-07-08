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

export const transformBlockData = (apiData: ApiBlockData[]): BlockData[] => {
	return apiData.map((block) => ({
		number: block.blockNumber,
		address: block.blockAddress,
		status: block.blockStatus,
		date: new Date(block.createdAt).toLocaleDateString(),
		time: new Date(block.createdAt).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		}),
		proposer: block.proposerName,
		meterId: block.meterId,
	}));
};

export const transformEnergyUsageData = (
	apiData: ApiHourlyEnergyUsage[]
): HourlyEnergyUsage[] => {
	return apiData.map((usage) => ({
		meterId: usage.meterId,
		hour: usage.hour,
		energyUsed: usage.energyUsedKwh,
		timestamp: usage.readingTimestamp,
	}));
};

export const transformStablecoinData = (
	apiData: ApiStablecoinData[]
): StablecoinData[] => {
	return apiData.map((coin) => ({
		symbol: coin.currencySymbol,
		network: coin.networkName,
		value: coin.usdValue,
	}));
};

export const transformHeatmapData = (apiData: ApiHeatmapData[]): DayData[] => {
	return apiData.map((item) => ({
		date: item.date,
		value: item.energyValue,
		month: item.month,
		day: item.day,
		weekday: item.weekday,
		week: item.week,
		meterId: item.meterId,
	}));
};
