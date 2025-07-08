import { create } from "zustand";
// For the block data store
// This store manages the block data for the blockchain application
// It provides functionality to search blocks by proposer or block number
export interface blockData {
	number: number;
	address: string;
	status: string;
	date: string;
	time: string;
	proposer: string;
	meterId: string;
}

export interface HourlyEnergyUsage {
	meterId: string;
	hour: string;
	energyUsed: number;
	timestamp: string;
}

export interface StablecoinData {
	symbol: string;
	network: string;
	value: number; //in USD
}

// Update to match backend reponse
interface ApiBlockData {
	blockNumber: number;
	blockAddress: string;
	blockStatus: string;
	createdAt: string; // ISO format
	proposerName: string;
	meterId: string;
}

// Update to match backend reponse
interface ApiHourlyEnergyUsage {
	meterId: string;
	hour: string;
	energyUsedKwh: number;
	readingTimestamp: string;
}

interface ApiStablecoinData {
	currencySymbol: string;
	networkName: string;
	usdValue: number;
}

interface BlockStore {
	// core data
	blockData: blockData[];
	filteredData: blockData[];
	hourlyEnergyUsage: HourlyEnergyUsage[];
	stablecoinData: StablecoinData[];
	allMeterStablecoins: Record<string, StablecoinData[]>;

	// meter selection state
	selectedMeterId: string | null;
	meterIdBlocks: blockData[];
	meterEnergyUsage: HourlyEnergyUsage[];
	meterStablecoins: StablecoinData[];

	// Loading and error states
	isLoading: boolean;
	error: string | null;
	useMockData: boolean;

	// searchmethods
	searchBlocks: (query: string) => void;
	searchProposer: (query: string) => void;
	searchBlockNumber: (query: string) => void;
	clearSearch: () => void;

	// meter selection methods
	selectMeterId: (meterId: string) => void;
	clearSelectedMeterId: () => void;

	// Data fetching methods
	fetchBlockData: () => Promise<void>;
	fetchEnergyUsageData: () => Promise<void>;
	fetchStablecoinData: () => Promise<void>;
	clearError: () => void;

	// Development mode toggle
	setMockMode: (useMock: boolean) => void;
}

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

