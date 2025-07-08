import {
	MONTHS_SHORT,
	getWeekAverage,
	getColor,
} from "../../../utils/heatMapUtils";
import { useHeatmapData } from "../../../hooks/useHeatmapData";

export const YearlyWeeksView = () => {
	const { data, setSelectedMonth } = useHeatmapData();

	return (
		<div className="rounded-2xl p-4 sm:p-8 overflow-x-auto">
			<div className="grid grid-cols-12 gap-2 sm:gap-4">
				{MONTHS_SHORT.map((month, monthIndex) => {
					const weeks = [1, 2, 3, 4];

					return (
						<div
							key={month}
							onClick={() => setSelectedMonth(monthIndex)}
							className="cursor-pointer transition-all duration-200 hover:scale-105"
						>
							<p className="text-xs sm:text-sm text-center mb-3">{month}</p>
							<div className="space-y-1 sm:space-y-2 flex flex-col">
								{weeks.map((week) => {
									const avgValue = getWeekAverage(data, monthIndex, week);
									console.log("Week Average Value:", avgValue);

									return (
										<div
											key={week}
											className="w-8 h-5 sm:w-12 sm:h-8 rounded"
											style={{ backgroundColor: getColor(avgValue) }}
											title={`${month} Week ${week}: ${Math.round(avgValue)}`}
										></div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
