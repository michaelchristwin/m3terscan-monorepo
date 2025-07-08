import { useActivityStore } from "../stores/activityStore";
import { formatAddress } from "../utils/formatAddress";
import { motion, AnimatePresence } from "framer-motion";
import { FaSliders } from "react-icons/fa6";

const Activity = () => {
	const activities = useActivityStore((state) => state.activities);

	if (activities.length === 0) {
		return <p className="text-center py-4">No recent activity.</p>;
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className=" p-4"
		>
			<div className="flex items-center justify-between mb-4">
				<motion.h3
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3 }}
				>
					Activity
				</motion.h3>

				<FaSliders className=" hover:text-[var(--icon-color)] transition-colors cursor-pointer" />
			</div>

			<div className="overflow-x-auto">
				<table className="w-full text-left text-sm">
					<thead>
						<tr className="bg-[var(--background-secondary)] text-[var(--icon-color)]">
							<th className="p-4 ">Time</th>
							<th className="p-4 ">Energy</th>
							<th className="p-4 ">Signature</th>
							<th className="p-4 ">Value</th>
							<th className="p-4 ">Status</th>
						</tr>
					</thead>
					<tbody>
						<AnimatePresence>
							{activities.map((item, index) => (
								<motion.tr
									key={index}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.3, delay: index * 0.05 }}
									className="even:bg-[var(--background-primary)]"
								>
									<td className="py-4 px-4">
										<span>{item.time}</span>
									</td>
									<td className="py-4 px-4">
										<span>{item.energy}</span>
									</td>
									<td className="p-4">
										<span className="block md:hidden">
											{formatAddress(item.signature)}
										</span>
										<span className="hidden md:block">{item.signature}</span>
									</td>
									<td className="py-4 px-4">
										<span>{item.value}</span>
									</td>
									<td
										className={`py-4 px-4 font-medium ${
											item.validity === "Valid"
												? "text-[var(--color-success)]"
												: "text-[var(--color-invalid)]"
										}`}
									>
										<span>{item.validity}</span>
									</td>
								</motion.tr>
							))}
						</AnimatePresence>
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};

export default Activity;