const staticBlockData: blockData[] = [
	{
		number: 100,
		address: "0xID1479C185d32EB90533a0Bb36B3FCa5F84A0E6B",
		status: "Successful",
		date: "25/01/2024",
		time: "6:30am",
		proposer: "Christwin. I",
		meterId: "54123456789",
	},
	{
		number: 99,
		address: "0xID1479C185d32EB90533a0Bb36B3FCa5F84A0E6B",
		status: "Successful",
		date: "25/01/2024",
		time: "6:30am",
		proposer: "John Doe",
		meterId: "54123456789",
	},
	{
		number: 98,
		address: "0xID1479C185d32EB90533a0Bb36B3FCa5F84A0E6B",
		status: "Invalid",
		date: "25/01/2024",
		time: "6:35am",
		proposer: "Christwin. I",
		meterId: "37123456789",
	},
	{
		number: 97,
		address: "0xID84A0E6B1479C185d32EB90533a0Bb36B3FCa5F",
		status: "Successful",
		date: "25/01/2024",
		time: "6:35am",
		proposer: "Jude. G",
		meterId: "62123456789",
	},
	{
		number: 96,
		address: "0xIDFFEE9185d32EB90533a0Bb36B3FCa5F84A0E6B",
		status: "Invalid",
		date: "25/01/2024",
		time: "6:40am",
		proposer: "Mary Snow",
		meterId: "37123456789",
	},
	{
		number: 95,
		address: "0xID7A9C185d32EB90533a0Bb36B3FCa5F84A0E6BB",
		status: "Successful",
		date: "25/01/2024",
		time: "6:40am",
		proposer: "Tina Wendy",
		meterId: "54123456789",
	},
	{
		number: 94,
		address: "0xIDCD32185d32EB90533a0Bb36B3FCa5F84A0E6B",
		status: "Invalid",
		date: "25/01/2024",
		time: "6:45am",
		proposer: "Christwin. I",
		meterId: "62123456789",
	},
	{
		number: 93,
		address: "0xID8479C185d32EB90533a0Bb36B3FCa5F84A0E6B",
		status: "Successful",
		date: "25/01/2024",
		time: "6:45am",
		proposer: "Giyu Tomioka",
		meterId: "37123456789",
	},
	{
		number: 92,
		address: "0xID1479C1B3C2EB90533a0Bb36B3FCa5F84A0E6B",
		status: "Successful",
		date: "25/01/2024",
		time: "6:50am",
		proposer: "Christwin. I",
		meterId: "54123456789",
	},
	{
		number: 91,
		address: "0xID1479C185d32EBAA533a0Bb36B3FCa5F84A0E6B",
		status: "Successful",
		date: "25/01/2024",
		time: "6:50am",
		proposer: "Jude. G",
		meterId: "37123456789",
	},
	{
		number: 90,
		address: "0xIDA23C185d32EB90533a0Bb36B3FCa5F84A0E6B",
		status: "Successful",
		date: "25/01/2024",
		time: "6:55am",
		proposer: "Bruce Wayne",
		meterId: "55112233445",
	},
	{
		number: 89,
		address: "0xID1479C8888EB90533a0Bb36B3FCa5F84A0E6B",
		status: "Invalid",
		date: "25/01/2024",
		time: "6:55am",
		proposer: "Jude. G",
		meterId: "44112233445",
	},
	{
		number: 88,
		address: "0xID1479C185d32EB90ABCa0Bb36B3FCa5F84A0E6B",
		status: "Successful",
		date: "25/01/2024",
		time: "7:00am",
		proposer: "Peter Griffin",
		meterId: "55112233445",
	},
	{
		number: 87,
		address: "0xID1479C185d32EB90533a0FFBB3FCa5F84A0E6B",
		status: "Successful",
		date: "25/01/2024",
		time: "7:00am",
		proposer: "Jude. G",
		meterId: "54123456789",
	},
	{
		number: 86,
		address: "0xID1479C185D31AB90533a0Bb36B3FCa5F84A0E6B",
		status: "Invalid",
		date: "25/01/2024",
		time: "7:05am",
		proposer: "Christwin. I",
		meterId: "62123456789",
	},
	{
		number: 85,
		address: "0xID1479C185d32EB90533a0BFD6B3FCa5F84A0E6B",
		status: "Successful",
		date: "25/01/2024",
		time: "7:05am",
		proposer: "Joe Swanson",
		meterId: "44112233445",
	},
	{
		number: 84,
		address: "0xID1479C18AF32EB90533a0Bb36B3FCa5F84A0E6B",
		status: "Invalid",
		date: "25/01/2024",
		time: "7:10am",
		proposer: "Christwin. I",
		meterId: "37123456789",
	},
	{
		number: 83,
		address: "0xID1479C185d32EB90533a0BDFD3FCa5F84A0E6B",
		status: "Successful",
		date: "25/01/2024",
		time: "7:10am",
		proposer: "Jude. G",
		meterId: "55112233445",
	},
	{
		number: 82,
		address: "0xID1479C185d32EB90C33a0Bb36B3FCa5F84A0E6B",
		status: "Successful",
		date: "25/01/2024",
		time: "7:15am",
		proposer: "Christwin. I",
		meterId: "44112233445",
	},
	{
		number: 81,
		address: "0xID1479C185d32EB90533a0BB66B3FCa5F84A0E6B",
		status: "Successful",
		date: "25/01/2024",
		time: "7:15am",
		proposer: "Gyomei Himejima",
		meterId: "54123456789",
	},
];

