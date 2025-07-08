// import {
// 	BrowserRouter as Router,
// 	Routes,
// 	Route,
// 	Navigate,
// } from "react-router-dom";
// import { lazy, Suspense } from "react";
// import { useBlockStore } from "./state/blockStore";
// import Chart from "./pages/Charts";
// import Overview from "./pages/Overview";
// import Trades from "./pages/Trades";
// import Activity from "./pages/Activity";
// import AskAI from "./pages/AskAI";
// const Home = lazy(() => import("./pages/Home"));
// const Loader = lazy(() => import("./components/Loader"));
// const Header = lazy(() => import("./components/Header"));
// const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));

function App() {

	return (
		<>Hello World</>
		// <Router>
		// 	<Suspense fallback={<Loader />}>
		// 		<Header />
		// 		<main className="scroll-mt-16 md:scroll-mt-20 lg:scroll-mt-24">
		// 			<Routes>
		// 				<Route path="/" element={<Home />} />
		// 				<Route path="/meter/:meterId" element={<DashboardLayout />}>
		// 					<Route index element={<Navigate to="chart" replace />} />
		// 					<Route path="chart" element={<Chart />} />
		// 					<Route
		// 						path="overview"
		// 						element={<Overview proposers={proposers} />}
		// 					/>
		// 					<Route path="trades" element={<Trades />} />
		// 					<Route path="activity" element={<Activity />} />
		// 					<Route path="ask-ai" element={<AskAI />} />
		// 				</Route>
		// 			</Routes>
		// 		</main>
		// 	</Suspense>
		// </Router>
	);
}

export default App;
