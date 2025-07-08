import { motion } from "framer-motion";
import { formatCardValue } from "../utils/numberFormat";

interface CardProps {
	title: string;
	value: number | string;
	index: number;
}

const CURRENCY_TITLES = new Set(["Total Revenue", "Market Cap"]);

const cardVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.1,
			duration: 0.5,
			ease: "easeOut",
		},
	}),
};

const Card = ({ title, value, index }: CardProps) => {
	const shouldFormatAsCurrency = CURRENCY_TITLES.has(title);

	return (
		<motion.div
			className="card flex flex-col items-center gap-2 justify-center"
			variants={cardVariants}
			initial="hidden"
			animate="visible"
			custom={index}
		>
			<p className="text-sm font-light text-center">{title}</p>
			<h2 className="text-lg">
				{formatCardValue(value, { isCurrency: shouldFormatAsCurrency })}
			</h2>
		</motion.div>
	);
};

export default Card;
