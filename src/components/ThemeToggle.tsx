import { useEffect, useState, useRef, useCallback } from "react";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import { CheckIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const getSystemTheme = () =>
	window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const ThemeToggle = () => {
	const [theme, setTheme] = useState(() => {
		if (typeof window !== "undefined") {
			return localStorage.getItem("theme") || "light";
		}
		return "system";
	});
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const applyTheme = useCallback(() => {
		const actualTheme = theme === "system" ? getSystemTheme() : theme;
		document.documentElement.setAttribute("class", actualTheme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	useEffect(() => {
		applyTheme();
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = () => {
			if (theme === "system") applyTheme();
		};
		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [theme, applyTheme]);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as Node | null;
			if (
				dropdownRef.current &&
				target &&
				!dropdownRef.current.contains(target)
			) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const options = [
		{ value: "light", label: "Light", icon: <FiSun className="mr-1" /> },
		{ value: "dark", label: "Dark", icon: <FiMoon className="mr-1" /> },
		{ value: "system", label: "System", icon: <FiMonitor className="mr-1" /> },
	];

	const currentIcon = {
		light: (
			<motion.div animate={{ rotate: 0 }}>
				<FiSun size={20} />
			</motion.div>
		),
		dark: (
			<motion.div animate={{ rotate: 180 }}>
				<FiMoon size={20} />
			</motion.div>
		),
		system: <FiMonitor size={20} />,
	}[theme];

	return (
		<div className="relative inline-block" ref={dropdownRef}>
			<motion.button
				onClick={() => setOpen((prev) => !prev)}
				className="p-2 rounded-full hover:text-[var(--icon-color)] cursor-pointer transition-colors"
				aria-label="Toggle theme dropdown"
				whileTap={{ scale: 0.9 }}
				whileHover={{ scale: 1.1 }}
			>
				{currentIcon}
			</motion.button>

			<AnimatePresence>
				{open && (
					<motion.div
						className="absolute right-0 mt-2 w-56 rounded-lg bg-[var(--background-primary)] shadow-xl z-50 overflow-hidden border-1 sm:border border-[var(--background-secondary)] "
						initial={{ opacity: 0, y: -20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -10, scale: 0.98 }}
						transition={{ type: "spring", damping: 20, stiffness: 300 }}
					>
						<ul className="py-1">
							{options.map((opt) => (
								<motion.li
									key={opt.value}
									onClick={() => {
										setTheme(opt.value);
										setOpen(false);
									}}
									className={`
                    flex items-center px-4 py-2.5 text-sm cursor-pointer 
                    transition-colors duration-100 ease-out
                    hover:bg-[var(--background-secondary)] rounded-lg
                    ${
											theme === opt.value
												? "text-[var(--icon-color)]"
												: "text-[var(--text-secondary)]"
										}
                  `}
									whileHover={{ x: 1 }}
									whileTap={{ scale: 0.98 }}
								>
									<div className="mr-1 opacity-80">{opt.icon}</div>
									<div className="flex-1">
										<div>{opt.label}</div>
										{opt.value === "system" && (
											<span className="text-xs">
												Follows your OS preference
											</span>
										)}
									</div>
									{theme === opt.value && (
										<motion.span
											className="ml-4"
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											transition={{ type: "spring", stiffness: 500 }}
										>
											<CheckIcon className="h-4 w-4 text-[var(--icon-color)]" />
										</motion.span>
									)}
								</motion.li>
							))}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ThemeToggle;
