// src/stores/activityStore.ts
import { create } from "zustand";

interface ActivityItem {
	time: string;
	energy: string; // in kWh
	signature: string;
	value: string; // formerly `status`
	validity: "Valid" | "Invalid";
}

interface ActivityState {
	activities: ActivityItem[];
	filter: string;
	setFilter: (filter: string) => void;
}

export const useActivityStore = create<ActivityState>((set) => ({
	activities: [
		{
			time: "2 mins ago",
			energy: "150 kWh",
			signature: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			value: "0.5 Eth",
			validity: "Valid",
		},
		{
			time: "4 hours ago",
			energy: "150 kWh",
			signature: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			value: "0.5 Eth",
			validity: "Invalid",
		},
		{
			time: "24 hours ago",
			energy: "150 kWh",
			signature: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			value: "0.5 Eth",
			validity: "Valid",
		},
		{
			time: "7 days ago",
			energy: "150 kWh",
			signature: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			value: "0.5 Eth",
			validity: "Invalid",
		},
		{
			time: "7 days ago",
			energy: "150 kWh",
			signature: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			value: "0.5 Eth",
			validity: "Valid",
		},
		{
			time: "7 days ago",
			energy: "150 kWh",
			signature: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			value: "0.5 Eth",
			validity: "Invalid",
		},
		{
			time: "7 days ago",
			energy: "150 kWh",
			signature: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			value: "0.5 Eth",
			validity: "Valid",
		},
		{
			time: "7 days ago",
			energy: "150 kWh",
			signature: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			value: "0.5 Eth",
			validity: "Valid",
		},
	],
	filter: "8hrs",
	setFilter: (filter: string) => set({ filter }),
}));
