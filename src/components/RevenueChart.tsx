import { useCardStore } from "../state/cardStore";
import { Bar, Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import type { TooltipItem } from "chart.js";
import { useState } from "react";
import { formatCardValue } from "../utils/numberFormat";
import { BarChart2, LineChart } from "lucide-react"; // or use react-icons

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const RevenueChart = () => {
	const { monthlyCardData } = useCardStore();
	const [showCurrentYear, setShowCurrentYear] = useState(true);
	const [chartType, setChartType] = useState<"bar" | "line">("line");

	const currentYear = new Date().getFullYear();
	const filteredData = monthlyCardData.filter((monthData) =>
		showCurrentYear
			? monthData.year === currentYear
			: monthData.year === currentYear - 1
	);

	const revenueData = filteredData.map((monthData) => {
		const revenueMetric = monthData.metrics.find(
			(metric) => metric.title === "Total Revenue"
		);
		return Number(revenueMetric?.value) || 0;
	});

	const chartData = {
		labels: filteredData.map((monthData) => monthData.month),
		datasets: [
			{
				label: "Total Revenue ($)",
				data: revenueData,
				backgroundColor: "#fc7319",
				borderColor: "#fc7319",
				borderWidth: 2,
				borderRadius: 6,
				fill: false,
				tension: 0.35, // for line chart smoothness
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			datalabels: {
				display: false,
			},
			legend: {
				display: false,
			},
			tooltip: {
				callbacks: {
					label: (context: TooltipItem<"bar" | "line">) => {
						const rawValue = context.raw as number;
						return `$${rawValue.toLocaleString()}`;
					},
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					stepSize: 10000,
					callback: (value: number | string) =>
						formatCardValue(value, { isCurrency: true }),
				},
				title: {
					display: false,
					text: "Amount ($)",
					font: { weight: 600, family: "Poppins" },
				},
				grid: { display: false },
			},
			x: {
				title: {
					display: false,
					text: "Month",
					font: { weight: 600, family: "Poppins" },
				},
				grid: { display: false },
			},
		},
	};

	return (
		<div className="bg-[var(--background-primary)] text-[var(--text-secondary)] p-6 rounded-xl mb-4">
			<div className="flex justify-between items-center mb-4">
				{/* Year toggle */}
				<div className="flex gap-2 text-sm sm:text-base">
					<button
						onClick={() => setShowCurrentYear(false)}
						className={`px-2 py-1 sm:px-3 sm:py-1 rounded-md ${
							!showCurrentYear
								? "bg-[var(--icon-color)] text-[var(--accent-color)]"
								: "bg-[var(--background-secondary)] text-[var(--text-secondary)]"
						}`}
					>
						{currentYear - 1}
					</button>
					<button
						onClick={() => setShowCurrentYear(true)}
						className={`px-2 py-1 sm:px-3 sm:py-1 rounded-md ${
							showCurrentYear
								? "bg-[var(--icon-color)] text-[var(--accent-color)]"
								: "bg-[var(--background-secondary)] text-[var(--text-secondary)]"
						}`}
					>
						{currentYear}
					</button>
				</div>

				{/* chart toggle */}
				<div className="flex items-center gap-2 text-sm sm:text-base">
					<button
						onClick={() => setChartType("bar")}
						className={`p-1.5 sm:p-2 rounded-md ${
							chartType === "bar"
								? "bg-[var(--icon-color)] text-[var(--accent-color)]"
								: "bg-[var(--background-secondary)] text-[var(--text-secondary)]"
						}`}
					>
						<BarChart2 size={16} className="sm:size-5" />
					</button>
					<button
						onClick={() => setChartType("line")}
						className={`p-1.5 sm:p-2 rounded-md ${
							chartType === "line"
								? "bg-[var(--icon-color)] text-[var(--accent-color)]"
								: "bg-[var(--background-secondary)] text-[var(--text-secondary)]"
						}`}
					>
						<LineChart size={16} className="sm:size-5" />
					</button>
				</div>
			</div>

			<div className="h-80 w-full">
				{chartType === "bar" ? (
					<Bar data={chartData} options={options} className="w-full h-full" />
				) : (
					<Line data={chartData} options={options} className="w-full h-full" />
				)}
			</div>
		</div>
	);
};

export default RevenueChart;
