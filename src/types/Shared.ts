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
