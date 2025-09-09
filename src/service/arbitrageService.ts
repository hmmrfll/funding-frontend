import fetchWithAuth from './fetchWithAuth';
import type {
	FundingRatesComparison,
	PairDetails,
	ArbitrageOpportunitiesResponse,
	PaginatedArbitrageResponse,
} from '../types/IArbitrage';

export const getFundingRatesComparison = (): Promise<FundingRatesComparison> => {
	return fetchWithAuth('/arbitrage/funding-rates');
};

export const getPairDetails = (symbol: string, days?: number): Promise<PairDetails> => {
	const params = days ? `?days=${days}` : '';
	return fetchWithAuth(`/arbitrage/pair/${symbol}${params}`);
};

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

export const getArbitrageOpportunitiesPaginated = async ({
	page,
	minProfit,
}: {
	page: number;
	minProfit: number;
}): Promise<PaginatedArbitrageResponse> => {
	const limit = 10;
	const offset = (page - 1) * limit;

	const response = await getArbitrageOpportunities(offset, limit, minProfit);

	return {
		data: response.opportunities,
		total: response.pagination.total,
		totalPages: Math.ceil(response.pagination.total / limit),
		page,
		limit,
	};
};
