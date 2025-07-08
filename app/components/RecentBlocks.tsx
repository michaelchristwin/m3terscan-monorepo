import { useState } from "react";
import { useBlockStore } from "../stores/blockStore";
import { FaSlidersH } from "react-icons/fa";
import FilterBlocks from "./FilterBlocks";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function RecentBlocks() {
	const blockData = useBlockStore((state) => state.blockData);
	const [showAll, setShowAll] = useState(false);
	const [showFilters, setShowFilters] = useState(false);
	const [filters, setFilters] = useState({
		status: "",
		proposer: "",
	});
	const navigate = useRouter();

	// const handleRowClick =
	// 	(proposer: string) => (e: React.MouseEvent<HTMLTableRowElement>) => {
	// 		e.preventDefault();
	// 		selectMeterId(proposer);
	// 	};

	// Apply filters to block data
	const filteredBlocks = blockData.filter((block) => {
		const statusMatch = !filters.status || block.status === filters.status;
		const proposerMatch =
			!filters.proposer ||
			block.proposer.toLowerCase().includes(filters.proposer.toLowerCase());
		return statusMatch && proposerMatch;
	});

	const visibleBlocks = showAll ? filteredBlocks : filteredBlocks.slice(0, 5);

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFilters((prev) => ({ ...prev, [name]: value }));
	};

	const handleClearFilters = () => {
		setFilters({ status: "", proposer: "" });
		setShowFilters(false);
	};

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
			className="bg-[var(--background-primary)] text-[var(--text-secondary)] rounded-xl p-4 relative"
		>
			<motion.div className="flex justify-between items-center mb-4">
				<h3 className="text-sm font-medium">
					{showAll ? `All Blocks (${blockData.length})` : `Last 5 blocks `}
				</h3>
				<div className="flex items-center gap-5">
					{showAll && (
						<motion.div className="relative" layout>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								transition={{ type: "spring", stiffness: 300 }}
								onClick={() => setShowFilters(!showFilters)}
								className="p-1 hover:text-[var(--icon-color)] transition-colors cursor-pointer"
							>
								<FaSlidersH />
							</motion.button>

							{/* Filter Dropdown */}
							<AnimatePresence>
								{showFilters && (
									<FilterBlocks
										filters={filters}
										onFilterChange={handleFilterChange}
										onClearFilters={handleClearFilters}
										onClose={() => setShowFilters(false)}
									/>
								)}
							</AnimatePresence>
						</motion.div>
					)}

					{blockData.length > 5 && (
						<a
							onClick={() => setShowAll(!showAll)}
							className="text-sm cursor-pointer"
						>
							{showAll ? "See less" : "See more"}
						</a>
					)}
				</div>
			</motion.div>

			<div className="relative">
				<div className="overflow-x-auto pb-2 -mx-4 px-4">
					<div className="min-w-[600px]">
						<table className="w-full">
							{/* Table Head */}
							<thead>
								<tr className="text-left border-b border-[var(--background-secondary)]">
									<th className="pb-2 pr-4 font-normal whitespace-nowrap">
										<small>Block number</small>
									</th>
									<th className="pb-2 pr-4 font-normal whitespace-nowrap">
										<small>State Address</small>
									</th>
									<th className="pb-2 pr-4 font-normal whitespace-nowrap">
										<small>Status</small>
									</th>
									<th className="pb-2 pr-4 font-normal whitespace-nowrap">
										<small>Date/Time</small>
									</th>
									<th className="pb-2 font-normal whitespace-nowrap">
										<small>Proposal</small>
									</th>
								</tr>
							</thead>

							{/* Table Body */}
							<tbody className="divide-y divide-[var(--background-secondary)]">
								<AnimatePresence>
									{visibleBlocks.length > 0 ? (
										visibleBlocks.map((block, index) => (
											<motion.tr
												custom={index}
												initial="hidden"
												animate="visible"
												variants={rowVariants}
												key={index}
												onClick={() =>
													navigate.push(`/meter/${block.meterId}/chart`)
												}
												className="text-sm hover:bg-[var(--background-secondary)] transition-colors"
											>
												<td className="py-3 pr-4 font-medium whitespace-nowrap">
													Block {block.number}
												</td>
												<td className="py-3 pr-4 truncate max-w-[120px]">
													<span>{block.address}</span>
												</td>
												<td
													className={`py-3 pr-4 font-medium whitespace-nowrap ${
														block.status === "Successful"
															? "text-[var(--color-success)]"
															: "text-[var(--color-invalid)]"
													}`}
												>
													{block.status}
												</td>
												<td className="py-3 pr-4 whitespace-nowrap">
													<span>{block.date}</span>
													<span className="text-xs font-extralight ml-1">
														{block.time}
													</span>
												</td>
												<td className="py-3 whitespace-nowrap text-xs">
													{block.proposer}
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
