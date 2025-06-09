import { create } from "zustand";
// Zustand store for managing application state

// For the card data store
// This store manages the card data and monthly card data for the dashboard
// It generates a fixed set of monthly data for the last 12 months
// and provides the latest card data for display on the dashboard.
// The data includes metrics like Total Revenue, Active Users, Market Cap, and Total Regions
// The monthly data is generated with a fixed progression to simulate growth over time
interface CardData {
	title: string;
	value: number | string;
}

interface MonthlyCardData {
	month: string;
	year: number;
	metrics: CardData[];
}

interface CardStore {
	cardData: CardData[];
	monthlyCardData: MonthlyCardData[];
	revenueGrowth: number | string;
}

const generateMonthlyData = () => {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonthIndex = currentDate.getMonth();

	// Predefined growth patterns
	const revenueGrowth = [
		30000, 19500, 22500, 27000, 18000, 34500, 28500, 31500, 33000, 24000, 21000,
		25500,
	];
	const usersGrowth = [
		800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350,
	];
	const marketCapGrowth = [
		8000, 8500, 9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500, 13000,
		13500,
	];
	const regionsGrowth = [
		"3 countries",
		"3 countries",
		"4 countries",
		"4 countries",
		"4 countries",
		"5 countries",
		"5 countries",
		"5 countries",
		"6 countries",
		"6 countries",
		"6 countries",
		"6 countries",
	];

	const monthlyData: MonthlyCardData[] = [];

	for (let i = 0; i < 12; i++) {
		const monthOffset = (currentMonthIndex - 1 - i + 12) % 12;
		const yearOffset = currentMonthIndex - 1 - i < 0 ? 1 : 0;
		const year = currentYear - yearOffset;

		monthlyData.unshift({
			month: months[monthOffset],
			year: year,
			metrics: [
				{ title: "Total Revenue", value: revenueGrowth[i] },
				{ title: "Active Users", value: usersGrowth[i] },
				{ title: "Market Cap", value: marketCapGrowth[i] },
				{ title: "Total Region", value: regionsGrowth[i] },
			],
		});
	}

	return {
		monthlyCardData: monthlyData,
		cardData: monthlyData[monthlyData.length - 1].metrics,
	};
};

export const useCardStore = create<CardStore>(() => {
	const { monthlyCardData, cardData } = generateMonthlyData();
	let revenueGrowth: number | string = 0;

	if (monthlyCardData.length >= 2) {
		const latest = Number(
			monthlyCardData[monthlyCardData.length - 1].metrics[0]?.value ?? 0
		);
		const previous = Number(
			monthlyCardData[monthlyCardData.length - 2].metrics[0]?.value ?? 1
		);

		const revenueGrowthPercentage = ((latest - previous) / previous) * 100;

		revenueGrowth = revenueGrowthPercentage.toFixed(1);
	}
	return {
		cardData,
		monthlyCardData,
		revenueGrowth,
	};
});

// For the block data store
// This store manages the block data for the blockchain application
// It provides functionality to search blocks by proposer or block number
interface blockData {
	number: number;
	address: string;
	status: string;
	date: string;
	time: string;
	proposer: string;
	meterId: string;
}

interface HourlyEnergyUsage {
	meterId: string;
	hour: string;
	energyUsed: number;
	timestamp: string;
}

interface StablecoinData {
	symbol: string;
	network: string;
	value: number; //in USD
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

	// searchmethods
	searchBlocks: (query: string) => void;
	searchProposer: (query: string) => void;
	searchBlockNumber: (query: string) => void;
	clearSearch: () => void;

	// meter selection methods
	selectMeterId: (meterId: string) => void;
	clearSelectedMeterId: () => void;

	// energy usage accessor
	getEnergyUsageForMeter: () => HourlyEnergyUsage[];
	getStableCoinsForMeter: () => StablecoinData[];
}

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

const generateHourlyEnergyUsage = (
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

const generateMeterStablecoins = (
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
const staticHourlyEnergyUsage = generateHourlyEnergyUsage(staticBlockData);
const staticMeterStablecoins = generateMeterStablecoins(
	staticBlockData,
	stablecoinData
);

export const useBlockStore = create<BlockStore>((set, get) => ({
	blockData: staticBlockData,
	filteredData: [],
	hourlyEnergyUsage: staticHourlyEnergyUsage,
	stablecoinData: stablecoinData,
	allMeterStablecoins: staticMeterStablecoins,

	selectedMeterId: null,
	meterIdBlocks: [],
	meterEnergyUsage: [],
	meterStablecoins: [],

	searchBlocks: (query) => {
		const normalizedQuery = query.toLowerCase().trim();

		set((state) => {
			if (!normalizedQuery) {
				return { filteredData: [] };
			}

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

	getEnergyUsageForMeter: () => {
		return get().meterEnergyUsage || [];
	},

	getStableCoinsForMeter: () => {
		return get().meterStablecoins || [];
	},
}));
