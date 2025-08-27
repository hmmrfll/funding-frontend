const serverUrl = import.meta.env.VITE_BACKEND_URL;

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
	const hasBody = !!options.body && !(options.body instanceof FormData);

	let initDataRaw = import.meta.env.VITE_DEV_INIT_DATA;

	// Проверяем localStorage для web токенов
	if (typeof window !== 'undefined') {
		const webToken = localStorage.getItem('auth_token');
		if (webToken) {
			initDataRaw = webToken;
		} else if (window.Telegram?.WebApp?.initData) {
			initDataRaw = window.Telegram.WebApp.initData;
		}
	}

	if (!initDataRaw) {
		// Проверяем, находимся ли мы в Telegram окружении
		if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
			throw new Error('Telegram WebApp initialized but no initData available');
		} else {
			throw new Error('No authentication data available. Please connect via Telegram.');
		}
	}

	const headers = {
		Accept: 'application/json',
		Authorization: `Bearer ${initDataRaw}`,
		...(hasBody ? { 'Content-Type': 'application/json' } : {}),
		...options.headers,
	};

	const response = await fetch(serverUrl + url, { ...options, headers });

	if (!response.ok) {
		const errorText = await response.text();
		const errorMessage = `Ошибка ${response.status}: ${errorText}`;
		console.error(errorMessage);
		throw new Error(errorMessage);
	}

	return await response.json();
};

export default fetchWithAuth;
