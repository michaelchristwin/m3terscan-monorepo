import { BiSearch, BiSearchAlt } from "react-icons/bi";
import { useBlockStore } from "../state/store";
import { useState } from "react";

const SearchBar = (props: { placeholder: string }) => {
	const { searchBlocks, clearSearch, filteredData, blockData, selectMeterId } =
		useBlockStore();
	const [query, setQuery] = useState("");
	const [isFocused, setIsFocused] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setQuery(value);
		if (value.trim() === "") {
			clearSearch();
		} else {
			searchBlocks(value);
		}
	};

	const blocksToShow = query ? filteredData : blockData;
	const showResults = isFocused && blocksToShow.length > 0;

	return (
		<div className="relative w-full max-w-md mx-2 md:mx-4">
			{/* Search Input */}
			<div className="relative flex items-center">
				<BiSearch
					className="absolute left-3 text-gray-400 dark:text-gray-500"
					size={18}
				/>
				<input
					type="text"
					placeholder={props.placeholder}
					autoComplete="off"
					autoCorrect="off"
					spellCheck="false"
					aria-label="Search blocks"
					value={query}
					onChange={handleInputChange}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setTimeout(() => setIsFocused(false), 200)}
					className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--background-secondary)]"
				/>
			</div>

			{/* Search Results Dropdown */}
			{showResults && (
				<div className="absolute z-10 w-full mt-1 bg-[var(--background-primary)] rounded-lg shadow-lg max-h-80 overflow-y-auto custom-scroll">
					{blocksToShow.length > 0 ? (
						<ul className="p-2">
							{blocksToShow.map((block) => (
								<li
									key={block.number}
									className="px-4 py-2 hover:bg-[var(--background-secondary)] transition-colors rounded cursor-pointer"
									onClick={() => selectMeterId(block.meterId)}
								>
									<div className="flex justify-between items-center">
										<span className="font-medium">Block {block.number}</span>
										<span className="text-sm">{block.proposer}</span>
									</div>
									<div className="flex justify-between text-xs mt-1">
										<span>
											{block.date} {block.time}
										</span>
										<span
											className={`px-2 py-0.5 rounded ${
												block.status === "Successful"
													? "text-[var(--color-success)]"
													: "text-[var(--color-invalid)]"
											}`}
										>
											{block.status}
										</span>
									</div>
								</li>
							))}
						</ul>
					) : (
						<div className="p-4 text-center">
							<div className="inline-flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-[var(--background-secondary)]">
								<BiSearchAlt className="w-6 h-6 text-gray-400" />
							</div>
							<h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
								No results found
							</h4>
							<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
								Try searching for a different block number or proposer
							</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default SearchBar;
