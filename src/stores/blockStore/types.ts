export interface BlockData {
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
	value: number;
}

export interface DayData {
	date: string;
	value: number;
	month: number;
	day: number;
	weekday: number;
	week: number;
	meterId: string;
}

// API Response Types
export interface ApiBlockData {
	blockNumber: number;
	blockAddress: string;
	blockStatus: string;
	createdAt: string;
	proposerName: string;
	meterId: string;
}

export interface ApiHourlyEnergyUsage {
	meterId: string;
	hour: string;
	energyUsedKwh: number;
	readingTimestamp: string;
}

export interface ApiStablecoinData {
	currencySymbol: string;
	networkName: string;
	usdValue: number;
}

export interface ApiHeatmapData {
	meterId: string;
	date: string;
	energyValue: number;
	month: number;
	day: number;
	weekday: number;
	week: number;
}

// Store Type
export interface BlockStore {
	blockData: BlockData[];
	filteredData: BlockData[];
	hourlyEnergyUsage: HourlyEnergyUsage[];
	stablecoinData: StablecoinData[];
	heatmapData: DayData[];
	allHourlyEnergyUsage: HourlyEnergyUsage[];
	allStablecoinData: StablecoinData[];
	allHeatmapData: DayData[];
	allMeterStablecoins: Record<string, StablecoinData[]>;

	heatmapViewMode: "yearly-weeks" | "yearly-days" | "monthly";
	heatmapSelectedYear: number;
	heatmapSelectedMonth: number | null;

	selectedMeterId: string | null;
	meterIdBlocks: BlockData[];
	meterEnergyUsage: HourlyEnergyUsage[];
	meterStablecoins: StablecoinData[];

	isLoading: boolean;
	error: string | null;
	useMockData: boolean;

	// Methods
	setHeatmapYear: (year: number) => void;
	setHeatmapMonth: (month: number | null) => void;
	setHeatmapViewMode: (
		mode: "yearly-weeks" | "yearly-days" | "monthly"
	) => void;
	generateHeatmapData: (year: number, meterId?: string) => void;

	searchBlocks: (query: string) => void;
	searchProposer: (query: string) => void;
	searchBlockNumber: (query: string) => void;
	clearSearch: () => void;

	selectMeterId: (meterId: string) => void;
	clearSelectedMeterId: () => void;

	fetchBlockData: () => Promise<void>;
	fetchEnergyUsageData: (meterId?: string) => Promise<void>;
	fetchStablecoinData: (meterId?: string) => Promise<void>;
	fetchHeatmapData: (meterId?: string) => Promise<void>;
	clearError: () => void;

	setMockMode: (useMock: boolean) => void;
}
