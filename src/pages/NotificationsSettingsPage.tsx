// src/pages/NotificationsSettingsPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackButton } from '../hooks/useBackButton';
import { fullScreenPaddingTop } from '../utils/isMobile';
import ActionCard from '../components/ActionCard';
import NotificationsListBlock from '../blocs/NotificationsListBlock';
import { useAuth } from '../providers/AuthProvider';
import useTelegram from '../hooks/useTelegram';
import type { NotificationRule } from '../types/Shared';
import notificationsService from '../service/notificationsService';

const NotificationsSettingsPage: React.FC = () => {
	const navigate = useNavigate();
	const { user, isAuthenticated } = useAuth();
	const { hapticTrigger } = useTelegram();
	const [notifications, setNotifications] = useState<NotificationRule[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [testNotificationSent, setTestNotificationSent] = useState(false);

	useBackButton(() => navigate('/'));

	const loadNotifications = useCallback(async () => {
		if (!user?.id || !isAuthenticated) {
			setLoading(false);
			return;
		}

		try {
			setLoading(true);
			setError(null);

			const data = await notificationsService.getNotifications(user.id);
			setNotifications(data);
		} catch (error) {
			console.error('Failed to load notifications:', error);
			setError('Unable to load notifications. Please try again.');
		} finally {
			setLoading(false);
		}
	}, [user?.id, isAuthenticated]);

	useEffect(() => {
		loadNotifications();
	}, [loadNotifications]);

	const handleToggleNotification = async (id: string) => {
		if (!user?.id) return;

		try {
			hapticTrigger('soft');

			const notification = notifications.find((n) => n.id === id);
			if (!notification) return;

			const updatedNotification = await notificationsService.updateNotification(user.id, id, {
				enabled: !notification.enabled,
			});

			setNotifications((prev) => prev.map((n) => (n.id === id ? updatedNotification : n)));
		} catch (error) {
			console.error('Failed to toggle notification:', error);
			setError('Failed to update notification. Please try again.');
		}
	};

	const handleDeleteNotification = async (id: string) => {
		if (!user?.id) return;

		try {
			hapticTrigger('medium');

			await notificationsService.deleteNotification(user.id, id);
			setNotifications((prev) => prev.filter((n) => n.id !== id));
		} catch (error) {
			console.error('Failed to delete notification:', error);
			setError('Failed to delete notification. Please try again.');
		}
	};

	const handleSendTestNotification = async () => {
		if (!user?.id) return;

		try {
			hapticTrigger('medium');
			await notificationsService.sendTestNotification(user.id);

			setTestNotificationSent(true);
			hapticTrigger('heavy');
			setTimeout(() => setTestNotificationSent(false), 3000);
		} catch (error) {
			console.error('Failed to send test notification:', error);
			setError('Failed to send test notification. Please try again.');
		}
	};

	const activeCount = notifications.filter((n) => n.enabled).length;


	if (error) {
		return (
			<div className="flex flex-col gap-6 pb-6">
				<div className={`flex items-start justify-between gap-4 ${fullScreenPaddingTop}`}>
					<div className="flex-1 min-w-0">
						<h1 className="font-tertiary-bold text-[var(--color-text)] text-xl">Notifications</h1>
						<span className="text-sm text-[var(--color-text-tertiary)]">Manage your arbitrage alerts</span>
					</div>
				</div>

				<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-2xl">
					<div className="text-center">
						<div className="text-red-600 dark:text-red-400 text-lg mb-2">⚠️</div>
						<div className="text-red-800 dark:text-red-200 font-medium mb-2">Error loading notifications</div>
						<div className="text-red-600 dark:text-red-400 text-sm mb-4">{error}</div>
						<button
							onClick={loadNotifications}
							className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
						>
							Try Again
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6 pb-6">
			{/* Header */}
			<div className={`flex items-start justify-between gap-4 ${fullScreenPaddingTop}`}>
				<div className="flex-1 min-w-0">
					<h1 className="font-tertiary-bold text-[var(--color-text)] text-xl">Notifications</h1>
					<span className="text-sm text-[var(--color-text-tertiary)]">Manage your arbitrage alerts</span>
				</div>
				<div className="flex items-center gap-2">
					<div className={`w-2 h-2 rounded-full ${activeCount > 0 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
					<span className="text-xs text-[var(--color-text-tertiary)]">{activeCount} active</span>
				</div>
			</div>

			{/* Create New Notification */}
			<ActionCard
				icon="➕"
				title="Create New Notification"
				description="Set up a new arbitrage alert"
				onClick={() => navigate('/settings/notifications/create')}
				className="bg-[var(--color-primary)] bg-opacity-10 border border-[var(--color-primary)] border-opacity-30"
			/>

			{/* Notifications List */}
			<NotificationsListBlock
				notifications={notifications}
				onToggleNotification={handleToggleNotification}
				onDeleteNotification={handleDeleteNotification}
				loading={loading}
			/>

			{/* Test Notification */}
			<ActionCard
				icon="🧪"
				title="Send Test Notification"
				description={testNotificationSent ? 'Test notification sent!' : 'Check if notifications are working'}
				buttonText={testNotificationSent ? 'Sent ✓' : 'Test'}
				onClick={handleSendTestNotification}
				showChevron={false}
				className={
					testNotificationSent
						? 'bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700'
						: 'bg-[var(--color-bg-secondary)] border-0'
				}
			/>
		</div>
	);
};

export default NotificationsSettingsPage;
