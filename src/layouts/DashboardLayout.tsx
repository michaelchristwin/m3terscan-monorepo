import { Link, Outlet, useLocation } from "react-router-dom";
import { useBlockStore } from "../stores/blockStore";
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

interface NavigationItemProps {
	item: {
		name: string;
		icon: React.ReactNode;
		path: string;
	};
	index: number;
	location: {
		pathname: string;
	};
}

// Side Navigation for Desktop
const SideNavigationItem: React.FC<NavigationItemProps> = ({
	item,
	index,
	location,
}) => {
	return (
		<motion.div
			key={item.path}
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ delay: index * 0.2 }}
		>
			<Link
				to={item.path}
				className={`flex items-center justify-start px-3 py-3 rounded-2xl group ${
					location.pathname.includes(item.path)
						? "bg-[var(--accent-color-tertiary)]"
						: ""
				} hover:bg-[var(--accent-color)]`}
				title={item.name}
			>
				<motion.div
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className={`text-md p-1.5 flex items-center justify-center rounded-lg mr-4 
					group-hover:text-[var(--icon-color)] 
					group-hover:bg-[var(--accent-color)] ${
						location.pathname.includes(item.path)
							? "bg-[var(--accent-color-secondary)] text-[var(--icon-color)]"
							: "bg-[var(--background-secondary)] text-[var(--text)]"
					}`}
				>
					{item.icon}
				</motion.div>
				<motion.h3
					className={`group-hover:text-[var(--icon-color)] ${
						location.pathname.includes(item.path)
							? "text-[var(--icon-color)]"
							: "text-[var(--text)]"
					}`}
				>
					{item.name}
				</motion.h3>
			</Link>
		</motion.div>
	);
};

// Bottom Navigation for Mobile
const BottomNavigationItem: React.FC<NavigationItemProps> = ({
	item,
	location,
}) => {
	const isActive = location.pathname.includes(item.path);

	return (
		<Link
			to={item.path}
			className="flex flex-col items-center justify-center flex-1 relative p-1"
		>
			<motion.div
				whileTap={{ scale: 0.9 }}
				className={`p-2 rounded-xl transition-colors duration-200 ${
					isActive
						? "bg-[var(--accent-color)] text-[var(--icon-color)]"
						: "text-[var(--text-secondary)]"
				}`}
			>
				{item.icon}
			</motion.div>
			<span
				className={`text-xs mt-1 font-medium transition-colors duration-200 text-center ${
					isActive ? "text-[var(--icon-color)]" : "text-[var(--text-secondary)]"
				}`}
			>
				{item.name}
			</span>
			{/* Active indicator */}
			{isActive && (
				<motion.div
					layoutId="activeTab"
					className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[var(--accent-color)] rounded-full"
					initial={false}
					transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
				/>
			)}
		</Link>
	);
};

const DashboardLayout = () => {
	const { meterId } = useParams();
	const { selectMeterId } = useBlockStore();
	const location = useLocation();

	useEffect(() => {
		if (meterId) {
			selectMeterId(meterId);
		}
	}, [meterId, selectMeterId]);

	return (
		<div className="flex flex-col md:flex-row h-screen">
			{/* Side Navigation - Desktop Only */}
			<aside className="hidden lg:flex lg:w-56 p-4 flex-shrink-0 h-screen sticky top-0 pr-1 flex-col ">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="mb-6 flex flex-col items-center justify-center"
				>
					<img src="/meter.png" alt="meter" className="w-12 lg:w-14 h-auto" />
					<motion.span
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
						className="text-sm font-medium mt-2"
					>
						{meterId}
					</motion.span>
				</motion.div>

				<nav className="space-y-4">
					{navItems.map((item, index) => (
						<SideNavigationItem
							key={item.path}
							item={item}
							index={index}
							location={location}
						/>
					))}
				</nav>
			</aside>

			{/* Main content */}
			<main className="flex-1  pb-20 md:pb-0">
				<Outlet />
			</main>

			{/* Bottom Navigation - Mobile Only */}
			<div className="w-full fixed bottom-3.5 grid place-items-center ">
				<motion.nav
					initial={{ y: 100 }}
					animate={{ y: 0 }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
					className="lg:hidden bg-[var(--background-primary)] rounded-3xl px-2 py-1 z-50 shadow-xl md:w-3/5 w-4/5 border-2 border-[var(--background-secondary)]"
				>
					<div className="flex items-center justify-around max-w-md mx-auto">
						{navItems.map((item) => (
							<BottomNavigationItem
								key={item.path}
								item={item}
								index={0}
								location={location}
							/>
						))}
					</div>
				</motion.nav>
			</div>
		</div>
	);
};

export default DashboardLayout;
