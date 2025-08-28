// import { useState } from "react";
import { useEffect, useState } from "react";
import { useBlockStore } from "../stores/blockStore";
import { motion, AnimatePresence } from "framer-motion";

export default function RecentBlocks() {
	const { isLoading, chainLength, getChainLength } = useBlockStore();

	const [transactions, setTransactions] = useState<any[] | undefined>(undefined)
	const [loadingTx, setLoadingTx] = useState(false)

	useEffect(() => {
		if (!chainLength && !transactions) (async () => {
			await Promise.all([getChainLength(), loadTransactions()]);
		})()
	}, [getChainLength, chainLength, transactions])

	const loadTransactions = () => {
		setLoadingTx(true)
		fetch("/api/transactions")
			.then(async res => {
				const value: Array<any> = (await res.json()).result?.rows
				setTransactions(value.sort((a, b) => new Date(b.block_time).getTime() - new Date(a.block_time).getTime()))
				setLoadingTx(false)
			})
	}

	const rowVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.05,
			},
		}),
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="border-2 border-[var(--background-primary)] text-[var(--text-secondary)] rounded-md relative mb-20"
		>
			<div className="relative">
				<div className="overflow-x-auto">
					<p className="px-3 py-2">Latest Blocks</p>
					<div className="min-w-[600px]">
						<table className="w-full border-[var(--background-secondary)]">
							{/* Table Head */}
							<thead>
								<tr className="text-left p-3 border-b border-[var(--background-secondary)]">
									<th className="py-3 px-4 font-normal whitespace-nowrap">
										<small>Block number</small>
									</th>
									<th className="py-3 px-4 font-normal whitespace-nowrap">
										<small>Block Transaction</small>
									</th>
									<th className="py-3 px-4 font-normal whitespace-nowrap">
										<small>Status</small>
									</th>
									<th className="py-3 px-4 font-normal whitespace-nowrap">
										<small>Date/Time</small>
									</th>
									<th className="py-3 px-4 font-normal whitespace-nowrap">
										<small>Proposal</small>
									</th>
								</tr>
							</thead>
							{
								isLoading || loadingTx ? <p>Loading...</p>
									: (
										<tbody className="divide-y divide-[var(--background-secondary)]">
											<AnimatePresence>
												{transactions && transactions.length > 0 ? (
													transactions.map((tx, index) => (
														<motion.tr
															custom={index}
															initial="hidden"
															animate="visible"
															variants={rowVariants}
															key={index}
															className="text-sm hover:bg-[var(--background-secondary)] transition-colors"
														>
															<td className="py-3 px-4 font-medium whitespace-nowrap">
																Block { chainLength - BigInt(index) }
															</td>
															<td className="py-3 px-4 truncate max-w-[120px]">
																<a className=" text-blue-400" target="_blank" href={`https://sepolia.etherscan.io/tx/${tx.hash}`}>{ tx.hash }</a>
															</td>
															<td className="py-3 text-[var(--color-success)] px-4 font-medium whitespace-nowrap">
																Successful
															</td>
															<td className="py-3 pr-4 whitespace-nowrap">
																<span>{ tx.block_time }</span>
															</td>
															<td className="py-3 px-4 font-medium whitespace-nowrap">
																{ tx.from }
															</td>
														</motion.tr>
													))
												) : (
													<motion.tr
														initial={{ opacity: 0 }}
														animate={{ opacity: 1 }}
														transition={{ duration: 0.3 }}
													>
														<td
															colSpan={5}
															className="py-4 text-center text-sm text-[var(--text-secondary)]"
														>
															No blocks match your filters
														</td>
													</motion.tr>
												)}
											</AnimatePresence>
										</tbody>
									)
							}
						</table>
					</div>
				</div>

				<div className="md:hidden text-center mt-2 text-xs text-[var(--text-secondary)]">
					← Scroll horizontally →
				</div>
			</div>
		</motion.div>
	);
}
