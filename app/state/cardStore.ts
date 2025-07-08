import { create } from "zustand";
// Zustand store for managing application state

// For the card data store
// This store manages the card data and monthly card data for the dashboard
// It generates a fixed set of monthly data for the last 12 months
// and provides the latest card data for display on the dashboard.
// The data includes metrics like Total Revenue, Active Users, Market Cap, and Total Regions
// The monthly data is generated with a fixed progression to simulate growth over time
export interface CardData {
	title: string;
	value: number | string;
}

export interface MonthlyCardData {
	month: string;
	year: number;
	metrics: CardData[];
}

// Update to match backend response
interface ApiCardData {
	totalRevenue: number;
	activeUsers: number;
	marketCap: number;
	totalRegions: string;
}

// Update to match backend reponse
interface ApiMonthlyData {
	month: string;
	year: number;
	totalRevenue: number;
	activeUsers: number;
	marketCap: number;
	totalRegions: string;
}

interface CardStore {
	cardData: CardData[];
	monthlyCardData: MonthlyCardData[];
	revenueGrowth: number | string;
	isLoading: boolean;
	error: string | null;

	// Actions
	fetchCardData: () => Promise<void>;
	fetchMonthlyData: () => Promise<void>;
	clearError: () => void;

	// Development mode toggle
	useMockData: boolean;
	setMockMode: (useMock: boolean) => void;
}

export const generateMonthlyData = () => {
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

// Replace later with actual endpoint
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

const fetchCardDataFromApi = async (): Promise<CardData[]> => {
	// replace url with actual endpoint
	const response = await fetch(`${API_BASE_URL}/dashboard/current-metrics`);
	if (!response.ok) {
		throw new Error(`Failed to fetch card data: ${response.statusText}`);
	}

	const data: ApiCardData = await response.json();

	// Transform API response to match CardData interface
	return [
		{ title: "Total Revenue", value: data.totalRevenue },
		{ title: "Active Users", value: data.activeUsers },
		{ title: "Market Cap", value: data.marketCap },
		{ title: "Total Region", value: data.totalRegions },
	];
};

const fetchMonthlyDataFromApi = async (): Promise<MonthlyCardData[]> => {
	// Replace url with actual endpoint
	const response = await fetch(`${API_BASE_URL}/dashboard/monthly-metrics`);
	if (!response.ok) {
		throw new Error(`Failed to fetch monthly data: ${response.statusText}`);
	}

	const data: ApiMonthlyData[] = await response.json();

	// Transform API response to match MonthlyCardData interface
	return data.map((item) => ({
		month: item.month,
		year: item.year,
		metrics: [
			{ title: "Total Revenue", value: item.totalRevenue },
			{ title: "Active Users", value: item.activeUsers },
			{ title: "Market Cap", value: item.marketCap },
			{ title: "Total Region", value: item.totalRegions },
		],
	}));
};

// Calculate revenue growth helper
const calculateRevenueGrowth = (
	monthlyData: MonthlyCardData[]
): number | string => {
	if (monthlyData.length < 2) return 0;

	const latest = Number(
		monthlyData[monthlyData.length - 1].metrics[0]?.value ?? 0
	);
	const previous = Number(
		monthlyData[monthlyData.length - 2].metrics[0]?.value ?? 1
	);

	const revenueGrowthPercentage = ((latest - previous) / previous) * 100;
	return revenueGrowthPercentage.toFixed(1);
};

export const useCardStore = create<CardStore>((set, get) => {
	// Initialize with mock data
	const { monthlyCardData, cardData } = generateMonthlyData();
	const revenueGrowth = calculateRevenueGrowth(monthlyCardData);

	return {
		cardData,
		monthlyCardData,
		revenueGrowth,
		isLoading: false,
		error: null,
		useMockData: false, // Change to false when endpoint is ready

		fetchCardData: async () => {
			const { useMockData } = get();

			if (useMockData) {
				// Use mock data - instant update
				const { cardData: mockCardData } = generateMonthlyData();
				set({ cardData: mockCardData, error: null });
				return;
			}

			// Fetch from API
			set({ isLoading: true, error: null });

			try {
				const apiCardData = await fetchCardDataFromApi();
				set({
					cardData: apiCardData,
					isLoading: false,
					error: null,
				});
			} catch (error) {
				set({
					isLoading: false,
					error:
						error instanceof Error
							? error.message
							: "Failed to fetch card data",
				});
			}
		},

		fetchMonthlyData: async () => {
			const { useMockData } = get();

			if (useMockData) {
				// Use mock data - instant update
				const { monthlyCardData: mockMonthlyData, cardData: mockCardData } =
					generateMonthlyData();
				const mockRevenueGrowth = calculateRevenueGrowth(mockMonthlyData);

				set({
					monthlyCardData: mockMonthlyData,
					cardData: mockCardData,
					revenueGrowth: mockRevenueGrowth,
					error: null,
				});
				return;
			}

			// Fetch from API
			set({ isLoading: true, error: null });

			try {
				const apiMonthlyData = await fetchMonthlyDataFromApi();
				const apiRevenueGrowth = calculateRevenueGrowth(apiMonthlyData);
				const latestCardData =
					apiMonthlyData[apiMonthlyData.length - 1]?.metrics || [];

				set({
					monthlyCardData: apiMonthlyData,
					cardData: latestCardData,
					revenueGrowth: apiRevenueGrowth,
					isLoading: false,
					error: null,
				});
			} catch (error) {
				set({
					isLoading: false,
					error:
						error instanceof Error
							? error.message
							: "Failed to fetch monthly data",
				});
			}
		},

		clearError: () => set({ error: null }),

		setMockMode: (useMock: boolean) => {
			set({ useMockData: useMock });
			// Automatically fetch data when switching modes
			if (useMock) {
				get().fetchMonthlyData();
			} else {
				get().fetchMonthlyData();
			}
		},
	};
});
