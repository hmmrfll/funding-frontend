import React from 'react';
import SquircleWrap from './SquircleWrap';
import ChevronRight from '../assets/ChevronRight.tsx';
import type { ArbitrageOpportunity } from '../service/arbitrageService';
import { getProfitPotential } from '../utils/arbitrageUtils';

type PairData = {
	symbol: string;
	extended: {
		fundingRate: number | null;
	};
	hyperliquid: {
		fundingRate: number | null;
	};
};

type Props = {
	pair: [string, PairData];
	opportunities: ArbitrageOpportunity[];
	onClick: (symbol: string) => void;
	loading?: boolean;
};

const PairCard: React.FC<Props> = ({ pair, opportunities, onClick, loading = false }) => {
	const [symbol, pairData] = pair;

	const safeFormatRate = (rate: number | null): string => {
		if (rate === null) return 'N/A';
		const percentage = (rate * 100).toFixed(4);
		return `${rate >= 0 ? '+' : ''}${percentage}%`;
	};

	const getDirectionIcon = (rate: number | null) => {
		if (rate === null) return '➖';
		return rate >= 0 ? '↗️' : '↘️';
	};

	const profitPotential = getProfitPotential(opportunities, symbol);

	if (loading) {
		return (
			<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
				<div className="animate-pulse">
					<div className="flex items-center justify-between">
						<div className="flex-1">
							<div className="flex items-center gap-2 mb-2">
								<div className="h-4 bg-gray-300 rounded w-16"></div>
							</div>
							<div className="flex items-center gap-4 text-sm">
								<div className="flex flex-col">
									<div className="h-3 bg-gray-300 rounded w-12 mb-1"></div>
									<div className="flex items-center gap-1">
										<div className="h-4 bg-gray-300 rounded w-16"></div>
									</div>
								</div>
								<div className="flex flex-col">
									<div className="h-3 bg-gray-300 rounded w-16 mb-1"></div>
									<div className="flex items-center gap-1">
										<div className="h-4 bg-gray-300 rounded w-16"></div>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col items-end gap-2">
							<div className="flex flex-col items-end">
								<div className="h-3 bg-gray-300 rounded w-12 mb-1"></div>
								<div className="h-4 bg-gray-300 rounded w-16"></div>
							</div>
							<div className="w-4 h-4 bg-gray-300 rounded"></div>
						</div>
					</div>
				</div>
			</SquircleWrap>
		);
	}

	return (
		<SquircleWrap
			className="bg-[var(--color-bg-secondary)] p-4 cursor-pointer hover:bg-[var(--color-border)] transition-colors"
			onClick={() => onClick(symbol)}
		>
			<div className="flex items-center justify-between">
				<div className="flex-1">
					<div className="flex items-center gap-2 mb-2">
						<span className="font-tertiary-bold text-[var(--color-text)]">{symbol}</span>
					</div>

					<div className="flex items-center gap-4 text-sm">
						<div className="flex flex-col">
							<span className="text-[var(--color-text-tertiary)] text-xs">Extended</span>
							<div className="flex items-center gap-1">
								<span
									className={`font-mono ${
										(pairData.extended.fundingRate || 0) >= 0 ? 'text-green-500' : 'text-red-500'
									}`}
								>
									{safeFormatRate(pairData.extended.fundingRate)}
								</span>
								<span>{getDirectionIcon(pairData.extended.fundingRate)}</span>
							</div>
						</div>

						<div className="flex flex-col">
							<span className="text-[var(--color-text-tertiary)] text-xs">Hyperliquid</span>
							<div className="flex items-center gap-1">
								<span
									className={`font-mono ${
										(pairData.hyperliquid.fundingRate || 0) >= 0 ? 'text-green-500' : 'text-red-500'
									}`}
								>
									{safeFormatRate(pairData.hyperliquid.fundingRate)}
								</span>
								<span>{getDirectionIcon(pairData.hyperliquid.fundingRate)}</span>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col items-end gap-2">
					<div className="flex flex-col items-end">
						<span className="text-xs text-[var(--color-text-tertiary)]">Potential</span>
						<span className="font-tertiary-bold text-blue-500">~{profitPotential.toFixed(2)}%</span>
					</div>
					<ChevronRight />
				</div>
			</div>
		</SquircleWrap>
	);
};

export default PairCard;
