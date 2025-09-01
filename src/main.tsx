import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BackButtonHandler } from './components/BackButtonHandler';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 3,
		},
	},
});

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<App />
				<BackButtonHandler />
			</AuthProvider>
		</QueryClientProvider>
	</BrowserRouter>,
);
