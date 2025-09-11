export const QUERY_KEYS = {
	// Arbitrage
	FUNDING_RATES_COMPARISON: ['funding-rates-comparison'] as const,
	PAIR_DETAILS: (symbol: string, days?: number) => ['pair-details', symbol, days] as const,
	ARBITRAGE_OPPORTUNITIES: (offset: number, limit: number, minProfit: number) =>
		['arbitrage-opportunities', offset, limit, minProfit] as const,

	// Charts
	FUNDING_RATE_HISTORY: (symbol?: string, timeframe?: string) => ['funding-rate-history', symbol, timeframe] as const,
	MARKET_SUMMARY: (timeframe: string) => ['market-summary', timeframe] as const,
	MARKET_OVERVIEW: (timeframe: string) => ['market-overview', timeframe] as const,
	ACTIVITY_BY_TIME: (timeframe: string) => ['activity-by-time', timeframe] as const,
	PROFITABILITY_BY_TIME: (timeframe: string) => ['profitability-by-time', timeframe] as const,
	VOLUME_ANALYSIS: (timeframe: string) => ['volume-analysis', timeframe] as const,
	FUNDING_RATE_SNAPSHOTS: (symbols?: string[]) => ['funding-rate-snapshots', symbols] as const,
	ARBITRAGE_METRICS: (timeframe: string) => ['arbitrage-metrics', timeframe] as const,
	EXCHANGE_COMPARISON: ['exchange-comparison'] as const,
	HISTORICAL_PROFITS: (timeframe: string, symbol?: string) => ['historical-profits', timeframe, symbol] as const,
	ARBITRAGE_OPPORTUNITIES_CHARTS: (offset: number, limit: number, minProfit: number) =>
		['arbitrage-opportunities-charts', offset, limit, minProfit] as const,

	// Notifications
	NOTIFICATIONS: (userId: string) => ['notifications', userId] as const,
	TRADING_PAIRS: ['trading-pairs'] as const,

	// User
	CURRENT_USER: ['current-user'] as const,
	USER_BY_CODE: (userCode: string) => ['user-by-code', userCode] as const,
} as const;
