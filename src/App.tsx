import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';

import useTelegram from './hooks/useTelegram';
import { useAuth } from './providers/AuthProvider';
import { initializeNavigationStack } from './utils/navigationUtils';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import PairDetailsPage from './pages/PairDetailsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import DashboardsPage from './pages/DashboardsPage';
import NotificationsSettingsPage from './pages/NotificationsSettingsPage';
import CreateNotificationPage from './pages/CreateNotificationPage';
import TelegramOnlyPage from './pages/TelegramOnlyPage';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
			gcTime: 10 * 60 * 1000,
			retry: 3,
			refetchOnWindowFocus: false,
			refetchOnReconnect: true,
		},
		mutations: {
			retry: 1,
		},
	},
});

function App() {
	const { theme } = useTelegram();
	const { isNotInTelegram } = useAuth();

	if (isNotInTelegram) {
		return <TelegramOnlyPage />;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<main className={theme}>
				<div className="container p-[24px]">
					<AppRoutes />
				</div>
			</main>
		</QueryClientProvider>
	);
}

export default App;

const AppRoutes = () => {
	const location = useLocation();

	React.useEffect(() => {
		initializeNavigationStack(location.pathname);
	}, [location.pathname]);

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
				path="/settings/notifications"
				element={<NotificationsSettingsPage />}
			/>
			<Route
				path="/analytics"
				element={<AnalyticsPage />}
			/>
			<Route
				path="/dashboards"
				element={<DashboardsPage />}
			/>
			<Route
				path="/settings/notifications/create"
				element={<CreateNotificationPage />}
			/>
		</Routes>
	);
};
