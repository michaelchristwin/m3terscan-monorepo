import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
	const [theme, setTheme] = useState(() => {
		// Check localStorage first, then system preference
		if (typeof window !== "undefined") {
			const savedTheme = localStorage.getItem("theme");
			if (savedTheme) return savedTheme;
			return window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		}
		return "light";
	});

	useEffect(() => {
		document.documentElement.setAttribute("class", theme);
		localStorage.setItem("theme", theme);

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = () => {
			if (!localStorage.getItem("theme")) {
				setTheme(mediaQuery.matches ? "dark" : "light");
			}
		};
		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
	};

	return (
		<button
			onClick={toggleTheme}
			className="p-2 rounded-full hover:text-[var(--icon-color)] cursor-pointer transition-colors"
			aria-label={`Toggle ${theme === "dark" ? "light" : "dark"} mode`}
		>
			{theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
		</button>
	);
};

export default ThemeToggle;
