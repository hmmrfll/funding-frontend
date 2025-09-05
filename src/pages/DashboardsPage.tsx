import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackButton } from '../hooks/useBackButton';
import { fullScreenPaddingTop } from '../utils/isMobile';
import MarketOverviewChart from '../components/charts/MarketOverviewChart';
import SquircleWrap from '../components/SquircleWrap';
import HorizontalScrollSelector from '../components/HorizontalScrollSelector';
import TimeframeSelector from '../components/TimeframeSelector';
import { getMarketSummary, getMarketOverview, type MarketSummary } from '../service/chartsService';

const DashboardsPage: React.FC = () => {
	const navigate = useNavigate();
	const [marketOverviewData, setMarketOverviewData] = useState<any[]>([]);
	const [marketSummary, setMarketSummary] = useState<MarketSummary | null>(null);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [timeframe, setTimeframe] = useState<'1h' | '4h' | '24h' | '7d'>('24h');
	const [selectedChart, setSelectedChart] = useState<'overview' | 'funding'>('overview');

	useBackButton(() => navigate('/'));

	const fetchData = useCallback(
		async (isRefresh = false) => {
			try {
				if (!isRefresh) {
					setLoading(true);
					setError(null);
				} else {
					setRefreshing(true);
				}

				const [summary, overview] = await Promise.all([
					getMarketSummary(),
					getMarketOverview(timeframe)
				]);

				setMarketSummary(summary);
				setMarketOverviewData(overview);
			} catch (error) {
				console.error('Failed to fetch dashboard data:', error);
				setError('Unable to load data. Please try again.');
			} finally {
				setLoading(false);
				setRefreshing(false);
			}
		},
		[timeframe],
	);

	useEffect(() => {
		fetchData(false);

		const interval = setInterval(() => {
			fetchData(true);
		}, 30000);

		return () => clearInterval(interval);
	}, [fetchData]);

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
						data={marketOverviewData}
						loading={loading}
						title={`Market Overview (${timeframe})`}
					/>
				);
			default:
				return (
					<MarketOverviewChart
						data={marketOverviewData}
						loading={loading}
						title={`Market Overview (${timeframe})`}
					/>
				);
		}
	};

	return (
		<div className="flex flex-col gap-6 pb-6">
			{/* Header */}
			<div className={`flex items-start justify-between gap-4 ${fullScreenPaddingTop}`}>
				<div className="flex-1 min-w-0">
					<h1 className="font-tertiary-bold text-[var(--color-text)] text-xl">Analytics Dashboard</h1>
					<div className="flex items-center gap-2 mt-1">
						<span className="text-sm text-[var(--color-text-tertiary)]">Real-time arbitrage insights</span>
						{refreshing && (
							<div className="flex items-center gap-1">
								<div className="w-3 h-3 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
								<span className="text-xs text-[var(--color-text-tertiary)]">Updating...</span>
							</div>
						)}
					</div>
				</div>

				<TimeframeSelector
					value={timeframe}
					onChange={setTimeframe}
				/>
			</div>

			{/* Error Display */}
			{error && (
				<div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
					<div className="flex items-center gap-3">
						<div className="w-6 h-6 text-orange-500">😔</div>
						<div className="flex-1">
							<p className="text-sm text-orange-700">{error}</p>
						</div>
						<button
							onClick={() => {
								setError(null);
								fetchData(false);
							}}
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
							{ key: 'overview', label: 'Overview', icon: '📊' }
						]}
						selectedValue={selectedChart}
						onSelect={(value) => setSelectedChart(value as 'overview' | 'funding')}
					/>

					<div className="flex flex-col gap-6">{renderSelectedChart()}</div>
				</>
			)}
		</div>
	);
};

export default DashboardsPage;
