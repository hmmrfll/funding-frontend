import { Route, Routes, useNavigate } from 'react-router-dom';
import './index.css';

import { BackButtonHandler } from './components/BackButtonHandler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useTelegram from './hooks/useTelegram';
import { useModalStore } from './store/ModalStore';
import { useEffect } from 'react';
import { useUser } from './hooks/useQuery/useUser';

function App() {
	const modal = useModalStore((state) => state.modal);
	const closeModal = useModalStore((state) => state.closeModal);
	const { theme } = useTelegram();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: 3,
			},
		},
	});

	return (
		<QueryClientProvider client={queryClient}>
			<main className={theme}>
				<div className="container">
					<AppRoutes />
				</div>
			</main>
			<BackButtonHandler />
		</QueryClientProvider>
	);
}

export default App;

const AppRoutes = () => {
	const navigate = useNavigate();
	const { user: telegramUser } = useTelegram();
	const { user, isFetching } = useUser({ id: telegramUser?.id || '' });
	console.log(user);

	useEffect(() => {
		if (!user && !isFetching) {
			navigate('/register');
		}
	}, [user, isFetching]);

	return (
		<Routes>
			<Route
				path="/"
				element={<></>}
			/>
		</Routes>
	);
};
