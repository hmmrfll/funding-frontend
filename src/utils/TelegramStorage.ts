export interface TelegramInitData {
	query_id?: string;
	user?: {
		id: number;
		first_name: string;
		last_name?: string;
		username?: string;
		language_code?: string;
		is_premium?: boolean;
		allows_write_to_pm?: boolean;
	};
	receiver?: {
		id: number;
		first_name: string;
		last_name?: string;
		username?: string;
		type: string;
	};
	chat?: {
		id: number;
		type: string;
		title?: string;
		username?: string;
		first_name?: string;
		last_name?: string;
	};
	chat_type?: string;
	chat_instance?: string;
	start_param?: string;
	can_send_after?: number;
	auth_date: number;
	hash: string;
}

const STORAGE_KEYS = {
	INIT_DATA: 'telegram_init_data',
	AUTH_TOKEN: 'auth_token',
	USER_DATA: 'user_data',
} as const;

export class TelegramStorage {
	private static instance: TelegramStorage;
	private telegram: any;

	private constructor() {
		this.telegram = (window as any).Telegram?.WebApp;
	}

	public static getInstance(): TelegramStorage {
		if (!TelegramStorage.instance) {
			TelegramStorage.instance = new TelegramStorage();
		}
		return TelegramStorage.instance;
	}

	public async saveInitData(initData: TelegramInitData): Promise<boolean> {
		return new Promise((resolve) => {
			if (!this.telegram?.CloudStorage) {
				console.warn('Telegram CloudStorage not available');
				resolve(false);
				return;
			}

			this.telegram.CloudStorage.setItem(
				STORAGE_KEYS.INIT_DATA,
				JSON.stringify(initData),
				(error: any, success: boolean) => {
					if (error) {
						console.error('Failed to save init data:', error);
						resolve(false);
					} else {
						console.log('Init data saved successfully');
						resolve(success);
					}
				},
			);
		});
	}

	public async getInitData(): Promise<TelegramInitData | null> {
		return new Promise((resolve) => {
			if (!this.telegram?.CloudStorage) {
				console.warn('Telegram CloudStorage not available');
				resolve(null);
				return;
			}

			this.telegram.CloudStorage.getItem(STORAGE_KEYS.INIT_DATA, (error: any, value: string) => {
				if (error) {
					console.error('Failed to get init data:', error);
					resolve(null);
				} else if (value) {
					try {
						const parsedData = JSON.parse(value);
						console.log('Init data restored successfully');
						resolve(parsedData);
					} catch (parseError) {
						console.error('Failed to parse init data:', parseError);
						resolve(null);
					}
				} else {
					resolve(null);
				}
			});
		});
	}

	public async saveAuthToken(token: string): Promise<boolean> {
		return new Promise((resolve) => {
			if (!this.telegram?.CloudStorage) {
				console.warn('Telegram CloudStorage not available');
				resolve(false);
				return;
			}

			this.telegram.CloudStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token, (error: any, success: boolean) => {
				if (error) {
					console.error('Failed to save auth token:', error);
					resolve(false);
				} else {
					console.log('Auth token saved successfully');
					resolve(success);
				}
			});
		});
	}

	public async getAuthToken(): Promise<string | null> {
		return new Promise((resolve) => {
			if (!this.telegram?.CloudStorage) {
				console.warn('Telegram CloudStorage not available');
				resolve(null);
				return;
			}

			this.telegram.CloudStorage.getItem(STORAGE_KEYS.AUTH_TOKEN, (error: any, value: string) => {
				if (error) {
					console.error('Failed to get auth token:', error);
					resolve(null);
				} else {
					console.log('Auth token restored successfully');
					resolve(value);
				}
			});
		});
	}

	public async saveUserData(userData: any): Promise<boolean> {
		return new Promise((resolve) => {
			if (!this.telegram?.CloudStorage) {
				console.warn('Telegram CloudStorage not available');
				resolve(false);
				return;
			}

			this.telegram.CloudStorage.setItem(
				STORAGE_KEYS.USER_DATA,
				JSON.stringify(userData),
				(error: any, success: boolean) => {
					if (error) {
						console.error('Failed to save user data:', error);
						resolve(false);
					} else {
						console.log('User data saved successfully');
						resolve(success);
					}
				},
			);
		});
	}

	public async getUserData(): Promise<any | null> {
		return new Promise((resolve) => {
			if (!this.telegram?.CloudStorage) {
				console.warn('Telegram CloudStorage not available');
				resolve(null);
				return;
			}

			this.telegram.CloudStorage.getItem(STORAGE_KEYS.USER_DATA, (error: any, value: string) => {
				if (error) {
					console.error('Failed to get user data:', error);
					resolve(null);
				} else if (value) {
					try {
						const parsedData = JSON.parse(value);
						console.log('User data restored successfully');
						resolve(parsedData);
					} catch (parseError) {
						console.error('Failed to parse user data:', parseError);
						resolve(null);
					}
				} else {
					resolve(null);
				}
			});
		});
	}

	public async clearAll(): Promise<boolean> {
		return new Promise((resolve) => {
			if (!this.telegram?.CloudStorage) {
				console.warn('Telegram CloudStorage not available');
				resolve(false);
				return;
			}

			const keys = Object.values(STORAGE_KEYS);
			this.telegram.CloudStorage.removeItems(keys, (error: any, success: boolean) => {
				if (error) {
					console.error('Failed to clear storage:', error);
					resolve(false);
				} else {
					console.log('Storage cleared successfully');
					resolve(success);
				}
			});
		});
	}

	public isCloudStorageAvailable(): boolean {
		return !!this.telegram?.CloudStorage;
	}
}

export const useTelegramStorage = () => {
	const storage = TelegramStorage.getInstance();

	return {
		saveInitData: storage.saveInitData.bind(storage),
		getInitData: storage.getInitData.bind(storage),
		saveAuthToken: storage.saveAuthToken.bind(storage),
		getAuthToken: storage.getAuthToken.bind(storage),
		saveUserData: storage.saveUserData.bind(storage),
		getUserData: storage.getUserData.bind(storage),
		clearAll: storage.clearAll.bind(storage),
		isCloudStorageAvailable: storage.isCloudStorageAvailable.bind(storage),
	};
};
