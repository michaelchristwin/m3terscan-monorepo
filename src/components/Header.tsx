import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import { useLocation } from "react-router";

const Header = () => {
	const location = useLocation();

	const hideSearchBarRoutes = ["/chart", "trades", "activity", "ask-ai"];

	const shouldShowSearchBar = !hideSearchBarRoutes.some((route) =>
		location.pathname.includes(route)
	);

	return (
		<header className="sticky top-0 z-50 bg-[var(--background)] backdrop-blur-sm bg-opacity-90 px-4 ">
			<div className=" mx-auto">
				<div className="flex items-center justify-between gap-2 py-2 md:py-3">
					<div className="flex-shrink-0">
						<Logo />
					</div>

					{shouldShowSearchBar && (
						<div className="flex-1 flex justify-center">
							<SearchBar placeholder="Search" />
						</div>
					)}

					<div className="flex-shrink-0 ml-auto md:ml-4">
						<ThemeToggle />
					</div>
				</div>
				<div className="h-[1.5px] w-[95%] place-self-center bg-[var(--background-secondary)]"></div>
			</div>
		</header>
	);
};

export default Header;
