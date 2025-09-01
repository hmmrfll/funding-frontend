import { useEffect, useState } from 'react';
import type { HapticFeedbackType } from '../telegram';
import { useTelegramStorage } from '../utils/TelegramStorage';

const useTelegram = () => {
	const [restoredUser, setRestoredUser] = useState<any>(null);
	const [isDataRestored, setIsDataRestored] = useState(false);
	const { getInitData, isCloudStorageAvailable } = useTelegramStorage();

	const webApp = window.Telegram?.WebApp;
	const user = webApp?.initDataUnsafe?.user || restoredUser;

	const isTelegramEnvironment = !!webApp?.initData || !!restoredUser;

	useEffect(() => {
		const restoreInitData = async () => {
			if (!webApp?.initData && isCloudStorageAvailable()) {
				try {
					const storedInitData = await getInitData();
					if (storedInitData?.user) {
						setRestoredUser(storedInitData.user);
						console.log('Init data restored from CloudStorage');
					}
				} catch (error) {
					console.warn('Failed to restore init data:', error);
				}
			}
			setIsDataRestored(true);
		};

		restoreInitData();
	}, [webApp?.initData, getInitData, isCloudStorageAvailable]);

	const isCurTelegramUser = (userId: string) => {
		return String(userId) === String(user?.id);
	};

	const openLink = (url: string) => {
		if (url.startsWith('tel:') || url.startsWith('mailto:')) {
			window.open(url);
			return;
		}

		if (webApp?.openLink) {
			webApp.openLink(url, { try_instant_view: true });
		} else {
			window.open(url, '_blank');
		}
	};

	const hapticTrigger = (type: HapticFeedbackType = 'soft') => {
		if (webApp?.HapticFeedback) {
			webApp.HapticFeedback.impactOccurred(type);
		}
	};

	const hapticNotify = (type: 'error' | 'warning' | 'success' = 'error') => {
		if (webApp?.HapticFeedback) {
			webApp.HapticFeedback.notificationOccurred(type);
		}
	};

	const requestPhoneFromTelegram = (): Promise<string | null> => {
		return new Promise((resolve, reject) => {
			if (!webApp?.requestContact || !webApp?.onEvent) {
				reject(new Error('WebApp API не поддерживает requestContact'));
				return;
			}

			webApp.requestContact();

			const handler = (event: any) => {
				if (event.status === 'sent') {
					const phone = event.responseUnsafe?.contact?.phone_number || null;
					resolve(phone);
				} else if (event.status === 'cancelled') {
					resolve(null);
				}
			};

			webApp.onEvent('contactRequested', handler);
		});
	};

	const onEvent = (event: string, callback: (event: any) => void) => {
		if (webApp?.onEvent) {
			webApp.onEvent(event, callback);
		}
	};

	const showScanQR = (): Promise<string> => {
		return new Promise((resolve, reject) => {
			if (!webApp?.showScanQrPopup || !webApp?.onEvent || !webApp?.offEvent) {
				reject(new Error('QR-соединение недоступно в этом окружении'));
				return;
			}

			const handler = (data: { data: string }) => {
				resolve(data.data);
				webApp.closeScanQrPopup();
				webApp.offEvent('qrTextReceived', handler);
			};

			webApp.onEvent('qrTextReceived', handler);

			webApp.showScanQrPopup({
				text: '',
			});
		});
	};

	return {
		user: isTelegramEnvironment ? user : null,
		theme: webApp?.themeParams?.bg_color === '#ffffff' ? 'light' : 'dark',
		hapticTrigger,
		hapticNotify,
		isCurTelegramUser,
		openLink,
		requestPhoneFromTelegram,
		onEvent,
		showScanQR,
		startParam: webApp?.initDataUnsafe?.start_param,
		isTelegramEnvironment,
		isDataRestored,
	};
};

export default useTelegram;
