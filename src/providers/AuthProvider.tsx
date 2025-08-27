import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useUser } from '../hooks/useQuery/useUser';
import useTelegram from '../hooks/useTelegram';
import { TelegramInit } from '../utils/TelegramInit';

interface AuthContextType {
	isAuthenticated: boolean;
	user: any;
	isLoading: boolean;
	error: any;
	authToken: string | null;
	login: (token: string) => void;
	logout: () => void;
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
	const { isTelegramEnvironment } = useTelegram();
	const { user, isLoading, error, refetch } = useUser();
	const [authToken, setAuthToken] = useState<string | null>(null);

	useEffect(() => {
		TelegramInit();
	}, []);

	useEffect(() => {
		const token = localStorage.getItem('auth_token');
		if (token) {
			setAuthToken(token);
		}
	}, []);

	useEffect(() => {
		if (authToken && !isTelegramEnvironment) {
			refetch();
		}
	}, [authToken, isTelegramEnvironment, refetch]);

	const login = (token: string) => {
		localStorage.setItem('auth_token', token);
		setAuthToken(token);
		refetch();
	};

	const logout = () => {
		localStorage.removeItem('auth_token');
		setAuthToken(null);
	};

	const isAuthenticated = isTelegramEnvironment || (!!authToken && (!!user || isLoading));

	const value: AuthContextType = {
		isAuthenticated,
		user,
		isLoading,
		error,
		authToken,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
