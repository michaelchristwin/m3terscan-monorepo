type OverviewProps = {
	proposers: string[];
};

const Overview: React.FC<OverviewProps> = ({ proposers }) => (
	<div className="p-4">
		<h2 className="text-xl font-semibold mb-4">Associated Proposers</h2>
		<ul className="list-disc list-inside space-y-1">
			{proposers.map((proposer, i) => (
				<li key={i} className="text-gray-700">
					{proposer}
				</li>
			))}
		</ul>
	</div>
);

export default Overview;
