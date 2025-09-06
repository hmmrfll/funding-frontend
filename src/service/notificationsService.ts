// src/service/notificationsService.ts
import type { NotificationRule, TradingPair } from '../types/Shared';
import fetchWithAuth from './fetchWithAuth';

class NotificationsService {
	// API методы для уведомлений
	async getNotifications(userId: string): Promise<NotificationRule[]> {
		try {
			const response = await fetchWithAuth('/notifications/rules');
			return response.map(this.transformNotificationFromAPI);
		} catch (error) {
			console.error('Failed to load notifications:', error);
			throw new Error('Unable to load notifications. Please try again.');
		}
	}

	async createNotification(
		userId: string,
		notification: Omit<NotificationRule, 'id' | 'createdAt'>,
	): Promise<NotificationRule> {
		try {
			const requestData = {
				type: notification.type,
				symbol: notification.symbol || null,
				threshold: notification.threshold,
			};

			const response = await fetchWithAuth('/notifications/rules', {
				method: 'POST',
				body: JSON.stringify(requestData),
			});

			return this.transformNotificationFromAPI(response);
		} catch (error) {
			console.error('Failed to create notification:', error);
			throw new Error('Failed to create notification. Please try again.');
		}
	}

	async updateNotification(userId: string, id: string, updates: Partial<NotificationRule>): Promise<NotificationRule> {
		try {
			const requestData: any = {};

			if (updates.enabled !== undefined) {
				requestData.enabled = updates.enabled;
			}

			if (updates.threshold !== undefined) {
				requestData.threshold = updates.threshold;
			}

			const response = await fetchWithAuth(`/notifications/rules/${id}`, {
				method: 'PUT',
				body: JSON.stringify(requestData),
			});

			return this.transformNotificationFromAPI(response);
		} catch (error) {
			console.error('Failed to update notification:', error);
			throw new Error('Failed to update notification. Please try again.');
		}
	}

	async deleteNotification(userId: string, id: string): Promise<void> {
		try {
			await fetchWithAuth(`/notifications/rules/${id}`, {
				method: 'DELETE',
			});
		} catch (error) {
			console.error('Failed to delete notification:', error);
			throw new Error('Failed to delete notification. Please try again.');
		}
	}

	async getTradingPairs(): Promise<TradingPair[]> {
		try {
			// Получаем данные из funding rates comparison
			const response = await fetchWithAuth('/arbitrage/funding-rates');

			const pairs: TradingPair[] = Object.entries(response.comparison || {})
				.filter(([_, pair]: [string, any]) => pair && pair.available && pair.available.both)
				.map(([symbol, pair]: [string, any]) => ({
					symbol,
					label: this.generatePairLabel(symbol),
					currentRate: pair.extended.fundingRate || 0,
				}));

			return pairs.sort((a, b) => a.label.localeCompare(b.label));
		} catch (error) {
			console.error('Failed to load trading pairs:', error);
			throw new Error('Unable to load trading pairs. Please try again.');
		}
	}

	async sendTestNotification(userId: string): Promise<void> {
		try {
			// Пока тестовое уведомление можно отправить через создание временного правила
			// В будущем можно добавить отдельный endpoint
			await new Promise(resolve => setTimeout(resolve, 1000));
			console.log('Test notification sent (simulated)');
		} catch (error) {
			console.error('Failed to send test notification:', error);
			throw new Error('Failed to send test notification. Please try again.');
		}
	}

	// Трансформация данных с API в формат фронтенда
	private transformNotificationFromAPI(apiData: any): NotificationRule {
		return {
			id: apiData.id,
			type: apiData.type,
			symbol: apiData.symbol,
			symbolLabel: apiData.symbol ? this.generatePairLabel(apiData.symbol) : undefined,
			threshold: apiData.threshold,
			enabled: apiData.enabled,
			createdAt: apiData.createdAt,
			updatedAt: apiData.updatedAt,
		};
	}

	// Генерация читаемого названия пары
	private generatePairLabel(symbol: string): string {
		const symbolMap: Record<string, string> = {
			'BTC/USD': 'Bitcoin/USD',
			'ETH/USD': 'Ethereum/USD',
			'SOL/USD': 'Solana/USD',
			'AVAX/USD': 'Avalanche/USD',
			'MATIC/USD': 'Polygon/USD',
			'ADA/USD': 'Cardano/USD',
			'DOT/USD': 'Polkadot/USD',
			'LINK/USD': 'Chainlink/USD',
			'UNI/USD': 'Uniswap/USD',
			'ATOM/USD': 'Cosmos/USD',
		};

		return symbolMap[symbol] || symbol;
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
