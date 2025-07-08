'use client'

import EnergyUsageChart from "../../../components/EnergyUsageChart";
import TokenChart from "../../../components/TokenChart";
const Chart = () => {
	return (
		<div className="lg:gap-2 lg:grid lg:grid-cols-[10fr_2fr]">
			<div>
				<EnergyUsageChart />
			</div>
			<div className="lg:mt-22">
				<TokenChart />
			</div>
		</div>
	);
};

export default Chart;
