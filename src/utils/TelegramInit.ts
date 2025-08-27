import { isMobile } from './isMobile';

export const TelegramInit = () => {
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
};
