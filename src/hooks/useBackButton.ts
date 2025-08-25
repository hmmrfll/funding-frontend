import { useEffect } from 'react';
import { useBackButtonStore } from '../store/BackButtonStore';

export const useBackButton = (callback: () => void) => {
	const addAction = useBackButtonStore((state) => state.addAction);
	const removeAction = useBackButtonStore((state) => state.removeAction);

	useEffect(() => {
		addAction(callback);
		return () => removeAction(callback);
	}, []);
};
