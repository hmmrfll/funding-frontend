import { useState, useEffect } from 'react';
import useTelegram from './useTelegram';

export const useTelegramCheck = () => {
	const { isTelegramEnvironment } = useTelegram();
	const [hasInitData, setHasInitData] = useState<boolean | null>(null);

	useEffect(() => {
		const checkInitData = () => {
			const hasTelegramInitData = !!(typeof window !== 'undefined' && window.Telegram?.WebApp?.initData);

			setHasInitData(hasTelegramInitData);
		};

		checkInitData();

		const timeout = setTimeout(checkInitData, 1000);

		return () => clearTimeout(timeout);
	}, []);

	const isTelegramReady = isTelegramEnvironment && hasInitData === true;
	const isNotInTelegram = hasInitData === false;

	return {
		isTelegramReady,
		isNotInTelegram,
		isLoading: hasInitData === null,
	};
};
