'use client'

import EnergyUsageChart from "../../../components/EnergyUsageChart";
import TokenChart from "../../../components/TokenChart";
import YearlyHeatmap from "../../../components/YearlyHeatMap/YearlyHeatMap";

const Chart = () => {
	return (
		<div className="lg:gap-2 lg:grid lg:grid-cols-[10fr_2fr]">
			<div>
				<EnergyUsageChart />
				<YearlyHeatmap />
			</div>
			<div className="lg:mt-22">
				<TokenChart />
			</div>
		</div>
	);
};

export default Chart;
