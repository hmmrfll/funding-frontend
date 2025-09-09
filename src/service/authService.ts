import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useAuthCallback = () => {
	const { login } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get('token');

		if (token) {
			login(token);

			navigate('/', { replace: true });
		} else {
			navigate('/', { replace: true });
		}
	}, [login, navigate]);
};
