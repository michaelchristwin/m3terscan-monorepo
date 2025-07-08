import { useEffect } from "react";
import { YearlyWeeksView } from "./views/YearlyWeeksvView";
import { YearlyDaysView } from "./views/YearlyDaysView";
import { MonthlyView } from "./views/MonthlyView";
import { ViewToggle } from "./controls/ViewToggle";
import { YearSelector } from "./controls/YearSelector";
import { getColor } from "../../utils/heatMapUtils";
import { useHeatmapData } from "../../hooks/useHeatmapData";

export const YearlyHeatmap = () => {
	const { viewMode, isLoading, generateData, selectedYear } = useHeatmapData();

	useEffect(() => {
		generateData(selectedYear);
	}, [generateData, selectedYear]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen ">
				<div className="text-xl ">Generating heatmap data...</div>
			</div>
		);
	}

	const renderView = () => {
		switch (viewMode) {
			case "yearly-weeks":
				return <YearlyWeeksView />;
			case "yearly-days":
				return <YearlyDaysView />;
			case "monthly":
				return <MonthlyView />;
			default:
				return <YearlyWeeksView />;
		}
	};

	return (
		<div className="p-4 bg-[var(--background-primary)] text-[var(--text-secondary)] rounded-lg mt-5">
			<div className="">
				<div className="text-center flex justify-between items-center mb-3">
					<h3>Revenue Heatmap</h3>
					<ViewToggle />
				</div>
				<YearSelector />

				{renderView()}

				<div className="flex justify-end-safe px-6">
					<div className="mt-8 flex items-center justify-center gap-4">
						<span className="text-xs sm:text-sm ">Less</span>
						<div className="flex gap-1">
							{Array.from({ length: 5 }, (_, i) => (
								<div
									key={i}
									className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm "
									style={{ backgroundColor: getColor(i * 25) }}
								/>
							))}
						</div>
						<span className="text-xs sm:text-sm ">More</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default YearlyHeatmap;
