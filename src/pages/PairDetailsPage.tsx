import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBackButton } from '../hooks/useBackButton';
import { navigateBack } from '../utils/navigationUtils';
import SquircleWrap from '../components/SquircleWrap';
import CurrentRatesCard from '../components/CurrentRatesCard';
import ProfitCalculator from '../components/ProfitCalculator';
import HistoricalChart from '../components/HistoricalChart';
import StatisticsCard from '../components/StatisticsCard';
import ActionCard from '../components/ActionCard';
import ErrorBlock from '../blocs/ErrorBlock';
import { getPairDetails } from '../service/arbitrageService';
import type { PairDetails } from '../service/arbitrageService';

const PairDetailsPage: React.FC = () => {
	const { symbol } = useParams<{ symbol: string }>();
	const navigate = useNavigate();
	const [pairData, setPairData] = useState<PairDetails | null>(null);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useBackButton(() => navigateBack(navigate));

	const pairSymbol = symbol?.replace('-', '/') || '';

	useEffect(() => {
		const fetchData = async (isInitialLoad = true) => {
			if (!pairSymbol) return;

			try {
				if (isInitialLoad) {
					setLoading(true);
				} else {
					setRefreshing(true);
				}

				const result = await getPairDetails(pairSymbol, 7);
				setPairData(result);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to fetch pair details');
			} finally {
				setLoading(false);
				setRefreshing(false);
			}
		};

		fetchData(true);

		const interval = setInterval(() => fetchData(false), 30000);

		return () => clearInterval(interval);
	}, [pairSymbol]);

	if (loading && !pairData) {
		return (
			<div className="flex flex-col gap-6">
				<div className="flex items-center justify-between pt-[75px]">
					<div className="animate-pulse">
						<div className="h-8 bg-gray-300 rounded w-24 mb-2"></div>
						<div className="h-4 bg-gray-300 rounded w-48"></div>
					</div>
					<div className="animate-pulse">
						<div className="h-4 bg-gray-300 rounded w-20 mb-1"></div>
						<div className="h-6 bg-gray-300 rounded w-16"></div>
					</div>
				</div>

				<CurrentRatesCard
					extended={{ fundingRate: null, markPrice: null }}
					hyperliquid={{ fundingRate: null, markPrice: null }}
					loading={true}
				/>

				<ProfitCalculator
					extended={{ fundingRate: null }}
					hyperliquid={{ fundingRate: null }}
					profitPotential={0}
					loading={true}
				/>

				<HistoricalChart loading={true} />

				<StatisticsCard
					statistics={{
						avgExtended: null,
						avgHyperliquid: null,
						maxSpread: null,
						minSpread: null,
					}}
					loading={true}
				/>
			</div>
		);
	}

	if (error) {
		return <ErrorBlock error={error} />;
	}

	if (!pairData) {
		return null;
	}

	const current = pairData.current;
	const profitPotential =
		pairData.opportunities && pairData.opportunities[0]?.absRateDifference
			? pairData.opportunities[0].absRateDifference * 100
			: 0;

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between pt-[75px]">
				<div>
					<h1 className="font-tertiary-bold text-[var(--color-text)]">{pairSymbol}</h1>
					<div className="flex items-center gap-2 mt-1">
						<span className="text-sm text-[var(--color-text-tertiary)]">Funding Rate Arbitrage</span>
						{refreshing && (
							<div className="flex items-center gap-1">
								<div className="w-3 h-3 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
								<span className="text-xs text-[var(--color-text-tertiary)]">Updating...</span>
							</div>
						)}
					</div>
				</div>
				<div className="text-right">
					<div className="text-xs text-[var(--color-text-tertiary)]">Potential Profit</div>
					<div className="font-tertiary-bold text-blue-500 text-xl">~{profitPotential.toFixed(2)}%</div>
				</div>
			</div>

			<CurrentRatesCard
				extended={current.extended}
				hyperliquid={current.hyperliquid}
			/>

			<ProfitCalculator
				extended={current.extended}
				hyperliquid={current.hyperliquid}
				profitPotential={profitPotential}
			/>

			<HistoricalChart />

			<StatisticsCard statistics={pairData.statistics} />

			<ActionCard
				icon="🔔"
				title="Set Price Alert"
				description="Get notified when profit exceeds threshold"
				buttonText="Setup"
				showChevron={false}
			/>
		</div>
	);
};

export default PairDetailsPage;
