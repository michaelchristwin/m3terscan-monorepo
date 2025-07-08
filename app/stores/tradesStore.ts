import { create } from "zustand";
import { MdSwapHoriz, MdOutlineShoppingCartCheckout } from "react-icons/md";
import { RiFilePaper2Line } from "react-icons/ri";
import { AiOutlineSend } from "react-icons/ai";

import type { ComponentType } from "react";

export interface Trade {
	id: number;
	from: string;
	to: string;
	amount: number;
	icon: ComponentType;
	fromImg: string;
	toImg: string;
}

interface TradesState {
	trades: Trade[];
}

export const useTradesStore = create<TradesState>(() => ({
	trades: [
		{
			id: 1,
			from: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			to: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			amount: 0.5,
			icon: MdSwapHoriz,
			fromImg: "/meter.png",
			toImg: "/meter-orange.png",
		},
		{
			id: 2,
			from: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			to: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			amount: 0.75,
			icon: RiFilePaper2Line,
			fromImg: "/meter.png",
			toImg: "/meter-blue.png",
		},
		{
			id: 3,
			from: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			to: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			amount: 1.0,
			icon: MdOutlineShoppingCartCheckout,
			fromImg: "/meter.png",
			toImg: "/meter-pink.png",
		},
		{
			id: 4,
			from: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			to: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			amount: 0.25,
			icon: AiOutlineSend,
			fromImg: "/meter.png",
			toImg: "/meter-green.png",
		},
		{
			id: 5,
			from: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			to: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			amount: 0.5,
			icon: MdSwapHoriz,
			fromImg: "/meter.png",
			toImg: "/meter-army.png",
		},
		{
			id: 6,
			from: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			to: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			amount: 0.9,
			icon: AiOutlineSend,
			fromImg: "/meter.png",
			toImg: "/meter-orange.png",
		},
		{
			id: 7,
			from: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			to: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			amount: 1.3,
			icon: MdOutlineShoppingCartCheckout,
			fromImg: "/meter.png",
			toImg: "/meter-blue.png",
		},
		{
			id: 8,
			from: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			to: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			amount: 0.65,
			icon: RiFilePaper2Line,
			fromImg: "/meter.png",
			toImg: "/meter-pink.png",
		},
		{
			id: 9,
			from: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			to: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			amount: 0.42,
			icon: MdSwapHoriz,
			fromImg: "/meter.png",
			toImg: "/meter-green.png",
		},
		{
			id: 10,
			from: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			to: "0x386888AB83c7f2ac174e3eFfB75d39578733E0e6",
			amount: 2.0,
			icon: AiOutlineSend,
			fromImg: "/meter.png",
			toImg: "/meter-army.png",
		},
	],
}));
