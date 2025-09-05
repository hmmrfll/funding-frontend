import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getArbitrageOpportunities, type ArbitrageOpportunity, type PaginationInfo } from '../service/arbitrageService';
import SquircleWrap from './SquircleWrap';

interface ArbitrageOpportunitiesListProps {
	minProfit?: number;
	limit?: number;
}

const ArbitrageOpportunitiesList: React.FC<ArbitrageOpportunitiesListProps> = ({ minProfit = 0.0001, limit = 10 }) => {
	const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>([]);
	const [pagination, setPagination] = useState<PaginationInfo | null>(null);
	const [loading, setLoading] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const loadMoreRef = useRef<HTMLDivElement | null>(null);

	const loadOpportunities = useCallback(
		async (offset: number = 0, isLoadMore: boolean = false) => {
			try {
				if (isLoadMore) {
					setLoadingMore(true);
				} else {
					setLoading(true);
					setError(null);
				}

				const response = await getArbitrageOpportunities(offset, limit, minProfit);

				if (isLoadMore) {
					setOpportunities((prev) => [...prev, ...response.opportunities]);
				} else {
					setOpportunities(response.opportunities);
				}

				setPagination(response.pagination);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to load opportunities');
			} finally {
				setLoading(false);
				setLoadingMore(false);
			}
		},
		[limit, minProfit],
	);

	const loadMore = useCallback(() => {
		if (pagination?.hasMore && !loadingMore && !loading) {
			loadOpportunities(pagination.nextOffset || 0, true);
		}
	}, [pagination, loadingMore, loading, loadOpportunities]);

	// Настройка Intersection Observer для бесконечной прокрутки
	useEffect(() => {
		if (observerRef.current) {
			observerRef.current.disconnect();
		}

		observerRef.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && pagination?.hasMore && !loadingMore) {
					loadMore();
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
	}, [loadMore, pagination, loadingMore]);

	// Загрузка начальных данных
	useEffect(() => {
		loadOpportunities(0, false);
	}, [loadOpportunities]);

	const formatPercentage = (value: number): string => {
		return `${(value * 100).toFixed(4)}%`;
	};

	const formatCurrency = (value: number): string => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(value);
	};

	const getRiskColor = (riskLevel: string): string => {
		switch (riskLevel) {
			case 'low':
				return 'text-green-500';
			case 'medium':
				return 'text-yellow-500';
			case 'high':
				return 'text-red-500';
			default:
				return 'text-gray-500';
		}
	};

	if (loading) {
		return (
			<div className="space-y-4">
				{Array.from({ length: 3 }).map((_, index) => (
					<div
						key={index}
						className="animate-pulse"
					>
						<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
							<div className="h-4 bg-[var(--color-bg-tertiary)] rounded w-1/4 mb-2"></div>
							<div className="h-6 bg-[var(--color-bg-tertiary)] rounded w-1/2 mb-2"></div>
							<div className="h-3 bg-[var(--color-bg-tertiary)] rounded w-3/4"></div>
						</SquircleWrap>
					</div>
				))}
			</div>
		);
	}

	if (error) {
		return (
			<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
				<div className="text-center text-[var(--color-text-tertiary)]">
					<p>Failed to load opportunities: {error}</p>
					<button
						onClick={() => loadOpportunities(0, false)}
						className="mt-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm"
					>
						Try Again
					</button>
				</div>
			</SquircleWrap>
		);
	}

	return (
		<div className="space-y-4">
			{opportunities.map((opportunity, index) => (
				<SquircleWrap
					key={`${opportunity.symbol}-${index}`}
					className="bg-[var(--color-bg-secondary)] p-4"
				>
					<div className="flex items-center justify-between mb-3">
						<div>
							<h3 className="font-tertiary-bold text-[var(--color-text)] text-lg">{opportunity.symbol}</h3>
							<div className="flex items-center gap-2 mt-1">
								<span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(opportunity.riskLevel)} bg-opacity-20`}>
									{opportunity.riskLevel.toUpperCase()}
								</span>
								<span className="text-xs text-[var(--color-text-tertiary)]">{opportunity.strategy}</span>
							</div>
						</div>
						<div className="text-right">
							<div className="text-lg font-tertiary-bold text-green-500">
								{formatPercentage(opportunity.absRateDifference)}
							</div>
							<div className="text-xs text-[var(--color-text-tertiary)]">Rate Difference</div>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4 mb-3">
						<div>
							<div className="text-xs text-[var(--color-text-tertiary)] mb-1">Extended Rate</div>
							<div className="font-medium text-[var(--color-text)]">{formatPercentage(opportunity.extendedRate)}</div>
						</div>
						<div>
							<div className="text-xs text-[var(--color-text-tertiary)] mb-1">Hyperliquid Rate</div>
							<div className="font-medium text-[var(--color-text)]">
								{formatPercentage(opportunity.hyperliquidRate)}
							</div>
						</div>
					</div>

					<div className="grid grid-cols-3 gap-4 text-center">
						<div>
							<div className="text-xs text-[var(--color-text-tertiary)] mb-1">Hourly</div>
							<div className="text-sm font-medium text-[var(--color-text)]">
								{formatPercentage(opportunity.potentialProfit.hourly)}
							</div>
						</div>
						<div>
							<div className="text-xs text-[var(--color-text-tertiary)] mb-1">Daily</div>
							<div className="text-sm font-medium text-[var(--color-text)]">
								{formatPercentage(opportunity.potentialProfit.daily)}
							</div>
						</div>
						<div>
							<div className="text-xs text-[var(--color-text-tertiary)] mb-1">Annualized</div>
							<div className="text-sm font-medium text-[var(--color-text)]">
								{formatPercentage(opportunity.potentialProfit.annualized)}
							</div>
						</div>
					</div>
				</SquircleWrap>
			))}

			{/* Элемент для отслеживания скролла */}
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

			{!pagination?.hasMore && opportunities.length > 0 && (
				<div className="text-center text-[var(--color-text-tertiary)] text-sm py-4">No more opportunities to load</div>
			)}

			{opportunities.length === 0 && !loading && (
				<SquircleWrap className="bg-[var(--color-bg-secondary)] p-8">
					<div className="text-center text-[var(--color-text-tertiary)]">
						<p className="text-lg mb-2">No opportunities found</p>
						<p className="text-sm">Try adjusting the minimum profit threshold</p>
					</div>
				</SquircleWrap>
			)}
		</div>
	);
};

export default ArbitrageOpportunitiesList;
