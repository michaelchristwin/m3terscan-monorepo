import type { DayData } from "../stores/blockStore/types";

export const getColor = (value: number): string => {
	const intensity = Math.min(Math.max(value / 100, 0), 1);
	const hue = 30; // Orange hue
	const saturation = 83.5;
	const lightness = 91 - intensity * 37;
	return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const getWeekAverage = (
	data: DayData[],
	month: number,
	week: number
): number => {
	const weekData = data.filter(
		(item) => item.month === month && item.week === week && item.value > 0
	);
	if (weekData.length === 0) return 0;
	return weekData.reduce((sum, item) => sum + item.value, 0) / weekData.length;
};

export const getMonthData = (data: DayData[], month: number): DayData[] => {
	return data.filter((item) => item.month === month);
};

export const MONTHS_SHORT = [
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

export const MONTHS_LONG = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const WEEKDAYS = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