const stablecoinData: StablecoinData[] = [
	{
		symbol: "cUSD",
		network: "Celo",
		value: 1.0,
	},
	{
		symbol: "USDe",
		network: "Ethereum",
		value: 1.0,
	},
	{
		symbol: "USDC",
		network: "Base",
		value: 1.0,
	},
	{
		symbol: "xDAI",
		network: "Gnosis",
		value: 1.0,
	},
	{
		symbol: "DAI",
		network: "Optimism",
		value: 1.0,
	},
	{
		symbol: "USDT",
		network: "Polygon",
		value: 1.0,
	},
	{
		symbol: "PYUSD",
		network: "Arbitrum",
		value: 1.0,
	},
];

export const generateHourlyEnergyUsage = (
	blocks: blockData[]
): HourlyEnergyUsage[] => {
	const uniqueMeterIds = Array.from(
		new Set(blocks.map((block) => block.meterId))
	);
	const energyData: HourlyEnergyUsage[] = [];

	// Define 24-hour formatted hours from 00:00 to 23:00
	const fixedHours = Array.from(
		{ length: 24 },
		(_, i) => `${i.toString().padStart(2, "0")}:00`
	);

	uniqueMeterIds.forEach((meterId) => {
		const meterBlocks = blocks.filter((block) => block.meterId === meterId);
		const activityLevel = meterBlocks.length / blocks.length;
		const baseUsage = 5 + activityLevel * 20;

		const date = meterBlocks[0]?.date || "2025-01-01"; // Fallback date

		fixedHours.forEach((hour) => {
			const variation = 0.7 + Math.random() * 0.6;
			const energyUsed = parseFloat((baseUsage * variation).toFixed(1));
			energyData.push({
				meterId,
				hour,
				energyUsed,
				timestamp: `${date} ${hour}`,
			});
		});
	});

	return energyData;
};

export const generateMeterStablecoins = (
	blocks: blockData[],
	stablecoins: StablecoinData[]
): Record<string, StablecoinData[]> => {
	const uniqueMeterIds = Array.from(
		new Set(blocks.map((block) => block.meterId))
	);
	const meterStablecoins: Record<string, StablecoinData[]> = {};

	uniqueMeterIds.forEach((meterId) => {
		const meterBlocks = blocks.filter((block) => block.meterId === meterId);
		const activityLevel = meterBlocks.length / blocks.length;

		// Generate all stablecoins for each meter with USD values
		meterStablecoins[meterId] = stablecoins.map((coin) => {
			// Generate a value that fluctuates slightly around $1.00
			// based on activity level (between $0.98 and $1.02)
			const value = 200 + Math.random() * 450 * activityLevel;

			return {
				symbol: coin.symbol,
				network: coin.network,
				value: parseFloat(value.toFixed(4)), // More precise USD value
			};
		});
	});

	return meterStablecoins;
};

