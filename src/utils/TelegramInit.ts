import { isMobile } from './isMobile';
import { TelegramStorage } from './TelegramStorage';

export const TelegramInit = async () => {
	const webApp = window.Telegram?.WebApp;

	if (!webApp) {
		console.warn('Not running in Telegram WebApp environment');
		return;
	}

	webApp.expand();
	webApp.disableVerticalSwipes();

	if (isMobile && typeof webApp.requestFullscreen === 'function') {
		try {
			webApp.requestFullscreen();
		} catch (err) {
			console.warn('Fullscreen not supported:', err);
		}
	}

	try {
		const initDataString = webApp.initData;
		if (initDataString) {
			const urlParams = new URLSearchParams(initDataString);
			const initData: any = {};

			const userStr = urlParams.get('user');
			if (userStr) {
				initData.user = JSON.parse(decodeURIComponent(userStr));
			}

			initData.auth_date = urlParams.get('auth_date');
			initData.hash = urlParams.get('hash') || '';

			const storage = TelegramStorage.getInstance();
			await storage.saveInitData(initData);
		}
	} catch (error) {
		console.warn('Failed to save init data:', error);
	}
};
