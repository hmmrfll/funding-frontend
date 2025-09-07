const serverUrl = import.meta.env.VITE_BACKEND_URL;

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
	const hasBody = !!options.body && !(options.body instanceof FormData);

	let initDataRaw: string | null = null;

	if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initData) {
		initDataRaw = window.Telegram.WebApp.initData;
	}

	if (!initDataRaw && import.meta.env.DEV) {
		initDataRaw = import.meta.env.VITE_DEV_INIT_DATA || null;
	}

	if (!initDataRaw) {
		throw new Error('No Telegram authentication data available. Please open this app in Telegram.');
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
