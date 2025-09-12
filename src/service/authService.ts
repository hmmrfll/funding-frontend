import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useAuthCallback = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get('token');

		if (token) {
			// TODO: Implement token handling
			console.log('Token received:', token);
		}

		navigate('/', { replace: true });
	}, [navigate]);
};
