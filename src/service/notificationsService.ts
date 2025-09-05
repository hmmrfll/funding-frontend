// src/service/notificationsService.ts
import type { NotificationRule, TradingPair, NotificationSettings } from '../types/Shared';
import fetchWithAuth from './fetchWithAuth';

// Моковые данные для торговых пар
const AVAILABLE_PAIRS: TradingPair[] = [
	{ symbol: 'BTC/USD', label: 'Bitcoin/USD', currentRate: 0.0125 },
	{ symbol: 'ETH/USD', label: 'Ethereum/USD', currentRate: -0.0089 },
	{ symbol: 'SOL/USD', label: 'Solana/USD', currentRate: 0.0234 },
	{ symbol: 'AVAX/USD', label: 'Avalanche/USD', currentRate: -0.0156 },
	{ symbol: 'MATIC/USD', label: 'Polygon/USD', currentRate: 0.0078 },
	{ symbol: 'ADA/USD', label: 'Cardano/USD', currentRate: 0.0192 },
	{ symbol: 'DOT/USD', label: 'Polkadot/USD', currentRate: 0.0145 },
	{ symbol: 'LINK/USD', label: 'Chainlink/USD', currentRate: -0.0034 },
];

// Моковые данные для уведомлений
const MOCK_NOTIFICATIONS: NotificationRule[] = [
	{
		id: '1',
		type: 'global',
		threshold: 0.015,
		enabled: true,
		createdAt: '2024-01-15T10:30:00Z',
	},
	{
		id: '2',
		type: 'pair',
		symbol: 'BTC/USD',
		symbolLabel: 'Bitcoin/USD',
		threshold: 0.02,
		enabled: true,
		createdAt: '2024-01-15T11:15:00Z',
	},
	{
		id: '3',
		type: 'pair',
		symbol: 'ETH/USD',
		symbolLabel: 'Ethereum/USD',
		threshold: 0.012,
		enabled: false,
		createdAt: '2024-01-15T12:00:00Z',
	},
];

class NotificationsService {
	private getStorageKey(userId: string): string {
		return `notifications_${userId}`;
	}

	async getNotifications(userId: string): Promise<NotificationRule[]> {
		try {
			// В будущем здесь будет API запрос
			// const response = await fetchWithAuth('/api/notifications');
			// return response.data;

			// Пока используем localStorage
			const savedNotifications = localStorage.getItem(this.getStorageKey(userId));
			return savedNotifications ? JSON.parse(savedNotifications) : MOCK_NOTIFICATIONS;
		} catch (error) {
			console.error('Failed to load notifications:', error);
			return MOCK_NOTIFICATIONS;
		}
	}

	async saveNotifications(userId: string, notifications: NotificationRule[]): Promise<void> {
		try {
			// В будущем здесь будет API запрос
			// await fetchWithAuth('/api/notifications', {
			// 	method: 'POST',
			// 	body: JSON.stringify({ rules: notifications })
			// });

			// Пока используем localStorage
			localStorage.setItem(this.getStorageKey(userId), JSON.stringify(notifications));
		} catch (error) {
			console.error('Failed to save notifications:', error);
			throw error;
		}
	}

	async createNotification(
		userId: string,
		notification: Omit<NotificationRule, 'id' | 'createdAt'>,
	): Promise<NotificationRule> {
		try {
			const newNotification: NotificationRule = {
				...notification,
				id: Date.now().toString(),
				createdAt: new Date().toISOString(),
			};

			const existingNotifications = await this.getNotifications(userId);
			const updatedNotifications = [...existingNotifications, newNotification];

			await this.saveNotifications(userId, updatedNotifications);
			return newNotification;
		} catch (error) {
			console.error('Failed to create notification:', error);
			throw error;
		}
	}

	async updateNotification(userId: string, id: string, updates: Partial<NotificationRule>): Promise<NotificationRule> {
		try {
			const notifications = await this.getNotifications(userId);
			const updatedNotifications = notifications.map((notification) =>
				notification.id === id ? { ...notification, ...updates, updatedAt: new Date().toISOString() } : notification,
			);

			await this.saveNotifications(userId, updatedNotifications);

			const updatedNotification = updatedNotifications.find((n) => n.id === id);
			if (!updatedNotification) {
				throw new Error('Notification not found');
			}

			return updatedNotification;
		} catch (error) {
			console.error('Failed to update notification:', error);
			throw error;
		}
	}

	async deleteNotification(userId: string, id: string): Promise<void> {
		try {
			const notifications = await this.getNotifications(userId);
			const updatedNotifications = notifications.filter((notification) => notification.id !== id);

			await this.saveNotifications(userId, updatedNotifications);
		} catch (error) {
			console.error('Failed to delete notification:', error);
			throw error;
		}
	}

	async getTradingPairs(): Promise<TradingPair[]> {
		try {
			// В будущем здесь будет API запрос
			// const response = await fetchWithAuth('/api/trading-pairs');
			// return response.data;

			// Пока возвращаем моковые данные
			return AVAILABLE_PAIRS;
		} catch (error) {
			console.error('Failed to load trading pairs:', error);
			return AVAILABLE_PAIRS;
		}
	}

	async sendTestNotification(userId: string): Promise<void> {
		try {
			// В будущем здесь будет API запрос
			// await fetchWithAuth('/api/notifications/test', {
			// 	method: 'POST',
			// 	body: JSON.stringify({ userId })
			// });

			// Пока имитируем отправку
			await new Promise((resolve) => setTimeout(resolve, 1000));
		} catch (error) {
			console.error('Failed to send test notification:', error);
			throw error;
		}
	}

	// Утилиты
	formatPercentage(value: number): string {
		return `${(value * 100).toFixed(2)}%`;
	}

	formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString();
	}

	getCurrentRate(pair: TradingPair): string {
		return this.formatPercentage(pair.currentRate);
	}
}

export const notificationsService = new NotificationsService();
export default notificationsService;
