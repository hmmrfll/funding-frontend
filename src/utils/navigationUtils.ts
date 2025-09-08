/**
 * Navigation utilities for handling back navigation with context
 */

const NAVIGATION_STACK_KEY = 'navigationStack';

/**
 * Get the navigation stack from sessionStorage
 * @returns Array of navigation paths
 */
const getNavigationStack = (): string[] => {
	const stack = sessionStorage.getItem(NAVIGATION_STACK_KEY);
	return stack ? JSON.parse(stack) : [];
};

/**
 * Save the navigation stack to sessionStorage
 * @param stack - Array of navigation paths
 */
const saveNavigationStack = (stack: string[]) => {
	sessionStorage.setItem(NAVIGATION_STACK_KEY, JSON.stringify(stack));
};

/**
 * Push a new page to the navigation stack
 * @param currentPath - Current page path to push
 */
export const pushToNavigationStack = (currentPath: string) => {
	const stack = getNavigationStack();
	// Don't push if it's the same as the last page (prevents duplicates)
	if (stack[stack.length - 1] !== currentPath) {
		stack.push(currentPath);
		// Limit stack size to prevent memory issues
		if (stack.length > 10) {
			stack.shift();
		}
		saveNavigationStack(stack);
	}
};

/**
 * Pop the last page from the navigation stack
 * @returns The previous page path or default fallback
 */
export const popFromNavigationStack = (): string => {
	const stack = getNavigationStack();
	if (stack.length > 0) {
		const previousPage = stack.pop() || '/';
		saveNavigationStack(stack);
		return previousPage;
	}
	return '/';
};

/**
 * Get the current navigation stack (for debugging)
 * @returns Array of navigation paths
 */
export const getCurrentNavigationStack = (): string[] => {
	return getNavigationStack();
};

/**
 * Clear the navigation stack
 */
export const clearNavigationStack = () => {
	sessionStorage.removeItem(NAVIGATION_STACK_KEY);
};

/**
 * Navigate to pair details with context
 * @param symbol - Trading pair symbol
 * @param navigate - React Router navigate function
 * @param currentPath - Current page path to store as previous
 */
export const navigateToPairDetails = (symbol: string, navigate: (path: string) => void, currentPath: string) => {
	// Only add to stack if we're not already on the same page
	const stack = getNavigationStack();
	if (stack[stack.length - 1] !== currentPath) {
		pushToNavigationStack(currentPath);
	}
	navigate(`/pair/${symbol.replace('/', '-')}`);
};

/**
 * Navigate to create notification page with context and pre-filled data
 * @param navigate - React Router navigate function
 * @param currentPath - Current page path to store as previous
 * @param symbol - Optional trading pair symbol to pre-fill
 * @param threshold - Optional threshold to pre-fill
 */
export const navigateToCreateNotification = (
	navigate: (path: string) => void,
	currentPath: string,
	symbol?: string,
	threshold?: number,
) => {
	// Only add to stack if we're not already on the same page
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

/**
 * Initialize navigation stack with current page if empty
 * @param currentPath - Current page path
 */
export const initializeNavigationStack = (currentPath: string) => {
	const stack = getNavigationStack();
	if (stack.length === 0) {
		pushToNavigationStack(currentPath);
	}
};

/**
 * Navigate back to the previous page using navigation stack
 * @param navigate - React Router navigate function
 */
export const navigateBack = (navigate: (path: string) => void) => {
	const previousPage = popFromNavigationStack();
	navigate(previousPage);
};
