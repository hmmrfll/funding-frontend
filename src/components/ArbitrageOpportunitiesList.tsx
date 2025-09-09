import React from 'react';
import { useArbitrageOpportunities } from '../hooks/useQuery/useArbitrage';
import SquircleWrap from './SquircleWrap';
import LoadingTrigger from './LoadingTrigger';

interface ArbitrageOpportunitiesListProps {
	minProfit?: number;
	limit?: number;
}

const ArbitrageOpportunitiesList: React.FC<ArbitrageOpportunitiesListProps> = ({ minProfit = 0.0001 }) => {
	const {
		opportunities: allOpportunities,
		isLoading: loading,
		fetchNextPage,
		hasNextPage,
	} = useArbitrageOpportunities(minProfit);

	const formatProfit = (profit: number) => {
		return `${(profit * 100).toFixed(4)}%`;
	};

	const getRiskColor = (riskLevel: string) => {
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

	return (
		<>
			{allOpportunities.map((opportunity, index) => (
				<SquircleWrap
					key={`${opportunity.symbol}-${index}`}
					className="bg-[var(--color-bg-secondary)] p-4"
				>
					<div className="flex justify-between items-start mb-2">
						<div className="font-secondary-bold text-[var(--color-text)] text-lg">{opportunity.symbol}</div>
						<div className="text-right">
							<div className="font-secondary-bold text-green-500 text-lg">
								{formatProfit(opportunity.potentialProfit.annualized)}
							</div>
							<div className="text-xs text-[var(--color-text-tertiary)]">Annualized</div>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4 mb-3">
						<div>
							<div className="text-xs text-[var(--color-text-tertiary)] mb-1">Extended Rate</div>
							<div className="font-medium text-[var(--color-text)]">{formatProfit(opportunity.extendedRate)}</div>
						</div>
						<div>
							<div className="text-xs text-[var(--color-text-tertiary)] mb-1">Hyperliquid Rate</div>
							<div className="font-medium text-[var(--color-text)]">{formatProfit(opportunity.hyperliquidRate)}</div>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4 mb-3">
						<div>
							<div className="text-xs text-[var(--color-text-tertiary)] mb-1">Rate Difference</div>
							<div className="font-medium text-[var(--color-text)]">{formatProfit(opportunity.rateDifference)}</div>
						</div>
						<div>
							<div className="text-xs text-[var(--color-text-tertiary)] mb-1">Risk Level</div>
							<div className={`font-medium ${getRiskColor(opportunity.riskLevel)}`}>
								{opportunity.riskLevel.toUpperCase()}
							</div>
						</div>
					</div>

					<div className="grid grid-cols-3 gap-2 text-center">
						<div>
							<div className="text-xs text-[var(--color-text-tertiary)] mb-1">Hourly</div>
							<div className="text-sm font-medium text-[var(--color-text)]">
								{formatProfit(opportunity.potentialProfit.hourly)}
							</div>
						</div>
						<div>
							<div className="text-xs text-[var(--color-text-tertiary)] mb-1">Daily</div>
							<div className="text-sm font-medium text-[var(--color-text)]">
								{formatProfit(opportunity.potentialProfit.daily)}
							</div>
						</div>
						<div>
							<div className="text-xs text-[var(--color-text-tertiary)] mb-1">Strategy</div>
							<div className="text-sm font-medium text-[var(--color-text)]">{opportunity.strategy}</div>
						</div>
					</div>

					<div className="mt-3 pt-3 border-t border-[var(--color-border)]">
						<div className="text-xs text-[var(--color-text-tertiary)]">
							Created: {new Date(opportunity.created_at).toLocaleString()}
						</div>
					</div>
				</SquircleWrap>
			))}
			{loading &&
				Array.from({ length: 3 }).map((_, i) => (
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
			{!loading && hasNextPage && <LoadingTrigger callback={() => fetchNextPage()} />}
		</>
	);
};

export default ArbitrageOpportunitiesList;
