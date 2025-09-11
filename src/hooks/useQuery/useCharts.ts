import { QUERY_KEYS } from '../../constants/queryKeys';
import {
	getMarketSummary,
	getMarketOverview,
	getActivityByTime,
	getProfitabilityByTime,
} from '../../service/chartsService';
import { useQuery } from '@tanstack/react-query';

export const useMarketSummary = (timeframe: '1h' | '4h' | '24h' | '7d' = '24h') => {
	return useQuery({
		queryKey: QUERY_KEYS.MARKET_SUMMARY(timeframe),
		queryFn: () => getMarketSummary(timeframe),
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

export const useActivityByTime = (timeframe: '1h' | '4h' | '24h' | '7d' = '24h') => {
	return useQuery({
		queryKey: QUERY_KEYS.ACTIVITY_BY_TIME(timeframe),
		queryFn: () => getActivityByTime(timeframe),
		staleTime: 10 * 60 * 1000, // 10 минут, так как данные меняются реже
		refetchInterval: 5 * 60 * 1000, // Обновляем каждые 5 минут
	});
};

export const useProfitabilityByTime = (timeframe: '1h' | '4h' | '24h' | '7d' = '24h') => {
	return useQuery({
		queryKey: QUERY_KEYS.PROFITABILITY_BY_TIME(timeframe),
		queryFn: () => getProfitabilityByTime(timeframe),
		staleTime: 10 * 60 * 1000, // 10 минут, так как данные меняются реже
		refetchInterval: 5 * 60 * 1000, // Обновляем каждые 5 минут
	});
};
