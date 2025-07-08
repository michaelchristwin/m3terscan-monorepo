'use client';

import { useEffect } from "react";
import Card from "./Card";
import { useCardData } from "../hooks/useCardData";
import RecentBlocks from "./RecentBlocks";
import RevenueChart from "./RevenueChart";
import { motion } from "framer-motion";
import { formatCardValue } from "../utils/numberFormat";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const container = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

const Home = () => {
	const { cardData, revenueGrowth, refreshData } = useCardData();

	// Fetch data when component mounts
	useEffect(() => {
		refreshData();
	}, [refreshData]);

	return (
		<main className=" pb-4 px-4 md:px-14 lg:px-20">
			<motion.div
				className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-0 gap-x-10 "
				variants={container}
				initial="hidden"
				animate="visible"
			>
				{cardData.map((card, index) => (
					<Card
						key={index}
						title={card.title}
						value={card.value}
						index={index}
					/>
				))}
			</motion.div>
			<h3>Total Revenue</h3>
			<div className="flex items-center gap-1.5 mb-4">
				<h1>{formatCardValue(cardData[0]?.value || 0)}</h1>
				<span
					className={`flex items-center gap-1 px-2 py-1 rounded ${
						Number(revenueGrowth) >= 0
							? "bg-[var(--color-success)]"
							: "bg-[var(--color-invalid)]"
					}`}
				>
					{revenueGrowth}%
					<span>
						{Number(revenueGrowth) >= 0 ? (
							<ArrowUpRight size={12} />
						) : (
							<ArrowDownRight size={12} />
						)}
					</span>
				</span>
			</div>
			<RevenueChart />

			<h3>Recent Blocks</h3>
			<RecentBlocks />
		</main>
	);
};

export default Home;
