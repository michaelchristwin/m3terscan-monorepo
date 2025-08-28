'use client';

import { useEffect } from "react";
import Card from "./Card";
import { useCardData } from "../hooks/useCardData";
import RecentBlocks from "./RecentBlocks";
// import SearchBar from "./SearchBar";
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
		<div className="">
			{/* <div className="mb-15">
				<SearchBar
					placeholder={"Search "}
				/>
			</div> */}

			{/* <div className="grid grid-cols-3 rounded-md py-3 mb-3 border-2 border-[var(--background-secondary)]">
				<p className="px-5 py-2 border-inherit border-r">
					Transactions <br />
					100
				</p>
				<p className="px-5 py-2 border-inherit border-r">
					Base Tariff <br />
					$0.2
				</p>
				<p className="px-5 py-2 border-inherit border-r">
					Latest Block <br />
					2
				</p>
			</div> */}
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

			<RecentBlocks />
		</div>
	);
};

export default Home;
