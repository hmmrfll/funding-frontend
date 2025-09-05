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

export interface PaginationInfo {
	offset: number;
	limit: number;
	total: number;
	hasMore: boolean;
	nextOffset: number | null;
}

export interface ArbitrageOpportunitiesResponse {
	opportunities: ArbitrageOpportunity[];
	pagination: PaginationInfo;
	timestamp: string;
}

export const getArbitrageOpportunities = (
	offset: number = 0,
	limit: number = 10,
	minProfit: number = 0.0001,
): Promise<ArbitrageOpportunitiesResponse> => {
	const params = new URLSearchParams();
	params.append('offset', offset.toString());
	params.append('limit', limit.toString());
	params.append('min_profit', minProfit.toString());

	return fetchWithAuth(`/arbitrage/opportunities?${params.toString()}`);
};
