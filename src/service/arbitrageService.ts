import fetchWithAuth from './fetchWithAuth';

export interface FundingRate {
	symbol: string;
	extended: {
		fundingRate: number | null;
		markPrice: number | string | null;
		nextFundingTime: string | null;
	};
	hyperliquid: {
		fundingRate: number | null;
		markPrice: number | string | null;
		openInterest: number | string | null;
	};
	available: {
		extended: boolean;
		hyperliquid: boolean;
		both: boolean;
	};
}

export interface ArbitrageOpportunity {
	symbol: string;
	extendedRate: number;
	hyperliquidRate: number;
	rateDifference: number;
	absRateDifference: number;
	strategy: string;
	potentialProfit: {
		hourly: number;
		daily: number;
		annualized: number;
	};
	riskLevel: 'low' | 'medium' | 'high';
	created_at: string;
}

export interface FundingRatesComparison {
	comparison: Record<string, FundingRate>;
	opportunities: ArbitrageOpportunity[];
	timestamp: string;
}

export interface PairDetails {
	current: FundingRate;
	history: Array<{
		symbol: string;
		extended_rate: number;
		timestamp: string;
		hyperliquid_rate: number;
	}>;
	statistics: {
		avgExtended: number;
		avgHyperliquid: number;
		maxSpread: number;
		minSpread: number;
		avgSpread: number;
	};
	opportunities: ArbitrageOpportunity[];
}

export const getFundingRatesComparison = (): Promise<FundingRatesComparison> => {
	return fetchWithAuth('/arbitrage/funding-rates');
};

export const getPairDetails = (symbol: string, days?: number): Promise<PairDetails> => {
	const params = days ? `?days=${days}` : '';
	return fetchWithAuth(`/arbitrage/pair/${symbol}${params}`);
};

export const getArbitrageOpportunities = (
	limit?: number,
	minProfit?: number,
): Promise<{
	opportunities: ArbitrageOpportunity[];
	count: number;
	timestamp: string;
}> => {
	const params = new URLSearchParams();
	if (limit) params.append('limit', limit.toString());
	if (minProfit) params.append('min_profit', minProfit.toString());

	return fetchWithAuth(`/arbitrage/opportunities?${params.toString()}`);
};
