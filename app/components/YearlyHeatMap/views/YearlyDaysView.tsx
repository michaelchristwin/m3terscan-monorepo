import {
	MONTHS_LONG,
	getMonthData,
	getColor,
} from "../../../utils/heatMapUtils";
import { useHeatmapData } from "../../../hooks/useHeatmapData";

export const YearlyDaysView = () => {
	const { data, selectedYear, setSelectedMonth } = useHeatmapData();

	return (
		<div className="p-4 sm:p-8 overflow-x-auto">
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 min-w-max">
				{MONTHS_LONG.map((month, monthIndex) => {
					const monthData = getMonthData(data, monthIndex);
					const daysInMonth = new Date(
						selectedYear,
						monthIndex + 1,
						0
					).getDate();

					return (
						<div
							key={month}
							onClick={() => setSelectedMonth(monthIndex)}
							className="cursor-pointer"
						>
							<p className="text-xs sm:text-sm text-center mb-3">{month}</p>
							<div className="grid grid-cols-7 gap-0.5 sm:gap-1 transition-all duration-200 hover:scale-105">
								{Array.from({ length: daysInMonth }, (_, index) => {
									const dayNumber = index + 1;
									const dayData = monthData.find(
										(item) => item.day === dayNumber
									);
									return (
										<div
											key={dayNumber}
											className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm border border-gray-200"
											style={{
												backgroundColor: dayData
													? getColor(dayData.value)
													: "#f9fafb",
											}}
											title={dayData ? `${dayData.date}: ${dayData.value}` : ""}
										/>
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