// API data transformation functions
const transformBlockData = (apiData: ApiBlockData[]): blockData[] => {
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

const transformEnergyUsageData = (
	apiData: ApiHourlyEnergyUsage[]
): HourlyEnergyUsage[] => {
	return apiData.map((usage) => ({
		meterId: usage.meterId,
		hour: usage.hour,
		energyUsed: usage.energyUsedKwh,
		timestamp: usage.readingTimestamp,
	}));
};

const transformStablecoinData = (
	apiData: ApiStablecoinData[]
): StablecoinData[] => {
	return apiData.map((coin) => ({
		symbol: coin.currencySymbol,
		network: coin.networkName,
		value: coin.usdValue,
	}));
};

// API fetch functions
const fetchBlockDataFromApi = async (): Promise<blockData[]> => {
	// replace url with actual endpoint
	const response = await fetch(`${API_BASE_URL}/blocks`);
	if (!response.ok) {
		throw new Error(`Failed to fetch block data: ${response.statusText}`);
	}
	const data: ApiBlockData[] = await response.json();
	return transformBlockData(data);
};

const fetchEnergyUsageFromApi = async (): Promise<HourlyEnergyUsage[]> => {
	// replace url with actual endpoint
	const response = await fetch(`${API_BASE_URL}/energy-usage`);
	if (!response.ok) {
		throw new Error(
			`Failed to fetch energy usage data: ${response.statusText}`
		);
	}
	const data: ApiHourlyEnergyUsage[] = await response.json();
	return transformEnergyUsageData(data);
};

const fetchStablecoinDataFromApi = async (): Promise<{
	stablecoins: StablecoinData[];
	meterStablecoins: Record<string, StablecoinData[]>;
}> => {
	// replace url with actual endpoint
	const response = await fetch(`${API_BASE_URL}/stablecoins`);
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

export const useBlockStore = create<BlockStore>((set, get) => {
	// Initialize with mock data
	const staticHourlyEnergyUsage = generateHourlyEnergyUsage(staticBlockData);
	const staticMeterStablecoins = generateMeterStablecoins(
		staticBlockData,
		stablecoinData
	);

	return {
		blockData: staticBlockData,
		filteredData: [],
		hourlyEnergyUsage: staticHourlyEnergyUsage,
		stablecoinData: stablecoinData,
		allMeterStablecoins: staticMeterStablecoins,

		selectedMeterId: null,
		meterIdBlocks: [],
		meterEnergyUsage: [],
		meterStablecoins: [],

		isLoading: false,
		error: null,
		useMockData: true, // Change to false when endpoint is ready

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
			const results = get().blockData.filter((block: blockData) =>
				block.proposer.toLowerCase().includes(lowercaseQuery)
			);
			set({ filteredData: results });
		},

		searchBlockNumber: (query: string) => {
			const results = get().blockData.filter((block: blockData) =>
				block.number.toString().includes(query)
			);
			set({ filteredData: results });
		},

		clearSearch: () => set({ filteredData: [] }),

		// Meter selection methods (unchanged)
		selectMeterId: (meterId: string) =>
			set((state) => {
				const meterIdBlocks = state.blockData.filter(
					(block) => block.meterId === meterId
				);
				const meterEnergyUsage = state.hourlyEnergyUsage.filter(
					(usage) => usage.meterId === meterId
				);
				const meterStablecoins = state.allMeterStablecoins[meterId] || [];

				return {
					selectedMeterId: meterId,
					meterIdBlocks,
					meterEnergyUsage,
					meterStablecoins,
				};
			}),

		clearSelectedMeterId: () => {
			set({
				selectedMeterId: null,
				meterIdBlocks: [],
				meterEnergyUsage: [],
				meterStablecoins: [],
			});
		},

		// Data fetching methods
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

		fetchEnergyUsageData: async () => {
			const { useMockData } = get();
			if (useMockData) {
				const mockData = generateHourlyEnergyUsage(get().blockData);
				set({ hourlyEnergyUsage: mockData, error: null });
				return;
			}

			set({ isLoading: true, error: null });
			try {
				const apiEnergyData = await fetchEnergyUsageFromApi();
				set({
					hourlyEnergyUsage: apiEnergyData,
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

		fetchStablecoinData: async () => {
			const { useMockData } = get();
			if (useMockData) {
				const mockData = generateMeterStablecoins(
					get().blockData,
					stablecoinData
				);
				set({
					stablecoinData,
					allMeterStablecoins: mockData,
					error: null,
				});
				return;
			}

			set({ isLoading: true, error: null });
			try {
				const { stablecoins, meterStablecoins } =
					await fetchStablecoinDataFromApi();
				set({
					stablecoinData: stablecoins,
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

		clearError: () => set({ error: null }),

		setMockMode: (useMock: boolean) => {
			set({ useMockData: useMock });
			// Refresh all data when switching modes
			if (useMock) {
				get().fetchBlockData();
				get().fetchEnergyUsageData();
				get().fetchStablecoinData();
			} else {
				Promise.all([
					get().fetchBlockData(),
					get().fetchEnergyUsageData(),
					get().fetchStablecoinData(),
				]);
			}
		},
	};
});
