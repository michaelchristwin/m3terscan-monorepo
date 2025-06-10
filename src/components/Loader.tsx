import { motion } from "framer-motion";
import type { Transition } from "framer-motion";

interface SpinnerProps {
	size?: number;
	color?: string;
	trackColor?: string;
	strokeWidth?: number;
	className?: string;
	speed?: number;
	progress?: number; // New prop for progress (0 to 1)
}

const Loader = ({
	size = 48,
	color = "#fc7319", // Set default color to #fc7319
	trackColor = "transparent",
	strokeWidth = 4,
	className = "",
	speed = 1,
	progress = undefined, // Optional progress value
}: SpinnerProps) => {
	const spinnerTransition: Transition = {
		duration: 1 / speed,
		repeat: progress === undefined ? Infinity : 0, // Only repeat if not a progress spinner
		ease: "linear",
	};

	// Calculate the border style based on progress
	const borderStyle =
		progress !== undefined
			? {
					border: `${strokeWidth}px solid ${trackColor}`,
					borderTopColor: color,
					borderRightColor: color,
					borderBottomColor: progress >= 0.5 ? color : trackColor,
					borderLeftColor: progress >= 0.75 ? color : trackColor,
					borderRadius: "50%",
			  }
			: {
					border: `${strokeWidth}px solid ${trackColor}`,
					borderTopColor: color,
					borderRadius: "50%",
			  };

	return (
		<motion.div
			className={`flex items-center justify-center ${className}`}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<motion.div
				style={{
					width: size,
					height: size,
					...borderStyle,
				}}
				animate={{
					rotate: progress !== undefined ? 0 : 360, // Don't rotate if it's a progress spinner
				}}
				transition={spinnerTransition}
			/>
			{/* Optional progress text */}
			{progress !== undefined && (
				<div
					className="absolute flex items-center justify-center"
					style={{
						width: size,
						height: size,
						fontSize: size * 0.3,
						color: color,
					}}
				>
					{Math.round(progress * 100)}%
				</div>
			)}
		</motion.div>
	);
};

export default Loader;
