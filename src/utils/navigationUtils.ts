/**
 * Navigation utilities for handling back navigation with context
 */

/**
 * Store the current page as the previous page before navigation
 * @param currentPath - Current page path
 */
export const storePreviousPage = (currentPath: string) => {
	sessionStorage.setItem('previousPage', currentPath);
};

/**
 * Get the previous page path
 * @returns Previous page path or default fallback
 */
export const getPreviousPage = (): string => {
	return sessionStorage.getItem('previousPage') || '/';
};

/**
 * Clear the stored previous page
 */
export const clearPreviousPage = () => {
	sessionStorage.removeItem('previousPage');
};

/**
 * Navigate to pair details with context
 * @param symbol - Trading pair symbol
 * @param navigate - React Router navigate function
 * @param currentPath - Current page path to store as previous
 */
export const navigateToPairDetails = (symbol: string, navigate: (path: string) => void, currentPath: string) => {
	storePreviousPage(currentPath);
	navigate(`/pair/${symbol.replace('/', '-')}`);
};

/**
 * Navigate back to the previous page
 * @param navigate - React Router navigate function
 */
export const navigateBack = (navigate: (path: string) => void) => {
	const previousPage = getPreviousPage();
	clearPreviousPage();
	navigate(previousPage);
};
