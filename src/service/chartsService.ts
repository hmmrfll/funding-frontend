// src/service/chartsService.ts
import fetchWithAuth from './fetchWithAuth';

// Типы данных для графиков
export interface FundingRateHistoryPoint {
	timestamp: string;
	extended: number;
	hyperliquid: number;
	spread: number;
	symbol: string;
}

export interface MarketSummary {
	totalVolume: number;
	totalPairs: number;
	avgSpread: number;
	topOpportunities: {
		symbol: string;
		profit: number;
		volume: number;
	}[];
}

export interface MarketOverviewPoint {
	timestamp: string;
	totalVolume: number;
	activeOpportunities: number;
	avgSpread: number;
	maxProfitPotential: number;
}

export interface VolumeAnalysis {
	symbol: string;
	extendedVolume: number;
	hyperliquidVolume: number;
	totalVolume: number;
	volumeRatio: number;
}

export interface FundingRateSnapshot {
	symbol: string;
	timestamp: string;
	extended: {
		rate: number;
		nextFunding: string;
		markPrice: number;
	};
	hyperliquid: {
		rate: number;
		nextFunding: string;
		markPrice: number;
		openInterest: number;
	};
}

export interface ArbitrageMetrics {
	timestamp: string;
	totalOpportunities: number;
	avgProfitPotential: number;
	maxProfitPotential: number;
	activeSymbols: number;
	totalVolume: number;
}

export interface ExchangeComparison {
	extended: {
		totalPairs: number;
		avgFundingRate: number;
		totalVolume: number;
		uptime: number;
	};
	hyperliquid: {
		totalPairs: number;
		avgFundingRate: number;
		totalVolume: number;
		uptime: number;
	};
}

export interface HistoricalProfit {
	timestamp: string;
	symbol: string;
	realizedProfit: number;
	potentialProfit: number;
	fundingCost: number;
	netProfit: number;
}

export interface PaginationInfo {
	offset: number;
	limit: number;
	total: number;
	hasMore: boolean;
	nextOffset: number | null;
}

export interface ArbitrageOpportunity {
	symbol: string;
	extendedRate: number;
	hyperliquidRate: number;
	rateDifference: number;
	absRateDifference: number;
	profitPotential: number;
	volume: number;
	timestamp: string;
}

export interface ArbitrageOpportunitiesResponse {
	opportunities: ArbitrageOpportunity[];
	pagination: PaginationInfo;
	timestamp: string;
}

// Основные функции API
export const getFundingRateHistory = async (
	symbol?: string,
	timeframe: '1h' | '4h' | '24h' | '7d' = '24h',
): Promise<FundingRateHistoryPoint[]> => {
	const params = new URLSearchParams();
	if (symbol) params.append('symbol', symbol);
	params.append('timeframe', timeframe);

	const data = await fetchWithAuth(`/charts/funding-rates?${params.toString()}`);
	return data;
};

export const getMarketSummary = async (): Promise<MarketSummary> => {
	const data = await fetchWithAuth('/charts/market-summary');
	return data;
};

export const getMarketOverview = async (
	timeframe: '1h' | '4h' | '24h' | '7d' = '24h',
): Promise<MarketOverviewPoint[]> => {
	const params = new URLSearchParams();
	params.append('timeframe', timeframe);

	const data = await fetchWithAuth(`/charts/market-overview?${params.toString()}`);
	return data;
};

// Дополнительные функции
export const getVolumeAnalysis = async (timeframe: '24h' | '7d' | '30d' = '24h'): Promise<VolumeAnalysis[]> => {
	const params = new URLSearchParams();
	params.append('timeframe', timeframe);

	const data = await fetchWithAuth(`/charts/volume-analysis?${params.toString()}`);
	return data;
};

export const getFundingRateSnapshots = async (_symbols?: string[]): Promise<FundingRateSnapshot[]> => {
	return generateMockFundingSnapshots();
};

export const getArbitrageMetrics = async (
	timeframe: '1h' | '4h' | '24h' | '7d' = '24h',
): Promise<ArbitrageMetrics[]> => {
	const params = new URLSearchParams();
	params.append('timeframe', timeframe);

	const data = await fetchWithAuth(`/charts/arbitrage-metrics?${params.toString()}`);
	return data;
};

export const getExchangeComparison = async (): Promise<ExchangeComparison> => {
	const data = await fetchWithAuth('/charts/exchange-comparison');
	return data;
};

