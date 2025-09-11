import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackButton } from '../hooks/useBackButton';
import { fullScreenPaddingTop } from '../utils/isMobile';
import MarketOverviewChart from '../components/charts/MarketOverviewChart';
import ActivityByTimeChart from '../components/charts/ActivityByTimeChart';
import ProfitabilityByTimeChart from '../components/charts/ProfitabilityByTimeChart';
import SquircleWrap from '../components/SquircleWrap';
import HorizontalScrollSelector from '../components/HorizontalScrollSelector';
import TimeframeSelector from '../components/TimeframeSelector';
import {
	useMarketSummary,
	useMarketOverview,
	useActivityByTime,
	useProfitabilityByTime,
} from '../hooks/useQuery/useCharts';

const DashboardsPage: React.FC = () => {
	const navigate = useNavigate();
	const [timeframe, setTimeframe] = useState<'1h' | '4h' | '24h' | '7d'>('24h');
	const [selectedChart, setSelectedChart] = useState<'overview' | 'activity' | 'profitability'>('overview');

	useBackButton(() => navigate('/'));

	const { data: marketSummary, isLoading: summaryLoading, error: summaryError } = useMarketSummary(timeframe);
	const { data: marketOverviewData, isLoading: overviewLoading, error: overviewError } = useMarketOverview(timeframe);
	const { data: activityData, isLoading: activityLoading, error: activityError } = useActivityByTime(timeframe);
	const {
		data: profitabilityData,
		isLoading: profitabilityLoading,
		error: profitabilityError,
	} = useProfitabilityByTime(timeframe);

	const loading = summaryLoading || overviewLoading || activityLoading || profitabilityLoading;
	const error = summaryError || overviewError || activityError || profitabilityError;

	const formatCurrency = (amount: number): string => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);
	};

	const formatPercentage = (value: number): string => {
		return `${(value * 100000).toFixed(2)}%`;
	};

	const renderSelectedChart = () => {
		switch (selectedChart) {
			case 'overview':
				return (
					<MarketOverviewChart
						data={marketOverviewData || []}
						loading={loading}
						title={`Market Overview (${timeframe})`}
					/>
				);
			case 'activity':
				return (
					<ActivityByTimeChart
						data={activityData || []}
						loading={loading}
						title={`Activity by Time of Day (${timeframe})`}
					/>
				);
			case 'profitability':
				return (
					<ProfitabilityByTimeChart
						data={profitabilityData || []}
						loading={loading}
						title={`Profitability by Time of Day (${timeframe})`}
					/>
				);
			default:
				return (
					<MarketOverviewChart
						data={marketOverviewData || []}
						loading={loading}
						title={`Market Overview (${timeframe})`}
					/>
				);
		}
	};

	return (
		<div className="flex flex-col gap-6 pb-6">
			<div className={`flex items-start justify-between gap-4 ${fullScreenPaddingTop}`}>
				<div className="flex-1 min-w-0">
					<h1 className="font-tertiary-bold text-[var(--color-text)] text-xl">Analytics Dashboard</h1>
					<div className="flex items-center gap-2 mt-1">
						<span className="text-sm text-[var(--color-text-tertiary)]">Real-time arbitrage insights</span>
					</div>
				</div>

				<TimeframeSelector
					value={timeframe}
					onChange={setTimeframe}
				/>
			</div>

			{error && (
				<div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
					<div className="flex items-center gap-3">
						<div className="w-6 h-6 text-orange-500">😔</div>
						<div className="flex-1">
							<p className="text-sm text-orange-700">{error?.message || 'Unknown error'}</p>
						</div>
						<button
							onClick={() => window.location.reload()}
							className="px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg text-sm font-medium transition-colors"
						>
							Try Again
						</button>
					</div>
				</div>
			)}

			{loading ? (
				<>
					<div className="grid grid-cols-2 gap-4">
						<div className="animate-pulse">
							<div className="bg-[var(--color-bg-secondary)] p-4 rounded-lg">
								<div className="h-3 bg-[var(--color-bg-tertiary)] rounded w-20 mb-2"></div>
								<div className="h-6 bg-[var(--color-bg-tertiary)] rounded w-16"></div>
							</div>
						</div>
						<div className="animate-pulse">
							<div className="bg-[var(--color-bg-secondary)] p-4 rounded-lg">
								<div className="h-3 bg-[var(--color-bg-tertiary)] rounded w-20 mb-2"></div>
								<div className="h-6 bg-[var(--color-bg-tertiary)] rounded w-16"></div>
							</div>
						</div>
						<div className="animate-pulse">
							<div className="bg-[var(--color-bg-secondary)] p-4 rounded-lg">
								<div className="h-3 bg-[var(--color-bg-tertiary)] rounded w-20 mb-2"></div>
								<div className="h-6 bg-[var(--color-bg-tertiary)] rounded w-16"></div>
							</div>
						</div>
						<div className="animate-pulse">
							<div className="bg-[var(--color-bg-secondary)] p-4 rounded-lg">
								<div className="h-3 bg-[var(--color-bg-tertiary)] rounded w-20 mb-2"></div>
								<div className="h-6 bg-[var(--color-bg-tertiary)] rounded w-16"></div>
							</div>
						</div>
					</div>

					<div className="animate-pulse">
						<div className="bg-[var(--color-bg-secondary)] p-4 rounded-lg">
							<div className="h-4 bg-[var(--color-bg-tertiary)] rounded w-32 mb-4"></div>
							<div className="h-64 bg-[var(--color-bg-tertiary)] rounded"></div>
						</div>
					</div>
				</>
			) : (
				<>
					{marketSummary && (
						<div className="grid grid-cols-2 gap-4">
							<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
								<div className="text-xs text-[var(--color-text-tertiary)] mb-1">Total Volume</div>
								<div className="font-tertiary-bold text-[var(--color-text)] text-lg">
									{formatCurrency(marketSummary.totalVolume)}
								</div>
							</SquircleWrap>

							<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
								<div className="text-xs text-[var(--color-text-tertiary)] mb-1">Active Pairs</div>
								<div className="font-tertiary-bold text-[var(--color-text)] text-lg">{marketSummary.totalPairs}</div>
							</SquircleWrap>

							<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
								<div className="text-xs text-[var(--color-text-tertiary)] mb-1">Avg Spread</div>
								<div className="font-tertiary-bold text-[var(--color-text)] text-lg">
									{formatPercentage(marketSummary.avgSpread)}
								</div>
							</SquircleWrap>

							<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
								<div className="text-xs text-[var(--color-text-tertiary)] mb-1">Top Opportunity</div>
								<div className="font-tertiary-bold text-[var(--color-text)] text-lg">
									{marketSummary.topOpportunities[0]?.symbol || 'N/A'}
								</div>
							</SquircleWrap>
						</div>
					)}

					<HorizontalScrollSelector
						options={[
							{ key: 'overview', label: 'Overview', icon: '📊' },
							{ key: 'activity', label: 'Activity', icon: '🕐' },
							{ key: 'profitability', label: 'Profitability', icon: '💰' },
						]}
						selectedValue={selectedChart}
						onSelect={(value) => setSelectedChart(value as 'overview' | 'activity' | 'profitability')}
					/>

					<div className="flex flex-col gap-6">{renderSelectedChart()}</div>
				</>
			)}
		</div>
	);
};

export default DashboardsPage;
