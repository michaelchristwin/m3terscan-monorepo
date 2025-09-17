"use client";

import { m3terClient } from "@/utils/client";
import EnergyUsageChart from "../../../components/EnergyUsageChart";
import TokenChart from "../../../components/TokenChart";
import YearlyHeatmap from "../../../components/YearlyHeatMap/YearlyHeatMap";
import { Suspense } from "react";

const Chart = () => {
  const dataPromise = m3terClient.v2.dataPoints.getMeterDataPoints({
    meterNumber: 0,
    nonces: Array.from({ length: 96 }, (_, i) => i + 1),
  });
  return (
    <div className="lg:gap-2 lg:grid lg:grid-cols-[10fr_2fr]">
      <div>
        <Suspense>
          <EnergyUsageChart dataPromise={dataPromise} />
        </Suspense>
        <YearlyHeatmap />
      </div>
      <div className="lg:mt-22">
        <TokenChart />
      </div>
    </div>
  );
};

export default Chart;
