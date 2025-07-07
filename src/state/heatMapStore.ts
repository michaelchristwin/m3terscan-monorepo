import { create } from "zustand";

export interface DayData {
	date: string;
	value: number;
	month: number;
	day: number;
	weekday: number;
	week: number;
}

interface HeatmapStore {
	data: DayData[];
	selectedYear: number;
	selectedMonth: number | null;
	viewMode: "yearly-weeks" | "yearly-days" | "monthly";
	isLoading: boolean;
	generateData: (year: number) => void;
	setYear: (year: number) => void;
	setSelectedMonth: (month: number | null) => void;
	setViewMode: (mode: "yearly-weeks" | "yearly-days" | "monthly") => void;
}

export const useHeatmapStore = create<HeatmapStore>((set, get) => ({
	data: [],
	selectedYear: 2025,
	selectedMonth: null,
	viewMode: "yearly-weeks",
	isLoading: false,

	generateData: (year: number) => {
		set({ isLoading: true });

		const data: DayData[] = [];
		const startDate = new Date(year, 0, 1);
		const endDate = new Date(year, 11, 31);

		for (
			let d = new Date(startDate);
			d <= endDate;
			d.setDate(d.getDate() + 1)
		) {
			const date = new Date(d);
			data.push({
				date: date.toISOString().split("T")[0],
				value: Math.floor(Math.random() * 100),
				month: date.getMonth(),
				day: date.getDate(),
				weekday: date.getDay(),
				week: Math.ceil(date.getDate() / 7),
			});
		}

		set({ data, selectedYear: year, isLoading: false });
	},

	setYear: (year: number) => {
		get().generateData(year);
		set({ selectedMonth: null });
	},

	setSelectedMonth: (month: number | null) => {
		set({ selectedMonth: month });
		if (month !== null) {
			set({ viewMode: "monthly" });
		}
	},

	setViewMode: (mode: "yearly-weeks" | "yearly-days" | "monthly") => {
		set({ viewMode: mode });
		if (mode !== "monthly") {
			set({ selectedMonth: null });
		}
	},
}));
