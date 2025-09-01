import React from 'react';
import SquircleWrap from './SquircleWrap';

type Props = {
	title?: string;
	period?: string;
	showTimeline?: boolean;
	loading?: boolean;
};

const HistoricalChart: React.FC<Props> = ({
	title = '📈 7d History',
	period = '7d',
	showTimeline = true,
	loading = false,
}) => {
	const getTimelineLabels = () => {
		switch (period) {
			case '7d':
				return ['7d ago', '5d ago', '3d ago', '1d ago', 'Now'];
			case '24h':
				return ['24h ago', '18h ago', '12h ago', '6h ago', 'Now'];
			case '1h':
				return ['1h ago', '45m ago', '30m ago', '15m ago', 'Now'];
			default:
				return ['7d ago', '5d ago', '3d ago', '1d ago', 'Now'];
		}
	};

	if (loading) {
		return (
			<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
				<div className="animate-pulse">
					<div className="flex flex-col gap-3">
						<div className="h-5 bg-gray-300 rounded w-24"></div>
						<div className="h-32 bg-gray-300 rounded-lg"></div>
						<div className="flex justify-between text-xs">
							<div className="h-3 bg-gray-300 rounded w-8"></div>
							<div className="h-3 bg-gray-300 rounded w-8"></div>
							<div className="h-3 bg-gray-300 rounded w-8"></div>
							<div className="h-3 bg-gray-300 rounded w-8"></div>
							<div className="h-3 bg-gray-300 rounded w-8"></div>
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
				<div className="h-32 bg-[var(--color-border)] rounded-lg flex items-center justify-center">
					<span className="text-[var(--color-text-tertiary)]">Chart visualization</span>
				</div>
				{showTimeline && (
					<div className="flex justify-between text-xs text-[var(--color-text-tertiary)]">
						{getTimelineLabels().map((label, index) => (
							<span key={index}>{label}</span>
						))}
					</div>
				)}
			</div>
		</SquircleWrap>
	);
};

export default HistoricalChart;
