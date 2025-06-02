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
}

interface BlockStore {
	blockData: blockData[];
	filteredData: blockData[];
	searchBlocks: (query: string) => void;
	searchProposer: (query: string) => void;
	searchBlockNumber: (query: string) => void;
	clearSearch: () => void;
}

export const useBlockStore = create<BlockStore>((set, get) => ({
	blockData: [
		{
			number: 100,
			address: "0xID1479C185d32EB90533a0Bb36B3FCa5F84A0E6B",
			status: "Successful",
			date: "25/01/2024",
			time: "6:30am",
			proposer: "Christwin. I",
		},
		{
			number: 99,
			address: "0xID1479C185d32EB90533a0Bb36B3FCa5F84A0E6B",
			status: "Successful",
			date: "25/01/2024",
			time: "6:30am",
			proposer: "Jude. G",
		},
		{
			number: 98,
			address: "0xID1479C185d32EB90533a0Bb36B3FCa5F84A0E6B",
			status: "Invalid",
			date: "25/01/2024",
			time: "6:30am",
			proposer: "Christwin. I",
		},
		{
			number: 97,
			address: "0x9C1F7D85b37Eb26FA231bCa23CE394A57DfC4A9D",
			status: "Successful",
			date: "25/01/2024",
			time: "6:31am",
			proposer: "Tina M.",
		},
		{
			number: 96,
			address: "0x6A2E9D72f4D32dDcB402a2d834Cb457D5F8B7c7E",
			status: "Invalid",
			date: "25/01/2024",
			time: "6:31am",
			proposer: "Mark L.",
		},
		{
			number: 95,
			address: "0xA9832D98f54C442DBFD17dB8127d2d894Cb78912",
			status: "Successful",
			date: "25/01/2024",
			time: "6:32am",
			proposer: "Ella K.",
		},
		{
			number: 94,
			address: "0xB37F7C90D85CA0F43EBB56a382EC789CB0F123DC",
			status: "Invalid",
			date: "25/01/2024",
			time: "6:32am",
			proposer: "Tony S.",
		},
		{
			number: 93,
			address: "0x198D76CCF81A6bA83A6FaD3B7f3C3A67f098Fb8E",
			status: "Successful",
			date: "25/01/2024",
			time: "6:33am",
			proposer: "Christwin. I",
		},
		{
			number: 92,
			address: "0xD03eF8B56A6Cc12B3BbE4aEAA10C7cF8A673AcEe",
			status: "Successful",
			date: "25/01/2024",
			time: "6:33am",
			proposer: "Samuel Y.",
		},
		{
			number: 91,
			address: "0x92Bd5CE8d3FdC98a9CfBD12cCd92B1F81FfB6E61",
			status: "Successful",
			date: "25/01/2024",
			time: "6:34am",
			proposer: "Lena R.",
		},
		{
			number: 90,
			address: "0xA31BfD56CBcF9eD728AD97eBbfD9A61C1B543F17",
			status: "Invalid",
			date: "25/01/2024",
			time: "6:34am",
			proposer: "Jude. G",
		},
		{
			number: 89,
			address: "0x1789aD02f3F01FBBdD8f719B35F3Cc556F8C123E",
			status: "Successful",
			date: "25/01/2024",
			time: "6:35am",
			proposer: "Tina M.",
		},
		{
			number: 88,
			address: "0xC3984Ae92dCBF1d2eD62fC891Bb43f0E372C412D",
			status: "Successful",
			date: "25/01/2024",
			time: "6:35am",
			proposer: "Christwin. I",
		},
		{
			number: 87,
			address: "0x7D213F2BdEC15F2984C3f77e63bC5BfE9123A76C",
			status: "Invalid",
			date: "25/01/2024",
			time: "6:36am",
			proposer: "Tony S.",
		},
		{
			number: 86,
			address: "0x5C234Ed8BF8CdDaA451FEfD9822341D89Fe21D3A",
			status: "Successful",
			date: "25/01/2024",
			time: "6:36am",
			proposer: "Ella K.",
		},
		{
			number: 85,
			address: "0x3E87FcA3BdD34D32BdFc9eFe43F9F1A89Ff0Db81",
			status: "Successful",
			date: "25/01/2024",
			time: "6:37am",
			proposer: "Lena R.",
		},
		{
			number: 84,
			address: "0xF7A123D3f12Bd4Ea987DdBCFa7E1fA1A4B0eB12A",
			status: "Invalid",
			date: "25/01/2024",
			time: "6:37am",
			proposer: "Samuel Y.",
		},
		{
			number: 83,
			address: "0xEDFC12BBaF98e4aEA2A9F7dA123bC341EbFF45DC",
			status: "Successful",
			date: "25/01/2024",
			time: "6:38am",
			proposer: "Tina M.",
		},
		{
			number: 82,
			address: "0x234BeD98AAED90cB9DE7B341Fb87BbE1F0EABC12",
			status: "Successful",
			date: "25/01/2024",
			time: "6:38am",
			proposer: "Christwin. I",
		},
		{
			number: 81,
			address: "0x1DC32BdD8ABaFe98Fb89C1D9C78c2BfE4B123D1D",
			status: "Invalid",
			date: "25/01/2024",
			time: "6:39am",
			proposer: "Jude. G",
		},
	],
	filteredData: [],
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
}));
