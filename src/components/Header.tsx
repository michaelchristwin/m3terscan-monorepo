import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
	return (
		<header className="sticky top-0 z-50 bg-[var(--background)] backdrop-blur-sm bg-opacity-90 px-4">
			<div className="container mx-auto">
				<div className="flex items-center justify-between gap-2 py-2 md:py-3">
					<div className="flex-shrink-0">
						<Logo />
					</div>

					<div className="flex-1 flex justify-center">
						<SearchBar placeholder="Search" />
					</div>

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
