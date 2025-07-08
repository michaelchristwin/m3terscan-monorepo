import { useState } from "react";
import { useTradesStore } from "../stores/tradesStore";
import { motion, AnimatePresence } from "framer-motion";
import { formatAddress } from "../utils/formatAddress";

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
};

const Trades = () => {
	const trades = useTradesStore((state) => state.trades);
	const [showAll, setShowAll] = useState(false);

	const visibleTrades = showAll ? trades : trades.slice(0, 5);

	return (
		<section className="flex flex-col items-center justify-center p-4">
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.4 }}
				className="bg-[var(--background-primary)] p-4 rounded-xl w-full md:max-w-max shadow-lg"
			>
				<h3 className="mb-4 text-lg font-semibold">Trades</h3>

				<ul className="space-y-4">
					<AnimatePresence initial={false}>
						{visibleTrades.map((trade) => (
							<motion.li
								key={trade.id}
								variants={itemVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								transition={{ duration: 0.3 }}
								layout
								className="rounded-xl flex items-center justify-between gap-10 px-2 py-2 border-[1.5px] border-[var(--background-secondary)]  "
							>
								<div className="flex flex-col gap-1 items-center">
									<img
										src={trade.fromImg}
										alt="From Robot"
										className="w-10 h-auto rounded-full"
									/>
									<span className="text-xs text-center">
										<span className="block md:hidden">
											{formatAddress(trade.from)}
										</span>
										<span className="hidden md:block">{trade.from}</span>
									</span>
								</div>

								<div className="flex flex-col items-center gap-3">
									<div className="text-xl">
										<trade.icon />
									</div>
									<span className="text-sm">{trade.amount} Eth</span>
								</div>

								<div className="flex flex-col gap-1 items-center">
									<img
										src={trade.toImg}
										alt="To Robot"
										className="w-10 h-auto rounded-full"
									/>
									<span className="text-xs text-center">
										<span className="block md:hidden">
											{formatAddress(trade.to)}
										</span>
										<span className="hidden md:block">{trade.to}</span>
									</span>
								</div>
							</motion.li>
						))}
					</AnimatePresence>
				</ul>

				{trades.length > 5 && (
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
						className="text-center mt-4"
					>
						<button
							className="text-sm "
							onClick={() => setShowAll((prev) => !prev)}
						>
							<a>{showAll ? "See less" : "See more"}</a>
						</button>
					</motion.p>
				)}
			</motion.div>
		</section>
	);
};

export default Trades;
