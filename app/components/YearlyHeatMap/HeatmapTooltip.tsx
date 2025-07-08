import { motion } from "framer-motion";
interface HeatmapTooltipProps {
	show: boolean;
	x: number;
	y: number;
	content: string;
}

export const HeatmapTooltip = ({
	show,
	x,
	y,
	content,
}: HeatmapTooltipProps) => {
	if (!show) return null;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
			className="fixed z-50 bg-black text-white border-[var(--icon-color)] border text-xs px-3 py-1 rounded shadow-lg pointer-events-none"
			style={{
				top: y - 20,
				left: x,
				transform: "translate(-50%, -50%)",
				whiteSpace: "nowrap",
			}}
		>
			{content}
		</motion.div>
	);
};
