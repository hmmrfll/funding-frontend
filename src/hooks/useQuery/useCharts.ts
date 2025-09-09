import { QUERY_KEYS } from "../../constants/queryKeys";
import { getMarketSummary, getMarketOverview } from "../../service/chartsService";
import { useQuery } from "@tanstack/react-query";

export const useMarketSummary = () => {
	return useQuery({
		queryKey: QUERY_KEYS.MARKET_SUMMARY,
		queryFn: getMarketSummary,
		staleTime: 3 * 60 * 1000,
		refetchInterval: 2 * 60 * 1000,
	});
};

export const useMarketOverview = (timeframe: '1h' | '4h' | '24h' | '7d' = '24h') => {
	return useQuery({
		queryKey: QUERY_KEYS.MARKET_OVERVIEW(timeframe),
		queryFn: () => getMarketOverview(timeframe),
		staleTime: 5 * 60 * 1000,
	});
};
