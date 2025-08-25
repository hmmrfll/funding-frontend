import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUser, getUser, updateUser } from '../../service/shared';
import type { IUser, UserData } from '../../types/IUser';
import useTelegram from '../useTelegram';

export const useUser = ({ id }: { id?: string } = {}) => {
	const { user } = useTelegram();
	const userId = id || user?.id || '';

	const query = useQuery<IUser>({
		queryKey: ['user', String(userId)],
		queryFn: () => getUser(userId),
		staleTime: 1000 * 60 * 5, // Данные актуальны в течение 5 минут
		gcTime: 1000 * 60 * 10, // Кэш удаляется через 10 минут
		retry: false,
	});

	return {
		...query,
		user: query.data,
	};
};

export const useUserActions = () => {
	const queryClient = useQueryClient();
	const createMutation = useMutation<IUser, Error, UserData & { referrerPartnerId?: string }>({
		mutationFn: createUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user'] });
		},
	});

	const updateMutation = useMutation<IUser, Error, FormData>({
		mutationFn: updateUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user'] });
		},
	});

	return {
		createUser: createMutation.mutateAsync,
		updateUser: updateMutation.mutateAsync,
		isLoading: createMutation.isPending || updateMutation.isPending,
		error: createMutation.error || updateMutation.error,
	};
};
