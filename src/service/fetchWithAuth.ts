
const serverUrl = import.meta.env.VITE_BACKEND_URL;
const initDataRaw = import.meta.env.VITE_DEV_INIT_DATA || window.Telegram.WebApp.initData;

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
	const hasBody = !!options.body && !(options.body instanceof FormData);

	const headers = {
		Accept: "application/json",
		Authorization: `Bearer ${initDataRaw}`,
		...(hasBody ? { "Content-Type": "application/json" } : {}),
		...options.headers,
	};

	let response = await fetch(serverUrl + url, { ...options, headers });

	if (!response.ok) {
		// Читаем тело ошибки и кидаем исключение
		const errorText = await response.text();
		const errorMessage = `Ошибка ${response.status}: ${errorText}`;
		console.error(errorMessage);
		throw new Error(errorMessage);
	}

	return await response.json();
};

export default fetchWithAuth;