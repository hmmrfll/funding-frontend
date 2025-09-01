import { Route, Routes } from 'react-router-dom';
import './index.css';

import useTelegram from './hooks/useTelegram';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import PairDetailsPage from './pages/PairDetailsPage';

function App() {
	const { theme } = useTelegram();

	return (
		<main className={theme}>
			<div className="container p-[24px]">
				<AppRoutes />
			</div>
		</main>
	);
}

export default App;

const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={<HomePage />}
			/>
			<Route
				path="/auth/:sessionId"
				element={<AuthPage />}
			/>
			<Route
				path="/pair/:symbol"
				element={<PairDetailsPage />}
			/>
			<Route
				path="/register"
				element={<div>Registration Page</div>}
			/>
			<Route
				path="/settings"
				element={<div>Settings Page</div>}
			/>
			<Route
				path="/analytics"
				element={<div>Analytics Page</div>}
			/>
		</Routes>
	);
};
