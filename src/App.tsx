import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import Chart from "./pages/Charts";
import Overview from "./pages/Overview";
import Trades from "./pages/Trades";
import Activity from "./pages/Activity";
import AskAI from "./pages/AskAI";
import DashboardLayout from "./layouts/DashboardLayout";
const Home = lazy(() => import("./pages/Home"));
const Loader = lazy(() => import("./components/Loader"));
const Header = lazy(() => import("./components/Header"));

function App() {
	return (
		<Router>
			<Suspense fallback={<Loader />}>
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/meter/:meterId" element={<DashboardLayout />}>
							<Route index element={<Navigate to="chart" replace />} />
							<Route path="chart" element={<Chart />} />
							<Route path="overview" element={<Overview />} />
							<Route path="trades" element={<Trades />} />
							<Route path="activity" element={<Activity />} />
							<Route path="ask-ai" element={<AskAI />} />
						</Route>
					</Routes>
				</main>
			</Suspense>
		</Router>
	);
}

export default App;
