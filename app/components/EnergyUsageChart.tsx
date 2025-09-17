import { motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { chunkArray } from "@/utils";
import { MeterDataPointEdgeV2 } from "m3ter-graphql-client";
import { use } from "react";

export const description = "An interactive bar chart";

const chartConfig = {
  energy: {
    label: "Energy used",
  },
  hour: {
    label: "Hour",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const EnergyUsageChart = ({
  dataPromise,
}: {
  dataPromise: Promise<MeterDataPointEdgeV2[]>;
}) => {
  const data = use(dataPromise);

  const sortedData = data
    .sort(
      (a, b) =>
        (a.node?.payload?.nonce as number) - (b.node?.payload?.nonce as number)
    )
    .map((v) => v.node?.payload?.energy);
  const chartsData2 = chunkArray(sortedData as number[], 4)
    .map((item) => item.reduce((acc, num) => acc + num, 0))
    .map((energy, i) => {
      return { hour: `${String(i).padStart(2, "0")}:00`, energy };
    });
  console.log(chartsData2);

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
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartsData2}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={10}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="energy"
                  labelFormatter={(value) => value}
                />
              }
            />
            <Bar dataKey={"energy"}>
              {chartsData2.map((entry, index) => {
                let color = "#28B750"; // default
                if (index > 0) {
                  color =
                    entry.energy < chartsData2[index - 1].energy
                      ? "#EB822A"
                      : "#28B750";
                }
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </motion.div>
  );
};

export default EnergyUsageChart;
