import { useState } from "react";
import { WEEKDAYS, getMonthData, getColor } from "../../../utils/heatMapUtils";
import { HeatmapTooltip } from "../HeatmapTooltip";
import { motion, AnimatePresence } from "framer-motion";
import { useHeatmapData } from "../../../hooks/useHeatmapData";

export const MonthlyView = () => {
	const { data, selectedMonth, selectedYear } = useHeatmapData();

	const [tooltip, setTooltip] = useState({
		show: false,
		x: 0,
		y: 0,
		content: "",
	});

	if (selectedMonth === null) return null;

	const monthData = getMonthData(data, selectedMonth);
	const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
	const firstDayOfWeek = new Date(selectedYear, selectedMonth, 1).getDay();

	const handleMouseEnter = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		content: string
	) => {
		setTooltip({
			show: true,
			x: e.clientX,
			y: e.clientY,
			content,
		});
	};

	const handleMouseLeave = () => {
		setTooltip((prev) => ({ ...prev, show: false }));
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setTooltip((prev) => ({
			...prev,
			x: e.clientX,
			y: e.clientY,
		}));
	};

	// Animation variants
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
				delayChildren: 0.2,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, scale: 0.8 },
		show: { opacity: 1, scale: 1 },
	};

	const weekdayItem = {
		hidden: { opacity: 0, y: -10 },
		show: { opacity: 1, y: 0 },
	};

	return (
		<motion.div
			className="relative rounded-2xl p-4 sm:p-8"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<AnimatePresence>
				{tooltip.show && <HeatmapTooltip {...tooltip} />}
			</AnimatePresence>

			<motion.div
				className="grid grid-cols-7 gap-1 sm:gap-2 mb-2"
				variants={container}
				initial="hidden"
				animate="show"
			>
				{WEEKDAYS.map((day) => (
					<motion.div
						key={day}
						className="text-center text-xs sm:text-sm font-medium py-2"
						variants={weekdayItem}
					>
						<span className="hidden sm:inline">{day}</span>
						<span className="sm:hidden">{day[0]}</span>
					</motion.div>
				))}
			</motion.div>

			<motion.div
				className="grid grid-cols-7 gap-1 sm:gap-2"
				variants={container}
				initial="hidden"
				animate="show"
			>
				{Array.from({ length: firstDayOfWeek }, (_, index) => (
					<div key={`empty-${index}`} className="aspect-square"></div>
				))}

				{Array.from({ length: daysInMonth }, (_, index) => {
					const dayNumber = index + 1;
					const dayData = monthData.find((item) => item.day === dayNumber);
					const content = dayData
						? `${selectedYear}-${selectedMonth + 1}-${dayNumber}: ${
								dayData.value
						  } `
						: `${selectedYear}-${selectedMonth + 1}-${dayNumber}: No Data`;
					return (
						<motion.div
							key={dayNumber}
							className="aspect-square rounded-lg flex items-center justify-center text-xs sm:text-sm text-[var(--light-text)] transition-all duration-200 cursor-pointer hover:shadow-lg"
							style={{
								backgroundColor: dayData
									? getColor(dayData.value)
									: "var(--background)",
							}}
							onMouseEnter={(e) => handleMouseEnter(e, content)}
							onMouseMove={handleMouseMove}
							onMouseLeave={handleMouseLeave}
							variants={item}
							whileHover={{ scale: 0.95 }}
							transition={{ type: "spring", stiffness: 300, damping: 20 }}
						>
							{dayNumber}
						</motion.div>
					);
				})}
			</motion.div>
		</motion.div>
	);
};
