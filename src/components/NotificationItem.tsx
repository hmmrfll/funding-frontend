// src/components/NotificationItem.tsx
import React from 'react';
import SquircleWrap from './SquircleWrap';
import type { NotificationRule } from '../types/Shared';
import notificationsService from '../service/notificationsService';

interface NotificationItemProps {
	notification: NotificationRule;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onToggle, onDelete }) => {
	return (
		<SquircleWrap className="bg-[var(--color-border)] bg-opacity-30 p-4">
			<div className="flex items-start justify-between">
				<div className="flex-1">
					<div className="flex items-center gap-2 mb-2">
						<div className={`w-2 h-2 rounded-full ${notification.enabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
						<span className="font-medium text-[var(--color-text)]">
							{notification.type === 'global' ? '🌍 Global Alert' : `📊 ${notification.symbolLabel}`}
						</span>
					</div>

					<div className="text-sm text-[var(--color-text-tertiary)] mb-2">
						{notification.type === 'global'
							? `All pairs above ${notificationsService.formatPercentage(notification.threshold)}`
							: `${notification.symbol} above ${notificationsService.formatPercentage(notification.threshold)}`}
					</div>

					<div className="text-xs text-[var(--color-text-tertiary)]">
						Created: {notificationsService.formatDate(notification.createdAt)}
					</div>
				</div>

				<div className="flex flex-col gap-2 ml-4">
					<button
						onClick={() => onToggle(notification.id)}
						className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
							notification.enabled
								? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
								: 'bg-green-100 text-green-700 hover:bg-green-200'
						}`}
					>
						{notification.enabled ? 'Pause' : 'Resume'}
					</button>

					<button
						onClick={() => onDelete(notification.id)}
						className="px-3 py-1 rounded text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
					>
						Delete
					</button>
				</div>
			</div>
		</SquircleWrap>
	);
};

export default NotificationItem;
