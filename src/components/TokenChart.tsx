import { useEffect, useRef, useMemo } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import {
	DoughnutController,
	type Plugin,
	type ChartTypeRegistry,
} from "chart.js";
// import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
// import { useBlockStore } from "../state/blockStore";
import { formatCardValue } from "../utils/numberFormat";
import { motion } from "framer-motion";
import { useBlockData } from "../hooks/useBlockData";
import Loader from "./Loader";

Chart.register(
	DoughnutController,
	ArcElement,
	Tooltip,
	Legend,
	ChartDataLabels
);

interface CenterTextPluginOptions {
	text: string;
	color?: string;
	fontStyle?: string;
	sidePadding?: number;
}

interface ExtendedChartOptions {
	elements?: {
		center?: CenterTextPluginOptions;
	};
}
declare module "chart.js" {
	interface ElementOptionsByType<
		TType extends keyof ChartTypeRegistry = keyof ChartTypeRegistry
	> {
		center?: CenterTextPluginOptions & {
			chartType?: TType;
		};
	}
}

const TokenChart = () => {
	const {
		meterStablecoins: meterStablecoins,
		refreshStablecoinData,
		isLoading,
		error,
	} = useBlockData();

	useEffect(() => {
		refreshStablecoinData();
	}, [refreshStablecoinData]);
	const chartRef = useRef<HTMLCanvasElement>(null);
	const chartInstance = useRef<Chart<"doughnut", number[], string> | null>(
		null
	);

	const backgroundColors = useMemo(
		() => [
			"#92BFFF",
			"#72F1FF",
			"#94E9B8",
			"#646464",
			"#5582E9",
			"#D575ED",
			"#FEA883",
		],
		[]
	);

	useEffect(() => {
		if (isLoading || !meterStablecoins || meterStablecoins.length === 0) return;

		if (!chartRef.current || meterStablecoins.length === 0) return;

		if (chartInstance.current) {
			chartInstance.current.destroy();
		}

		const ctx = chartRef.current.getContext("2d");
		if (!ctx) return;

		const labels = meterStablecoins.map(
			(coin) => `${coin.symbol} on ${coin.network}`
		);
		const data = meterStablecoins.map((coin) => coin.value);
		const total = data.reduce((a, b) => a + b, 0);

		const centerTextPlugin: Plugin<"doughnut"> = {
			id: "centerText",
			beforeDraw(chart: Chart<"doughnut", number[], string>) {
				const options = chart.options as ExtendedChartOptions;
				const centerConfig = options.elements?.center;

				if (centerConfig) {
					const { ctx } = chart;
					const fontStyle = "Poppins";
					const txt = centerConfig.text;
					const canvas = chart.canvas;
					const computedStyle = window.getComputedStyle(canvas);
					const color = computedStyle.color;
					const sidePadding = centerConfig.sidePadding || 20;
					const meta = chart.getDatasetMeta(0);
					const innerRadius = (meta.controller as DoughnutController)
						.innerRadius;
					const sidePaddingCalculated = (sidePadding / 100) * (innerRadius * 2);

					ctx.font = `bold 24px ${fontStyle}`;
					const stringWidth = ctx.measureText(txt).width;
					const elementWidth = innerRadius * 2 - sidePaddingCalculated;

					const fontSizeToUse = Math.min(
						24,
						Math.floor((elementWidth / stringWidth) * 24)
					);
					ctx.font = `bold ${fontSizeToUse}px ${fontStyle}`;
					ctx.fillStyle = color;
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					ctx.fillText(
						txt,
						chart.getDatasetMeta(0).data[0].x,
						chart.getDatasetMeta(0).data[0].y
					);
				}
			},
		};

		chartInstance.current = new Chart<"doughnut", number[], string>(ctx, {
			type: "doughnut",
			data: {
				labels,
				datasets: [
					{
						data,
						backgroundColor: backgroundColors.slice(0, data.length),
						borderWidth: 0,
						borderRadius: 8,
						spacing: 15,
					},
				],
			},
			options: {
				responsive: true,
				cutout: "55%",
				plugins: {
					legend: { display: false },
					tooltip: {
						callbacks: {
							label: (ctx) => `${ctx.label}: $${ctx.formattedValue}`,
						},
					},
					datalabels: {
						display: false,
					},
				},
				elements: {
					center: {
						text: `${formatCardValue(total, { isCurrency: true })}`,
						color: "#000",
						fontStyle: "Poppins",
						sidePadding: 15,
					} as CenterTextPluginOptions,
				},
			},
			plugins: [ChartDataLabels, centerTextPlugin],
		});

		return () => {
			if (chartInstance.current) {
				chartInstance.current.destroy();
			}
		};
	}, [meterStablecoins, backgroundColors, isLoading]);

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <div className="p-4 text-red-500">Error: {error}</div>;
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="flex flex-col items-center p-4"
		>
			<canvas ref={chartRef} className="w-60 h-60" />

			<motion.ul
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4, duration: 0.5 }}
				className="mt-6 space-y-2 text-sm w-full max-w-xs"
			>
				{meterStablecoins.map((coin, idx) => (
					<motion.li
						key={idx}
						initial={{ x: -20, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: 0.5 + idx * 0.1, duration: 0.3 }}
						className="flex justify-between items-center"
					>
						<div className="flex items-center space-x-2">
							<motion.span
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ delay: 0.6 + idx * 0.1, type: "spring" }}
								className="w-3 h-3 rounded-full"
								style={{
									backgroundColor:
										backgroundColors[idx % backgroundColors.length],
								}}
							/>
							<span>
								{coin.symbol} on {coin.network}
							</span>
						</div>
						<motion.span
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.7 + idx * 0.1 }}
						>
							${coin.value}
						</motion.span>
					</motion.li>
				))}
			</motion.ul>
		</motion.div>
	);
};

export default TokenChart;
