import React from 'react';
import SquircleWrap from './SquircleWrap';
import Skeleton from './Skeleton';

type ExchangeData = {
	fundingRate: number | null;
};

type Props = {
	extended: ExchangeData;
	hyperliquid: ExchangeData;
	profitPotential: number;
	loading?: boolean;
};

const ProfitCalculator: React.FC<Props> = ({ extended, hyperliquid, profitPotential, loading = false }) => {
	const formatRate = (rate: number | null): string => {
		if (rate === null) return 'N/A';
		const percentage = (rate * 100).toFixed(4);
		return `${rate >= 0 ? '+' : ''}${percentage}%`;
	};

	const rateDifference = Math.abs((extended.fundingRate || 0) - (hyperliquid.fundingRate || 0));

	if (loading) {
		return (
			<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
				<div className="flex flex-col gap-3">
					<Skeleton className="h-5 w-32" />
					<div className="grid grid-cols-2 gap-4 text-sm">
						<div>
							<Skeleton className="h-3 w-20 mb-1" />
							<Skeleton className="h-4 w-16" />
						</div>
						<div>
							<Skeleton className="h-3 w-16 mb-1" />
							<Skeleton className="h-4 w-16" />
						</div>
					</div>
					<Skeleton className="h-8 w-full" />
				</div>
			</SquircleWrap>
		);
	}

	return (
		<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
			<div className="flex flex-col gap-3">
				<h3 className="font-tertiary-bold text-[var(--color-text)]">💰 Profit Calculator</h3>
				<div className="grid grid-cols-2 gap-4 text-sm">
					<div>
						<span className="text-[var(--color-text-tertiary)]">Rate Difference:</span>
						<div className="font-mono font-bold text-blue-500">{formatRate(rateDifference)}</div>
					</div>
					<div>
						<span className="text-[var(--color-text-tertiary)]">8h Period:</span>
						<div className="font-mono font-bold text-green-500">~{profitPotential.toFixed(2)}%</div>
					</div>
				</div>
				<div className="text-xs text-[var(--color-text-tertiary)] bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
					⚠️ Rates exclude exchange fees and potential slippage
				</div>
			</div>
		</SquircleWrap>
	);
};

export default ProfitCalculator;
