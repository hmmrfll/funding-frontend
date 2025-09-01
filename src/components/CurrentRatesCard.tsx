import React from 'react';
import SquircleWrap from './SquircleWrap';

type ExchangeData = {
	fundingRate: number | null;
	markPrice: number | string | null;
	nextFundingTime?: string | null;
	openInterest?: number | string | null;
};

type Props = {
	extended: ExchangeData;
	hyperliquid: ExchangeData;
	loading?: boolean;
};

const CurrentRatesCard: React.FC<Props> = ({ extended, hyperliquid, loading = false }) => {
	const formatRate = (rate: number | null): string => {
		if (rate === null) return 'N/A';
		const percentage = (rate * 100).toFixed(4);
		return `${rate >= 0 ? '+' : ''}${percentage}%`;
	};

	const formatNumber = (value: number | string | null, decimals: number = 2): string => {
		if (value === null) return 'N/A';
		const num = typeof value === 'string' ? parseFloat(value) : value;
		if (isNaN(num)) return 'N/A';
		return num.toFixed(decimals);
	};

	const formatLargeNumber = (value: number | string | null): string => {
		if (value === null) return 'N/A';
		const num = typeof value === 'string' ? parseFloat(value) : value;
		if (isNaN(num)) return 'N/A';
		return num.toLocaleString();
	};

	if (loading) {
		return (
			<div className="grid grid-cols-2 gap-4">
				<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
					<div className="animate-pulse">
						<div className="flex items-center justify-between mb-2">
							<div className="h-4 bg-gray-300 rounded w-16"></div>
						</div>
						<div className="h-8 bg-gray-300 rounded w-24 mb-1"></div>
						<div className="h-3 bg-gray-300 rounded w-20"></div>
						<div className="h-3 bg-gray-300 rounded w-16 mt-1"></div>
					</div>
				</SquircleWrap>

				<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
					<div className="animate-pulse">
						<div className="flex items-center justify-between mb-2">
							<div className="h-4 bg-gray-300 rounded w-20"></div>
						</div>
						<div className="h-8 bg-gray-300 rounded w-24 mb-1"></div>
						<div className="h-3 bg-gray-300 rounded w-20"></div>
						<div className="h-3 bg-gray-300 rounded w-12 mt-1"></div>
					</div>
				</SquircleWrap>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-2 gap-4">
			<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
				<div className="flex flex-col">
					<div className="flex items-center justify-between mb-2">
						<span className="font-tertiary-bold text-[var(--color-text)]">Extended</span>
					</div>
					<div
						className={`text-2xl font-mono mb-1 ${
							(extended.fundingRate || 0) >= 0 ? 'text-green-500' : 'text-red-500'
						}`}
					>
						{formatRate(extended.fundingRate)}
					</div>
					<div className="text-xs text-[var(--color-text-tertiary)]">Price: ${formatNumber(extended.markPrice)}</div>
					<div className="text-xs text-[var(--color-text-tertiary)] mt-1">
						Next: {extended.nextFundingTime ? new Date(extended.nextFundingTime).toLocaleTimeString() : 'N/A'}
					</div>
				</div>
			</SquircleWrap>

			<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
				<div className="flex flex-col">
					<div className="flex items-center justify-between mb-2">
						<span className="font-tertiary-bold text-[var(--color-text)]">Hyperliquid</span>
					</div>
					<div
						className={`text-2xl font-mono mb-1 ${
							(hyperliquid.fundingRate || 0) >= 0 ? 'text-green-500' : 'text-red-500'
						}`}
					>
						{formatRate(hyperliquid.fundingRate)}
					</div>
					<div className="text-xs text-[var(--color-text-tertiary)]">Price: ${formatNumber(hyperliquid.markPrice)}</div>
					<div className="text-xs text-[var(--color-text-tertiary)] mt-1">
						OI: {formatLargeNumber(hyperliquid.openInterest || null)}
					</div>
				</div>
			</SquircleWrap>
		</div>
	);
};

export default CurrentRatesCard;
