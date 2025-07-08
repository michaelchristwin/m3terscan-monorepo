'use client'

import { useBlockStore } from "../../../state/blockStore";

const Overview = () =>{ 
	
	const meterIdBlocks = useBlockStore((state) => state.meterIdBlocks);
	const proposers = Array.from(new Set(meterIdBlocks.map((b) => b.proposer)));

	return (
	<div className="">
		<h2 className="text-xl font-semibold mb-4">Associated Proposers</h2>
		<ul className="list-disc list-inside space-y-1">
			{proposers.map((proposer, i) => (
				<li key={i} className="text-gray-700">
					{proposer}
				</li>
			))}
		</ul>
	</div>
);}

export default Overview;