export const getHistoricalProfits = async (
	timeframe: '24h' | '7d' | '30d' = '7d',
	symbol?: string,
): Promise<HistoricalProfit[]> => {
	const params = new URLSearchParams();
	params.append('timeframe', timeframe);
	if (symbol) params.append('symbol', symbol);

	const data = await fetchWithAuth(`/charts/historical-profits?${params.toString()}`);
	return data;
};

export const getArbitrageOpportunities = async (
	offset: number = 0,
	limit: number = 10,
	minProfit: number = 0.0001,
): Promise<ArbitrageOpportunitiesResponse> => {
	const params = new URLSearchParams();
	params.append('offset', offset.toString());
	params.append('limit', limit.toString());
	params.append('min_profit', minProfit.toString());

	const data = await fetchWithAuth(`/arbitrage/opportunities?${params.toString()}`);
	return data;
};

export const exportChartData = async (chartType: string, data: any[], filename?: string): Promise<void> => {
	try {
		const csvContent = convertToCSV(data);
		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);

		link.setAttribute('href', url);
		link.setAttribute('download', filename || `${chartType}_data_${new Date().toISOString().split('T')[0]}.csv`);
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		URL.revokeObjectURL(url);
	} catch (error) {
		console.error('Error exporting chart data:', error);
		throw new Error('Failed to export chart data');
	}
};

export const exportAllChartsData = async (): Promise<void> => {
	try {
		const [fundingRates, marketSummary] = await Promise.all([
			getFundingRateHistory(undefined, '24h'),
			getMarketSummary(),
		]);

		const timestamp = new Date().toISOString().split('T')[0];

		await exportChartData('funding_rates', fundingRates, `funding_rates_${timestamp}.csv`);
		await exportChartData('market_summary', [marketSummary], `market_summary_${timestamp}.csv`);

		console.log('All charts data exported successfully');
	} catch (error) {
		console.error('Error exporting all charts data:', error);
		throw new Error('Failed to export all charts data');
	}
};

const convertToCSV = (data: any[]): string => {
	if (!data.length) return '';

	const headers = Object.keys(data[0]);
	const csvRows = [headers.join(',')];

	for (const row of data) {
		const values = headers.map((header) => {
			const value = row[header];
			if (value === null || value === undefined) return '';
			if (typeof value === 'object') return JSON.stringify(value);
			if (typeof value === 'string') return `"${value.replace(/"/g, '""')}"`;
			return value;
		});
		csvRows.push(values.join(','));
	}

	return csvRows.join('\n');
};

const generateMockFundingSnapshots = (): FundingRateSnapshot[] => {
	const symbols = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'AVAX/USDT', 'MATIC/USDT'];
	const now = new Date().toISOString();

	return symbols.map((symbol) => ({
		symbol,
		timestamp: now,
		extended: {
			rate: (Math.random() - 0.5) * 0.002,
			nextFunding: new Date(Date.now() + 8 * 3600000).toISOString(),
			markPrice: 40000 + Math.random() * 10000,
		},
		hyperliquid: {
			rate: (Math.random() - 0.5) * 0.002,
			nextFunding: new Date(Date.now() + 3600000).toISOString(),
			markPrice: 40000 + Math.random() * 10000,
			openInterest: Math.random() * 50000000,
		},
	}));
};

export const subscribeToRealTimeUpdates = (
	callback: (data: any) => void,
	types: string[] = ['funding', 'market'],
): (() => void) => {
	const interval = setInterval(async () => {
		try {
			if (types.includes('funding')) {
				const fundingData = await getFundingRateHistory(undefined, '1h');
				callback({ type: 'funding', data: fundingData });
			}

			if (types.includes('market')) {
				const marketData = await getMarketSummary();
				callback({ type: 'market', data: marketData });
			}
		} catch (error) {
			console.error('Error in real-time updates:', error);
		}
	}, 30000);

	return () => clearInterval(interval);
};

const cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

export const getCachedData = <T>(key: string, fetchFunction: () => Promise<T>, ttlMinutes: number = 5): Promise<T> => {
	const cached = cache.get(key);
	const now = Date.now();

	if (cached && now - cached.timestamp < cached.ttl * 60 * 1000) {
		return Promise.resolve(cached.data);
	}

	return fetchFunction().then((data) => {
		cache.set(key, {
			data,
			timestamp: now,
			ttl: ttlMinutes,
		});
		return data;
	});
};

export const clearCache = (pattern?: string): void => {
	if (pattern) {
		const keys = Array.from(cache.keys()).filter((key) => key.includes(pattern));
		keys.forEach((key) => cache.delete(key));
	} else {
		cache.clear();
	}
};
