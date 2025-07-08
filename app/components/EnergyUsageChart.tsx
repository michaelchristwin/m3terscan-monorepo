import { useEffect, useRef } from "react";
import {
	Chart,
	BarController,
	BarElement,
	LinearScale,
	CategoryScale,
	Tooltip,
	Legend,
} from "chart.js";
import { useBlockData } from "../hooks/useBlockData";
import { motion } from "framer-motion";

Chart.register(
	BarController,
	BarElement,
	LinearScale,
	CategoryScale,
	Tooltip,
	Legend
);

const EnergyUsageChart = () => {
	const {
		meterEnergyUsage: usage,
		refreshEnergyData,
		isLoading,
		error,
	} = useBlockData();

	const chartRef = useRef<HTMLCanvasElement>(null);
	const chartInstance = useRef<Chart | null>(null);

	// Refresh data on mount
	useEffect(() => {
		refreshEnergyData();
	}, [refreshEnergyData]);

	useEffect(() => {
		if (isLoading || !usage || usage.length === 0) return;

		if (chartRef.current) {
			// Sort usage by hour for chronological display
			const sortedUsage = [...usage].sort((a, b) => {
				const hourA = parseInt(a.hour.split(":")[0]);
				const hourB = parseInt(b.hour.split(":")[0]);
				return hourA - hourB;
			});

			const labels = sortedUsage.map((entry) => {
				const [hour] = entry.hour.split(":");
				return `${hour}:00`;
			});

			const data = sortedUsage.map((entry) => entry.energyUsed);
			const LOW_USAGE_THRESHOLD = 10;

			if (chartInstance.current) {
				chartInstance.current.destroy();
			}

			const ctx = chartRef.current.getContext("2d");
			if (!ctx) return;

			chartInstance.current = new Chart(ctx, {
				type: "bar",
				data: {
					labels: labels,
					datasets: [
						{
							label: "Energy Usage",
							data: data,
							backgroundColor: (context) => {
								const value = context.dataset.data[context.dataIndex] as number;
								return value < LOW_USAGE_THRESHOLD ? "#fc7319" : "#73c336";
							},
							borderColor: (context) => {
								const value = context.dataset.data[context.dataIndex] as number;
								return value < LOW_USAGE_THRESHOLD ? "#fc7319" : "#73c336";
							},
							borderWidth: 1,
							borderRadius: 4,
						},
					],
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						datalabels: {
							display: false,
						},
						legend: {
							position: "bottom",
							align: "start",
							labels: {
								usePointStyle: true,
								pointStyle: "circle",
								padding: 25,
								boxWidth: 6,
								boxHeight: 6,
								color: getComputedStyle(document.documentElement)
									.getPropertyValue("--text-secondary")
									.trim(),
								font: {
									size: 12,
								},
								generateLabels: () => {
									return [
										{
											text: "High",
											fillStyle: "#73c336",
											strokeStyle: "#73c336",
										},
										{
											text: "Low ",
											fillStyle: "#fc7319",
											strokeStyle: "#fc7319",
										},
									];
								},
							},
						},
						tooltip: {
							callbacks: {
								label: (context) => {
									const value = context.parsed.y;
									const usageLevel =
										value < LOW_USAGE_THRESHOLD ? " (Low)" : "";
									return `${value.toFixed(2)} kWh${usageLevel} at ${
										context.label
									}`;
								},
								labelColor: (context) => {
									const value = context.dataset.data[
										context.dataIndex
									] as number;
									return {
										borderColor:
											value < LOW_USAGE_THRESHOLD ? "#fc7319" : "#73c336",
										backgroundColor:
											value < LOW_USAGE_THRESHOLD ? "#fc7319" : "#73c336",
										borderWidth: 1,
										borderRadius: 2,
									};
								},
							},
						},
					},
					scales: {
						y: {
							beginAtZero: true,
							ticks: {
								stepSize: 4,
							},
							title: {
								display: false,
								text: "kWh",
							},
							grid: { display: false },
						},
						x: {
							title: {
								display: false,
								text: "Hour of Day",
							},
							ticks: {
								autoSkip: true,
								maxTicksLimit: 24,
								font: {
									size: 10,
								},
							},
							grid: { display: false },
						},
					},
				},
			});
		}

		return () => {
			if (chartInstance.current) {
				chartInstance.current.destroy();
			}
		};
	}, [usage, isLoading]);

	if (isLoading) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className="p-4 bg-[var(--background-primary)] text-[var(--text-secondary)] rounded-lg"
			>
				<div className="flex justify-between items-center mb-6">
					<div className="h-6 w-40 bg-[var(--background-secondary)] rounded animate-pulse"></div>
				</div>
				<div className="relative h-80">
					<div className="h-full w-full bg-[var(--background-secondary)] rounded animate-pulse"></div>
				</div>
			</motion.div>
		);
	}

	if (error) {
		return <div className="p-4 text-red-500">Error: {error}</div>;
	}

	if (!usage || usage.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className="p-4 bg-[var(--background-primary)] text-[var(--text-secondary)] rounded-lg"
			>
				<div className="flex justify-between items-center mb-6">
					<div className="h-6 w-40 bg-[var(--background-secondary)] rounded animate-pulse"></div>
				</div>
				<div className="relative h-80">
					<div className="h-full w-full bg-[var(--background-secondary)] rounded animate-pulse"></div>
				</div>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="p-4 bg-[var(--background-primary)] text-[var(--text-secondary)] rounded-lg "
		>
			<div className="flex justify-between items-center mb-6">
				<h3>Energy usage by hour</h3>
				{/* <button
					onClick={refreshEnergyData}
					className="px-3 py-1 text-sm bg-[var(--background-secondary)] rounded hover:bg-[var(--background-tertiary)]"
				>
					Refresh
				</button> */}
			</div>
			<div className="relative h-80">
				<canvas ref={chartRef} />
			</div>
		</motion.div>
	);
};

export default EnergyUsageChart;
