import React from 'react';
import SquircleWrap from './SquircleWrap';

type Statistics = {
	avgExtended: number | null;
	avgHyperliquid: number | null;
	maxSpread: number | null;
	minSpread: number | null;
};

type Props = {
	statistics: Statistics;
	title?: string;
	loading?: boolean;
};

const StatisticsCard: React.FC<Props> = ({ statistics, title = '📊 Statistics', loading = false }) => {
	const formatRate = (rate: number | null): string => {
		if (rate === null) return 'N/A';
		const percentage = (rate * 100).toFixed(4);
		return `${rate >= 0 ? '+' : ''}${percentage}%`;
	};

	if (loading) {
		return (
			<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
				<div className="animate-pulse">
					<div className="flex flex-col gap-3">
						<div className="h-5 bg-gray-300 rounded w-20"></div>
						<div className="grid grid-cols-2 gap-4 text-sm">
							<div>
								<div className="h-3 bg-gray-300 rounded w-20 mb-1"></div>
								<div className="h-4 bg-gray-300 rounded w-16"></div>
							</div>
							<div>
								<div className="h-3 bg-gray-300 rounded w-20 mb-1"></div>
								<div className="h-4 bg-gray-300 rounded w-16"></div>
							</div>
							<div>
								<div className="h-3 bg-gray-300 rounded w-16 mb-1"></div>
								<div className="h-4 bg-gray-300 rounded w-16"></div>
							</div>
							<div>
								<div className="h-3 bg-gray-300 rounded w-16 mb-1"></div>
								<div className="h-4 bg-gray-300 rounded w-16"></div>
							</div>
						</div>
					</div>
				</div>
			</SquircleWrap>
		);
	}

	return (
		<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
			<div className="flex flex-col gap-3">
				<h3 className="font-tertiary-bold text-[var(--color-text)]">{title}</h3>
				<div className="grid grid-cols-2 gap-4 text-sm">
					<div>
						<span className="text-[var(--color-text-tertiary)]">Avg Extended:</span>
						<div className="font-mono font-bold">{formatRate(statistics.avgExtended)}</div>
					</div>
					<div>
						<span className="text-[var(--color-text-tertiary)]">Avg Hyperliquid:</span>
						<div className="font-mono font-bold">{formatRate(statistics.avgHyperliquid)}</div>
					</div>
					<div>
						<span className="text-[var(--color-text-tertiary)]">Max Spread:</span>
						<div className="font-mono font-bold text-green-500">{formatRate(statistics.maxSpread)}</div>
					</div>
					<div>
						<span className="text-[var(--color-text-tertiary)]">Min Spread:</span>
						<div className="font-mono font-bold text-red-500">{formatRate(statistics.minSpread)}</div>
					</div>
				</div>
			</div>
		</SquircleWrap>
	);
};

export default StatisticsCard;
