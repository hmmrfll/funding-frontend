import { useCallback, useState } from 'react'; //

interface UseDropdownStateReturn {
	render: boolean;
	isOpen: boolean;
	openDropdown: () => void;
	closeDropdown: () => void;
}

export const useDropdownState = (): UseDropdownStateReturn => {
	const [render, setRender] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const openDropdown = useCallback(() => {
		setRender(true);
		setTimeout(() => {
			setIsOpen(true);
		}, 100);
	}, []);

	const closeDropdown = useCallback(() => {
		setIsOpen(false);
		setTimeout(() => {
			setRender(false);
		}, 300);
	}, []);

	return { render, isOpen, openDropdown, closeDropdown };
};
