import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../constants/queryKeys';
import {
	getFundingRatesComparison,
	getPairDetails,
	getArbitrageOpportunitiesPaginated,
} from '../../service/arbitrageService';
import { usePaginatedQuery } from '../../service/shared';
import type { ArbitrageOpportunity } from '../../types/IArbitrage';

export const useFundingRatesComparison = () => {
	return useQuery({
		queryKey: QUERY_KEYS.FUNDING_RATES_COMPARISON,
		queryFn: getFundingRatesComparison,
		staleTime: 2 * 60 * 1000,
		refetchInterval: 30 * 1000,
	});
};

export const usePairDetails = (symbol: string, days?: number) => {
	return useQuery({
		queryKey: QUERY_KEYS.PAIR_DETAILS(symbol, days),
		queryFn: () => getPairDetails(symbol, days),
		enabled: !!symbol,
		staleTime: 5 * 60 * 1000,
	});
};

export const useArbitrageOpportunities = (minProfit: number = 0.0001) => {
	const { data, total, ...rest } = usePaginatedQuery<ArbitrageOpportunity, { minProfit: number }>(
		['arbitrage-opportunities'],
		getArbitrageOpportunitiesPaginated,
		{ minProfit },
		true,
	);

	return {
		opportunities: data,
		totalOpportunities: total,
		...rest,
	};
};
