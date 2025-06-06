import { Link, Outlet, useLocation } from "react-router-dom";
import { useBlockStore } from "../state/store";
import { GoPulse } from "react-icons/go";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsClipboardCheck } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa6";
import { RiGeminiLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

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
		<div className="flex h-screen">
			<aside className="w-16 md:w-52 lg:w-64  p-4 flex-shrink-0 max-h-full sticky top-0 pr-1">
				<div className=" mb-6 flex flex-col items-center justify-center">
					<img
						src="/meter.png"
						alt="meter"
						className="w-full md:w-12 lg:w-14 h-auto"
					/>
					<span>{meterId}</span>
				</div>
				<nav className="space-y-4 sm:space-y-6 md:space-y-6 lg:space-y-6">
					{navItems.map((item) => (
						<Link
							key={item.path}
							to={item.path}
							className={`flex items-center justify-center md:justify-start lg:justify-start px-3 py-3 rounded-2xl group ${
								location.pathname.includes(item.path)
									? "md:bg-[var(--accent-color-tertiary)]" // Background only on md+ screens
									: ""
							} md:hover:bg-[var(--accent-color)]`} // Hover bg only on md+ screens
							title={item.name}
						>
							<div
								className={`text-md p-1.5 flex items-center justify-center rounded-lg lg:mr-4 
          group-hover:text-[var(--icon-color)] 
          group-hover:bg-[var(--accent-color)]  ${
						location.pathname.includes(item.path)
							? "md:bg-[var(--accent-color-secondary)] text-[var(--icon-color)]" // Background only on md+ screens
							: "bg-[var(--background-secondary)] text-[var(--text)]"
					}`}
							>
								{item.icon}
							</div>
							<h3
								className={`ml-4 hidden md:block lg:block md:group-hover:text-[var(--icon-color)] ${
									location.pathname.includes(item.path)
										? "text-[var(--icon-color)]"
										: "text-[var(--text)]"
								}`}
							>
								{item.name}
							</h3>
						</Link>
					))}
				</nav>
			</aside>

			{/* Main content */}
			<main className="flex-1 overflow-auto p md:p-6 ">
				<Outlet />
			</main>
		</div>
	);
};

export default DashboardLayout;
