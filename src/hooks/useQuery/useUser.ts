import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser, updateUser } from '../../service/shared';
import type { IUser } from '../../types/IUser';
import useTelegram from '../useTelegram';

export const useUser = () => {
	const { user: telegramUser } = useTelegram();

	const query = useQuery<IUser>({
		queryKey: ['user', 'me'],
		queryFn: getCurrentUser,
		staleTime: 1000 * 60 * 5, // 5 минут
		gcTime: 1000 * 60 * 10, // 10 минут
		retry: 1,
		enabled: !!telegramUser, // Выполняем только если есть telegram пользователь
	});

	return {
		...query,
		user: query.data,
	};
};

export const useUserActions = () => {
	const queryClient = useQueryClient();

	const updateMutation = useMutation<IUser, Error, Partial<IUser>>({
		mutationFn: updateUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user'] });
		},
	});

	return {
		updateUser: updateMutation.mutateAsync,
		isLoading: updateMutation.isPending,
		error: updateMutation.error,
	};
};
