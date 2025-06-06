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
	const usage = useBlockStore((state) => state.getEnergyUsageForMeter());
	const meterIdBlocks = useBlockStore((state) => state.meterIdBlocks);
	const proposers = Array.from(new Set(meterIdBlocks.map((b) => b.proposer)));

	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/meter/:meterId" element={<DashboardLayout />}>
					<Route index element={<Navigate to="chart" replace />} />
					<Route path="chart" element={<Chart usage={usage} />} />
					<Route path="overview" element={<Overview proposers={proposers} />} />
					<Route path="trades" element={<Trades />} />
					<Route path="activity" element={<Activity />} />
					<Route path="ask-ai" element={<AskAI />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
