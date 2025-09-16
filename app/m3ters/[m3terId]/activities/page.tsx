"use client";

import { Suspense, use } from "react";
import { useParams } from "next/navigation";
import { formatAddress } from "../../../utils/formatAddress";
import { motion, AnimatePresence } from "framer-motion";
import { FaSliders } from "react-icons/fa6";
import { m3terClient } from "../../../utils/client";
import { MeterDataPointEdgeV2 } from "m3ter-graphql-client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
const Activity = () => {
  const params = useParams<{ m3terId: string }>();

  const dp = m3terClient.v2.dataPoints.getMeterDataPoints({
    meterNumber: Number(params.m3terId),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Activity
        </motion.h3>

        <FaSliders className=" hover:text-[var(--icon-color)] transition-colors cursor-pointer" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-[var(--background-secondary)] text-[var(--icon-color)]">
              <th className="p-4 ">Time</th>
              <th className="p-4 ">Energy</th>
              <th className="p-4 ">Signature</th>
              <th className="p-4 ">Value</th>
              <th className="p-4 ">Status</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              <Suspense fallback={<div>Loading</div>}>
                <Activities dataPromise={dp} />
              </Suspense>
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Activity;

const Activities = ({
  dataPromise,
}: {
  dataPromise: Promise<MeterDataPointEdgeV2[]>;
}) => {
  const data = use(dataPromise);

  return (
    <>
      {data.map((item, index) => (
        <motion.tr
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="even:bg-[var(--background-primary)]"
        >
          <td className="py-4 px-4">
            <span>
              {dayjs(dayjs(item.node?.timestamp).toISOString()).fromNow()}
            </span>
          </td>
          <td className="py-4 px-4">
            <span>{item.node?.payload?.energy?.toFixed(2)} kWh</span>
          </td>
          <td className="p-4">
            <span className="block md:hidden">
              {formatAddress(item.node?.payload?.signature as string)}
            </span>
            <span className="hidden md:block">
              {item.node?.payload?.signature}
            </span>
          </td>
          <td className="py-4 px-4">
            <span>
              {Number((item.node?.payload?.energy as number) * 0.6).toFixed(2)}{" "}
              USD
            </span>
          </td>
          <td className={`py-4 px-4 font-medium text-[var(--color-success)]`}>
            <span>Valid</span>
          </td>
        </motion.tr>
      ))}
    </>
  );
};
