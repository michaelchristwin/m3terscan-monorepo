import { useEffect, useState, useRef, useCallback } from "react";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import { CheckIcon } from "lucide-react";

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
		light: <FiSun size={20} />,
		dark: <FiMoon size={20} />,
		system: <FiMonitor size={20} />,
	}[theme];

	return (
		<div className="relative inline-block" ref={dropdownRef}>
			<button
				onClick={() => setOpen((prev) => !prev)}
				className="p-2 rounded-full hover:text-[var(--icon-color)] cursor-pointer transition-colors"
				aria-label="Toggle theme dropdown"
			>
				{currentIcon}
			</button>

			{open && (
				<div className="absolute right-0 mt-2 w-56 rounded-lg bg-[var(--background-primary)] shadow-xl z-50 overflow-hidden  animate-in fade-in zoom-in-95">
					<ul className="py-1">
						{options.map((opt) => (
							<li
								key={opt.value}
								onClick={() => {
									setTheme(opt.value);
									setOpen(false);
								}}
								className={`
							flex items-center px-4 py-2.5 text-sm cursor-pointer 
							transition-colors duration-100 ease-out
							hover:bg-[var(--background-secondary)]
							${
								theme === opt.value
									? "text-[var(--icon-color)] "
									: "text-[var(--text-secondary)]"
							}
							`}
							>
								<div className="mr-1 opacity-80">{opt.icon}</div>
								<div className="flex-1">
									<div>{opt.label}</div>
									{opt.value === "system" && (
										<span className="text-xs">Follows your OS preference</span>
									)}
								</div>
								{theme === opt.value && (
									<span className="ml-4">
										<CheckIcon className="h-4 w-4 text-[var(--icon-color)]" />
									</span>
								)}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default ThemeToggle;
