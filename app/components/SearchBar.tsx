'use client'

import { BiSearch } from "react-icons/bi";
import { useBlockStore } from "../stores/blockStore";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SearchBarProps = {
	placeholder: string;
	onLocationSelect?: (coords: { lat: number; lng: number }) => void;
};

const SearchBar = ({ placeholder, onLocationSelect }: SearchBarProps) => {

	const pathname = usePathname()
	const isHomeRoute = pathname === "/";

	const { searchBlocks, clearSearch, filteredData, blockData } =
		useBlockStore();
	const [query, setQuery] = useState("");
	const [isFocused, setIsFocused] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setQuery(value);

		// Block search (home route only)
		if (isHomeRoute) {
			if (value.trim() === "") clearSearch();
			else searchBlocks(value);
		}
	};

	const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && onLocationSelect && query.trim() !== "") {
			try {
				const res = await fetch(
					`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
						query
					)}&key=GOOGLE_MAPS_API_KEY`
				);
				const data = await res.json();
				if (data.results && data.results[0]) {
					const loc = data.results[0].geometry.location;
					onLocationSelect(loc);
				}
			} catch (err) {
				console.error("Geocoding error:", err);
			}
		}
	};

	const blocksToShow = isHomeRoute ? (query ? filteredData : blockData) : [];
	const showResults = isHomeRoute && isFocused && blocksToShow.length > 0;

	return (
		<div className="relative w-full max-w-md mx-2 md:mx-4">
			{/* Input */}
			<div className="relative flex items-center">
				<BiSearch
					className="absolute left-3 text-gray-400 dark:text-gray-500"
					size={18}
				/>
				<input
					type="text"
					placeholder={placeholder}
					autoComplete="off"
					spellCheck="false"
					aria-autocomplete="none"
					value={query}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setTimeout(() => setIsFocused(false), 200)}
					className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--background-secondary)]"
				/>
			</div>

			{/* Block search results */}
			{showResults && (
				<div className="absolute z-10 w-full mt-1 bg-[var(--background-primary)] rounded-lg shadow-lg max-h-80 overflow-y-auto custom-scroll">
					<ul className="p-2">
						{blocksToShow.map((block) => (
							<li
								key={block.number}
								className="px-4 py-2 hover:bg-[var(--background-secondary)] transition-colors rounded cursor-pointer"
							>
								<Link href={`/meter/${block.meterId}/chart`}>
									<div className="flex justify-between">
										<span className="font-medium">Block {block.number}</span>
										<span className="text-sm">{block.proposer}</span>
									</div>
									<div className="flex justify-between text-xs mt-1">
										<span>
											{block.date} {block.time}
										</span>
										<span
											className={`px-2 py-0.5 rounded ${block.status === "Successful"
													? "text-[var(--color-success)]"
													: "text-[var(--color-invalid)]"
												}`}
										>
											{block.status}
										</span>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default SearchBar;
