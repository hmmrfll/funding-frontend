import { isMobile } from './isMobile';

export const TelegramInit = () => {
	const webApp = window.Telegram?.WebApp;
	if (!webApp) return;

	webApp.expand();
	webApp.disableVerticalSwipes();

	// Безопасно вызываем только если метод существует
	if (isMobile && typeof webApp.requestFullscreen === 'function') {
		try {
			webApp.requestFullscreen();
		} catch (err) {
			console.warn('Fullscreen not supported:', err);
		}
	}
};
