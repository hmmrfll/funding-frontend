import { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useUser } from '../hooks/useQuery/useUser';
import { useTelegramCheck } from '../hooks/useTelegramCheck';
import { TelegramInit } from '../utils/TelegramInit';

interface AuthContextType {
	isAuthenticated: boolean;
	user: any;
	isLoading: boolean;
	error: any;
	isNotInTelegram: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider');
	}
	return context;
};

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const { isTelegramReady, isNotInTelegram, isLoading: telegramLoading } = useTelegramCheck();
	const { user, isLoading: userLoading, error } = useUser();

	useEffect(() => {
		const initTelegram = async () => {
			await TelegramInit();
		};
		initTelegram();
	}, []);

	const isAuthenticated = isTelegramReady;
	const isLoading = telegramLoading || userLoading;

	const value: AuthContextType = {
		isAuthenticated,
		user,
		isLoading,
		error,
		isNotInTelegram,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
