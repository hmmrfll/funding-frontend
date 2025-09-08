import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBackButton } from '../hooks/useBackButton';
import { navigateBack } from '../utils/navigationUtils';
import { getFundingRatesComparison } from '../service/arbitrageService';
import type { FundingRatesComparison } from '../service/arbitrageService';
import type { SortOption, FilterState } from '../types/SearchPanel';
import { DEFAULT_FILTERS } from '../types/SearchPanel';
import { fullScreenPaddingTop } from '../utils/isMobile';
import { getProfitPotential, getRiskLevel, handlePairClick as handlePairClickUtil } from '../utils/arbitrageUtils';
import SquircleWrap from '../components/SquircleWrap';
import PairCard from '../components/PairCard';
import ActionCard from '../components/ActionCard';
import SearchBlock from '../blocs/SearchBlock';
import ErrorBlock from '../blocs/ErrorBlock';

const AnalyticsPage: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [data, setData] = useState<FundingRatesComparison | null>(null);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [sortBy, setSortBy] = useState<SortOption>('profit_desc');
	const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

	const [displayedPairs, setDisplayedPairs] = useState<
		Array<{ key: string; pair: any; profit: number; riskLevel: string }>
	>([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [loadingMore, setLoadingMore] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const itemsPerPage = 10;
	const observerRef = useRef<IntersectionObserver | null>(null);
	const loadMoreRef = useRef<HTMLDivElement | null>(null);

	useBackButton(() => navigateBack(navigate));

	useEffect(() => {
		const fetchData = async (isInitialLoad = true) => {
			try {
				if (isInitialLoad) {
					setLoading(true);
				} else {
					setRefreshing(true);
				}

				const result = await getFundingRatesComparison();
				setData(result);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to fetch analytics data');
			} finally {
				setLoading(false);
				setRefreshing(false);
			}
		};

		fetchData(true);
		const interval = setInterval(() => fetchData(false), 30000);
		return () => clearInterval(interval);
	}, []);

	const handlePairClick = (symbol: string) => {
		handlePairClickUtil(symbol, navigate, location.pathname);
	};

	const allFilteredAndSortedPairs = useMemo(() => {
		if (!data) return [];

		let pairs = Object.entries(data.comparison || {})
			.filter(([_, pair]) => pair && pair.available && pair.available.both)
			.map(([key, pair]) => ({
				key,
				pair,
				profit: getProfitPotential(data.opportunities || [], pair.symbol),
				riskLevel: getRiskLevel(data.opportunities || [], pair.symbol),
			}));

		pairs = pairs.filter(({ pair, profit, riskLevel }) => {
			if (filters.search && !pair.symbol.toLowerCase().includes(filters.search.toLowerCase())) {
				return false;
			}

			if (profit < filters.minProfit || profit > filters.maxProfit) {
				return false;
			}

			if (filters.showOnlyProfitable && profit <= 0.001) {
				return false;
			}

			if (!filters.riskLevels[riskLevel as keyof typeof filters.riskLevels]) {
				return false;
			}

			if (!filters.exchanges.extended && pair.extended.fundingRate === null) return false;
			if (!filters.exchanges.hyperliquid && pair.hyperliquid.fundingRate === null) return false;

			return true;
		});

		pairs.sort(({ pair: a, profit: profitA }, { pair: b, profit: profitB }) => {
			switch (sortBy) {
				case 'profit_desc':
					return profitB - profitA;
				case 'profit_asc':
					return profitA - profitB;
				case 'symbol_asc':
					return a.symbol.localeCompare(b.symbol);
				case 'symbol_desc':
					return b.symbol.localeCompare(a.symbol);
				case 'extended_rate': {
					const aRate = a.extended.fundingRate ?? 0;
					const bRate = b.extended.fundingRate ?? 0;
					return bRate - aRate;
				}
				case 'hyperliquid_rate': {
					const aRate = a.hyperliquid.fundingRate ?? 0;
					const bRate = b.hyperliquid.fundingRate ?? 0;
					return bRate - aRate;
				}
				default:
					return profitB - profitA;
			}
		});

		return pairs;
	}, [data, filters, sortBy]);

	const loadMorePairs = useCallback(() => {
		if (loadingMore || !hasMore) return;

		setLoadingMore(true);

		const nextPage = currentPage + 1;
		const startIndex = nextPage * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		const nextPagePairs = allFilteredAndSortedPairs.slice(startIndex, endIndex);

		if (nextPagePairs.length === 0) {
			setHasMore(false);
		} else {
			setDisplayedPairs((prev) => [...prev, ...nextPagePairs]);
			setCurrentPage(nextPage);
		}

		setLoadingMore(false);
	}, [allFilteredAndSortedPairs, currentPage, itemsPerPage, loadingMore, hasMore]);

	useEffect(() => {
		const firstPagePairs = allFilteredAndSortedPairs.slice(0, itemsPerPage);
		setDisplayedPairs(firstPagePairs);
		setCurrentPage(0);
		setHasMore(allFilteredAndSortedPairs.length > itemsPerPage);
	}, [allFilteredAndSortedPairs, itemsPerPage]);

	useEffect(() => {
		if (observerRef.current) {
			observerRef.current.disconnect();
		}

		observerRef.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !loadingMore) {
					loadMorePairs();
				}
			},
			{ threshold: 0.1 },
		);

		if (loadMoreRef.current) {
			observerRef.current.observe(loadMoreRef.current);
		}

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, [loadMorePairs, hasMore, loadingMore]);

	if (loading && !data) {
		return (
			<div className="flex flex-col gap-6 pb-6">
				<div className={`flex items-start justify-between gap-4 ${fullScreenPaddingTop}`}>
					<div className="flex-1 min-w-0">
						<h1 className="font-tertiary-bold text-[var(--color-text)] text-xl">Trading Pairs</h1>
						<span className="text-xs text-[var(--color-text-tertiary)]">Loading...</span>
					</div>
				</div>

				<div className="flex flex-col gap-3">
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
						<SquircleWrap
							key={i}
							className="bg-[var(--color-bg-secondary)] p-4"
						>
							<div className="animate-pulse">
								<div className="h-4 bg-[var(--color-border)] rounded w-1/4 mb-2"></div>
								<div className="h-3 bg-[var(--color-border)] rounded w-1/2"></div>
							</div>
						</SquircleWrap>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return <ErrorBlock error={error} />;
	}

	if (!data) {
		return null;
	}

	const availablePairs = allFilteredAndSortedPairs.length;

	return (
		<div className="flex flex-col gap-6 pb-6">
			<div className={`flex items-start justify-between gap-4 ${fullScreenPaddingTop}`}>
				<div className="flex-1 min-w-0">
					<h1 className="font-tertiary-bold text-[var(--color-text)] text-xl">Trading Pairs</h1>
					<div className="flex items-center gap-2 mt-1 flex-wrap">
						<span className="text-sm text-[var(--color-text-tertiary)]">
							{displayedPairs.length} of {availablePairs} pairs shown
						</span>
						{refreshing && (
							<div className="flex items-center gap-1">
								<div className="w-3 h-3 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
								<span className="text-xs text-[var(--color-text-tertiary)]">Updating...</span>
							</div>
						)}
					</div>
				</div>
				<div className="text-xs text-[var(--color-text-tertiary)] whitespace-nowrap">
					{new Date().toLocaleTimeString()}
				</div>
			</div>

			<SearchBlock
				filters={filters}
				onFiltersChange={setFilters}
				sortBy={sortBy}
				onSortChange={setSortBy}
			/>

			<div className="flex flex-col gap-3">
				{displayedPairs.length === 0 ? (
					<ActionCard
						icon="🔍"
						title="No pairs found"
						description="Try adjusting your filters to see more results"
						showChevron={false}
						className="bg-[var(--color-bg-secondary)] border-0"
					/>
				) : (
					<>
						{displayedPairs.map(({ key, pair }) => (
							<PairCard
								key={key}
								pair={[key, pair]}
								opportunities={data.opportunities || []}
								onClick={handlePairClick}
							/>
						))}

						{/* Индикатор загрузки */}
						{loadingMore && (
							<div className="flex justify-center py-4">
								<div className="w-6 h-6 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
							</div>
						)}

						{/* Скрытый элемент для Intersection Observer */}
						<div
							ref={loadMoreRef}
							className="h-1"
						/>

						{/* Сообщение о том, что больше нет данных */}
						{!hasMore && displayedPairs.length > 0 && (
							<div className="text-center text-[var(--color-text-tertiary)] text-sm py-4">No more pairs to load</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default AnalyticsPage;
