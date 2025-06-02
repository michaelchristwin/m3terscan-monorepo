import Card from "../components/Card";
import { useCardStore } from "../state/store";
import RecentBlocks from "../components/RecentBlocks";
import RevenueChart from "../components/RevenueChart";
import { motion } from "framer-motion";
import { formatCardValue } from "../utils/numberFormat";

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
	const cardData = useCardStore((state) => state.cardData);
	return (
		<main className=" pb-4 md:px-14 lg:px-20">
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
			<h1>{formatCardValue(cardData[0].value)}</h1>
			<RevenueChart />

			<h3>Recent Blocks</h3>
			<RecentBlocks />
		</main>
	);
};

export default Home;
