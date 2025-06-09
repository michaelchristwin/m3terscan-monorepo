import { Link, Outlet, useLocation } from "react-router-dom";
import { useBlockStore } from "../state/store";
import { GoPulse } from "react-icons/go";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsClipboardCheck } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa6";
import { RiGeminiLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const navItems = [
	{ name: "Charts", icon: <FaChartLine />, path: "chart" },
	{ name: "Overview", icon: <BsClipboardCheck />, path: "overview" },
	{ name: "Trades", icon: <MdOutlineShoppingCart />, path: "trades" },
	{ name: "Activity", icon: <GoPulse />, path: "activity" },
	{ name: "Ask Meter AI", icon: <RiGeminiLine />, path: "ask-ai" },
];

const DashboardLayout = () => {
	const { meterId } = useParams();
	const { selectMeterId } = useBlockStore();
	const location = useLocation();

	useEffect(() => {
		if (meterId) {
			selectMeterId(meterId);
		}
	}, [meterId, selectMeterId]);
	// const clearSelectedMeterId = useBlockStore(
	// 	(state) => state.clearSelectedMeterId
	// );
	// const selectedMeterId = useBlockStore((state) => state.selectedMeterId);

	return (
		<div className="flex">
			<aside className="w-16 md:w-52 lg:w-64 p-4 flex-shrink-0 h-screen sticky top-0 pr-1">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="mb-6 flex flex-col items-center justify-center"
				>
					<img
						src="/meter.png"
						alt="meter"
						className="w-full md:w-12 lg:w-14 h-auto"
					/>
					<motion.span
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
					>
						{meterId}
					</motion.span>
				</motion.div>

				<nav className="space-y-4 sm:space-y-6 md:space-y-6 lg:space-y-6">
					{navItems.map((item, index) => (
						<motion.div
							key={item.path}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.2 }}
						>
							<Link
								to={item.path}
								className={`flex items-center justify-center md:justify-start lg:justify-start px-3 py-3 rounded-2xl group ${
									location.pathname.includes(item.path)
										? "md:bg-[var(--accent-color-tertiary)]"
										: ""
								} md:hover:bg-[var(--accent-color)]`}
								title={item.name}
							>
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className={`text-md p-1.5 flex items-center justify-center rounded-lg lg:mr-4 
              group-hover:text-[var(--icon-color)] 
              group-hover:bg-[var(--accent-color)] ${
								location.pathname.includes(item.path)
									? "md:bg-[var(--accent-color-secondary)] text-[var(--icon-color)]"
									: "bg-[var(--background-secondary)] text-[var(--text)]"
							}`}
								>
									{item.icon}
								</motion.div>
								<motion.h3
									className={`ml-4 hidden md:block lg:block md:group-hover:text-[var(--icon-color)] ${
										location.pathname.includes(item.path)
											? "text-[var(--icon-color)]"
											: "text-[var(--text)]"
									}`}
								>
									{item.name}
								</motion.h3>
							</Link>
						</motion.div>
					))}
				</nav>
			</aside>

			{/* Main content */}
			<main className="flex-1 overflow-auto  ">
				<Outlet />
			</main>
		</div>
	);
};

export default DashboardLayout;
