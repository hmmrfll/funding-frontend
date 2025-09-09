const NAVIGATION_STACK_KEY = 'navigationStack';

const getNavigationStack = (): string[] => {
	const stack = sessionStorage.getItem(NAVIGATION_STACK_KEY);
	return stack ? JSON.parse(stack) : [];
};

const saveNavigationStack = (stack: string[]) => {
	sessionStorage.setItem(NAVIGATION_STACK_KEY, JSON.stringify(stack));
};

export const pushToNavigationStack = (currentPath: string) => {
	const stack = getNavigationStack();

	if (stack[stack.length - 1] !== currentPath) {
		stack.push(currentPath);

		if (stack.length > 10) {
			stack.shift();
		}
		saveNavigationStack(stack);
	}
};

export const popFromNavigationStack = (): string => {
	const stack = getNavigationStack();
	if (stack.length > 0) {
		const previousPage = stack.pop() || '/';
		saveNavigationStack(stack);
		return previousPage;
	}
	return '/';
};

export const getCurrentNavigationStack = (): string[] => {
	return getNavigationStack();
};

export const clearNavigationStack = () => {
	sessionStorage.removeItem(NAVIGATION_STACK_KEY);
};

export const navigateToPairDetails = (symbol: string, navigate: (path: string) => void, currentPath: string) => {
	const stack = getNavigationStack();
	if (stack[stack.length - 1] !== currentPath) {
		pushToNavigationStack(currentPath);
	}
	navigate(`/pair/${symbol.replace('/', '-')}`);
};

export const navigateToCreateNotification = (
	navigate: (path: string) => void,
	currentPath: string,
	symbol?: string,
	threshold?: number,
) => {
	const stack = getNavigationStack();
	if (stack[stack.length - 1] !== currentPath) {
		pushToNavigationStack(currentPath);
	}
	const params = new URLSearchParams();
	if (symbol) params.set('symbol', symbol);
	if (threshold !== undefined) params.set('threshold', threshold.toString());

	const queryString = params.toString();
	navigate(`/settings/notifications/create${queryString ? `?${queryString}` : ''}`);
};

export const initializeNavigationStack = (currentPath: string) => {
	const stack = getNavigationStack();
	if (stack.length === 0) {
		pushToNavigationStack(currentPath);
	}
};

export const navigateBack = (navigate: (path: string) => void) => {
	const previousPage = popFromNavigationStack();
	navigate(previousPage);
};
