'use client'

import MapComponent from "../../../components/MapComponent";
import { FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { MdOutlineGpsFixed } from "react-icons/md";
import { useState } from "react";
import { formatDateTime } from "../../../utils/formatDateTime";
import { useMapStore } from "../../../stores/mapStore";
import { motion } from "framer-motion";

const Overview = () => {
	const [locationInfo, setLocationInfo] = useState<{
		lat: number;
		lng: number;
		dateTime: string;
	} | null>(null);

	const { mapCenter } = useMapStore();

	return (
		<div className="p-4">
			{/* Map Section */}
			<motion.div
				className="rounded-xl overflow-hidden shadow-md"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<MapComponent
					onLocationFetched={setLocationInfo}
					center={mapCenter || undefined}
				/>
			</motion.div>

			{/* Info Bar */}
			{locationInfo && (
				<motion.div
					className="flex flex-wrap justify-around items-center gap-4 mt-4 text-sm font-medium bg-[var(--background-primary)] py-5 rounded-t-lg w-11/12 mx-auto "
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
				>
					<div className="flex items-center gap-1">
						<FaMapMarkerAlt className="text-orange-500" />
						<span>Lon {locationInfo.lng.toFixed(4)}</span>
					</div>
					<div className="flex items-center gap-1">
						<MdOutlineGpsFixed className="text-orange-500" />
						<span>Lat {locationInfo.lat.toFixed(4)}</span>
					</div>
					<div className="flex items-center gap-1">
						<FaBriefcase className="text-orange-500" />
						<span>Commercial</span>
					</div>
					<div className="flex items-center gap-1">
						<FiClock className="text-orange-500" />
						<span>{formatDateTime(locationInfo.dateTime)}</span>
					</div>
				</motion.div>
			)}

			{/* Image Gallery */}
			<motion.div
				className="flex gap-3 justify-between overflow-x-auto w-11/12 mx-auto"
				style={{
					scrollbarWidth: "none",
					msOverflowStyle: "none",
					scrollBehavior: "smooth",
				}}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, delay: 0.5 }}
			>
				{[
					"/images/worker1.png",
					"/images/worker2.png",
					"/images/worker3.png",
					"/images/worker4.png",
				].map((src, i) => (
					<motion.img
						key={i}
						src={src}
						alt={`Worker ${i + 1}`}
						className="h-auto object-cover rounded-b-lg shadow-sm flex-shrink-0"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.6 + i * 0.2 }}
					/>
				))}
			</motion.div>
		</div>
	);
};

export default Overview;

