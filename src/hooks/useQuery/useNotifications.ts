import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../constants/queryKeys';
import notificationsService from '../../service/notificationsService';
import type { NotificationRule } from '../../types/INotifications';

export const useNotifications = (userId: string) => {
	return useQuery({
		queryKey: QUERY_KEYS.NOTIFICATIONS(userId),
		queryFn: () => notificationsService.getNotifications(),
		enabled: !!userId,
		staleTime: 2 * 60 * 1000,
	});
};

export const useTradingPairs = () => {
	return useQuery({
		queryKey: QUERY_KEYS.TRADING_PAIRS,
		queryFn: () => notificationsService.getTradingPairs(),
		staleTime: 10 * 60 * 1000,
	});
};

export const useCreateNotification = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			userId: _userId,
			notification,
		}: {
			userId: string;
			notification: Omit<NotificationRule, 'id' | 'createdAt'>;
		}) => notificationsService.createNotification(notification),
		onSuccess: (_, { userId }) => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.NOTIFICATIONS(userId) });
		},
	});
};

export const useUpdateNotification = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			userId: _userId,
			id,
			updates,
		}: {
			userId: string;
			id: string;
			updates: Partial<NotificationRule>;
		}) => notificationsService.updateNotification(id, updates),
		onSuccess: (_, { userId }) => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.NOTIFICATIONS(userId) });
		},
	});
};

export const useDeleteNotification = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ userId: _userId, id }: { userId: string; id: string }) =>
			notificationsService.deleteNotification(id),
		onSuccess: (_, { userId }) => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.NOTIFICATIONS(userId) });
		},
	});
};

export const useSendTestNotification = () => {
	return useMutation({
		mutationFn: (_userId: string) => notificationsService.sendTestNotification(),
	});
};
