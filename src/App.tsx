import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { useBlockStore } from "./state/store";
import Header from "./components/Header";
import Home from "./pages/Home";
import DashboardLayout from "./layouts/DashboardLayout";
import Chart from "./pages/Charts";
import Overview from "./pages/Overview";
import Trades from "./pages/Trades";
import Activity from "./pages/Activity";
import AskAI from "./pages/AskAI";

function App() {
	const meterIdBlocks = useBlockStore((state) => state.meterIdBlocks);
	const proposers = Array.from(new Set(meterIdBlocks.map((b) => b.proposer)));

	return (
		<Router>
			<Header />
			<main className="scroll-mt-16 md:scroll-mt-20 lg:scroll-mt-24">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/meter/:meterId" element={<DashboardLayout />}>
						<Route index element={<Navigate to="chart" replace />} />
						<Route path="chart" element={<Chart />} />
						<Route
							path="overview"
							element={<Overview proposers={proposers} />}
						/>
						<Route path="trades" element={<Trades />} />
						<Route path="activity" element={<Activity />} />
						<Route path="ask-ai" element={<AskAI />} />
					</Route>
				</Routes>
			</main>
		</Router>
	);
}

export default App;
