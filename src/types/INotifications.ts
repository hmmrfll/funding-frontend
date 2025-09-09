
export interface NotificationRule {
	id: string;
	type: 'global' | 'pair';
	symbol?: string;
	symbolLabel?: string;
	threshold: number;
	enabled: boolean;
	createdAt: string;
	updatedAt?: string;
}

export interface TradingPair {
	symbol: string;
	label: string;
	currentRate: number;
}

export interface NotificationSettings {
	userId: string;
	rules: NotificationRule[];
	lastUpdated: string;
}

export interface NotificationCreateRequest {
	type: 'global' | 'pair';
	symbol?: string;
	threshold: number;
}

export interface NotificationUpdateRequest {
	enabled?: boolean;
	threshold?: number;
}

export interface ApiNotificationRule {
	id: string;
	userId: string;
	type: 'global' | 'pair';
	symbol?: string;
	threshold: number;
	enabled: boolean;
	createdAt: string;
	updatedAt?: string;
}
