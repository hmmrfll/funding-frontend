import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useUser } from '../hooks/useQuery/useUser';
import useTelegram from '../hooks/useTelegram';
import { TelegramInit } from '../utils/TelegramInit';
import { useTelegramStorage } from '../utils/TelegramStorage';

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
	const [isInitialized, setIsInitialized] = useState(false);
	const { saveAuthToken, getAuthToken, saveUserData, getUserData, isCloudStorageAvailable } = useTelegramStorage();

	// Инициализация Telegram
	useEffect(() => {
		const initTelegram = async () => {
			await TelegramInit();
		};
		initTelegram();
	}, []);

	// Восстановление данных из Telegram Storage при загрузке
	useEffect(() => {
		const restoreData = async () => {
			if (isTelegramEnvironment && isCloudStorageAvailable()) {
				try {
					// Восстанавливаем auth token из CloudStorage
					const storedToken = await getAuthToken();
					if (storedToken) {
						setAuthToken(storedToken);
						console.log('Auth token restored from CloudStorage');
					}
				} catch (error) {
					console.warn('Failed to restore data from CloudStorage:', error);
				}
			} else {
				// Fallback на localStorage для не-Telegram окружения
				const token = localStorage.getItem('auth_token');
				if (token) {
					setAuthToken(token);
				}
			}
			setIsInitialized(true);
		};

		restoreData();
	}, [isTelegramEnvironment, isCloudStorageAvailable, getAuthToken]);

	// Запрос данных пользователя при наличии токена
	useEffect(() => {
		if (authToken && !isTelegramEnvironment && isInitialized) {
			refetch();
		}
	}, [authToken, isTelegramEnvironment, refetch, isInitialized]);

	const login = async (token: string) => {
		if (isTelegramEnvironment && isCloudStorageAvailable()) {
			// Сохраняем в CloudStorage
			await saveAuthToken(token);
		} else {
			// Fallback на localStorage
			localStorage.setItem('auth_token', token);
		}
		setAuthToken(token);
		refetch();
	};

	const logout = async () => {
		if (isTelegramEnvironment && isCloudStorageAvailable()) {
			// Очищаем CloudStorage
			await saveAuthToken('');
		} else {
			// Fallback на localStorage
			localStorage.removeItem('auth_token');
		}
		setAuthToken(null);
	};

	// Сохраняем данные пользователя в CloudStorage при их изменении
	useEffect(() => {
		if (user && isTelegramEnvironment && isCloudStorageAvailable()) {
			saveUserData(user).catch((error) => {
				console.warn('Failed to save user data to CloudStorage:', error);
			});
		}
	}, [user, isTelegramEnvironment, isCloudStorageAvailable, saveUserData]);

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
