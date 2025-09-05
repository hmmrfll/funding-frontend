// src/blocs/NotificationsListBlock.tsx
import React from 'react';
import SquircleWrap from '../components/SquircleWrap';
import Skeleton from '../components/Skeleton';
import NotificationItem from '../components/NotificationItem';
import type { NotificationRule } from '../types/Shared';

interface NotificationsListBlockProps {
	notifications: NotificationRule[];
	onToggleNotification: (id: string) => void;
	onDeleteNotification: (id: string) => void;
	loading?: boolean;
}

const NotificationsListBlock: React.FC<NotificationsListBlockProps> = ({
	notifications,
	onToggleNotification,
	onDeleteNotification,
	loading = false,
}) => {
	return (
		<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
			<h3 className="font-tertiary-bold text-[var(--color-text)] mb-4">📋 Your Notifications</h3>

			{loading ? (
				<div className="space-y-3">
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className="bg-[var(--color-border)] bg-opacity-30 p-4 rounded-2xl"
						>
							<Skeleton className="h-4 w-1/4 mb-2" />
							<Skeleton className="h-3 w-1/2 mb-2" />
							<Skeleton className="h-3 w-1/3" />
						</div>
					))}
				</div>
			) : notifications.length === 0 ? (
				<div className="text-center py-8 text-[var(--color-text-tertiary)]">
					<div className="text-3xl mb-3">🔔</div>
					<div className="text-lg mb-2 font-medium">No notifications yet</div>
					<div className="text-sm">Create your first arbitrage alert</div>
				</div>
			) : (
				<div className="space-y-3">
					{notifications.map((notification) => (
						<NotificationItem
							key={notification.id}
							notification={notification}
							onToggle={onToggleNotification}
							onDelete={onDeleteNotification}
						/>
					))}
				</div>
			)}
		</SquircleWrap>
	);
};

export default NotificationsListBlock;
