type EnergyUsage = {
	meterId: string;
	hour: string;
	energyUsed: number;
	timestamp: string;
};

type ChartProps = {
	usage: EnergyUsage[];
};

const Chart: React.FC<ChartProps> = ({ usage }) => {
	return (
		<div className="p-4">
			<h2 className="text-xl font-semibold mb-4">Hourly Energy Usage</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{usage.map((entry) => (
					<div
						key={entry.timestamp}
						className="bg-white rounded-xl shadow p-4 flex flex-col justify-between"
					>
						<div className="text-sm text-gray-500">{entry.hour}</div>
						<div className="text-lg font-bold">{entry.energyUsed} kWh</div>
						<div className="text-xs text-gray-400">{entry.timestamp}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Chart;
