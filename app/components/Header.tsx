'use client'

import { usePathname } from "next/navigation";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import { useMapStore } from "../stores/mapStore";

const Header = () => {

	const pathname = usePathname()

	// Show search bar only on these base paths
	const showSearchBarPaths = ["/", "/meter"];

	// Hide search bar on these specific subpaths
	const hideSearchBarSubpaths = ["chart", "trades", "activity", "ask-ai"];

	// Check if current path starts with allowed base path
	const isAllowedBasePath = showSearchBarPaths.some(
		(path) =>
			pathname === path || pathname.startsWith(`${path}/`)
	);

	// Check if current path contains any forbidden subpath
	const hasForbiddenSubpath = hideSearchBarSubpaths.some((subpath) =>
		pathname.includes(`/${subpath}`)
	);

	const shouldShowSearchBar = isAllowedBasePath && !hasForbiddenSubpath;

	const isOverviewPage = pathname.includes("/overview");

	const searchPlaceHolder = isOverviewPage ? "Search Location" : "Search";

	const { setMapCenter } = useMapStore();

	return (
		<header className="sticky top-0 z-50 bg-[var(--background)] backdrop-blur-sm bg-opacity-90 px-4 ">
			<div className="mx-auto">
				<div className="flex items-center justify-between gap-2 py-2 md:py-3">
					<div className="flex-shrink-0">
						<Logo />
					</div>

					{shouldShowSearchBar && (
						<div className="flex-1 flex justify-center">
							<SearchBar
								placeholder={searchPlaceHolder}
								onLocationSelect={setMapCenter}
							/>
						</div>
					)}

					<div className="flex-shrink-0 ml-auto md:ml-4">
						<ThemeToggle />
					</div>
				</div>
				<div className="h-[1.5px] w-[95%] place-self-center bg-[var(--background-secondary)] "></div>
			</div>
		</header>
	);
};

export default Header;
