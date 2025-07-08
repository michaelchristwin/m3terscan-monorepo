import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";
import { MONTHS_LONG } from "../../../utils/heatMapUtils";
import { useHeatmapData } from "../../../hooks/useHeatmapData";

export const YearSelector = () => {
	const { selectedYear, selectedMonth, setYear, setSelectedMonth, viewMode } =
		useHeatmapData();

	// const isYearlyView =
	// 	viewMode === "yearly-days" || viewMode === "yearly-weeks";
	const isMonthlyView = viewMode === "monthly";

	const handlePrev = () => {
		if (isMonthlyView && selectedMonth !== null) {
			if (selectedMonth === 0) {
				setYear(selectedYear - 1);
				setSelectedMonth(11);
			} else {
				setSelectedMonth(selectedMonth - 1);
			}
		} else {
			setYear(selectedYear - 1);
		}
	};

	const handleNext = () => {
		if (isMonthlyView && selectedMonth !== null) {
			if (selectedMonth === 11) {
				setYear(selectedYear + 1);
				setSelectedMonth(0);
			} else {
				setSelectedMonth(selectedMonth + 1);
			}
		} else {
			setYear(selectedYear + 1);
		}
	};

	return (
		<div className="flex justify-center gap-2 flex-wrap items-center">
			<div className="flex items-center gap-4">
				<button
					onClick={handlePrev}
					className="p-1 rounded-full bg-[#77FF9D] text-[#28B750] transition-colors"
					aria-label={isMonthlyView ? "Previous month" : "Previous year"}
				>
					<VscTriangleLeft size={20} />
				</button>
				<h3>
					{isMonthlyView && selectedMonth !== null
						? `${MONTHS_LONG[selectedMonth]} ${selectedYear}`
						: selectedYear}
				</h3>
				<button
					onClick={handleNext}
					className="p-1 rounded-full bg-[#77FF9D] text-[#28B750] transition-colors"
					aria-label={isMonthlyView ? "Next month" : "Next year"}
				>
					<VscTriangleRight size={20} />
				</button>
			</div>
		</div>
	);
};
