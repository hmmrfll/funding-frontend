import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useBackButton } from '../hooks/useBackButton';
import { navigateBack, navigateToCreateNotification } from '../utils/navigationUtils';
import CurrentRatesCard from '../components/CurrentRatesCard';
import ProfitCalculator from '../components/ProfitCalculator';
import StatisticsCard from '../components/StatisticsCard';
import ActionCard from '../components/ActionCard';
import ErrorBlock from '../blocs/ErrorBlock';
import ArbitrageOpportunitiesList from '../components/ArbitrageOpportunitiesList';
import Skeleton from '../components/Skeleton';
import { usePairDetails } from '../hooks/useQuery/useArbitrage';

const PairDetailsPage: React.FC = () => {
	const { symbol } = useParams<{ symbol: string }>();
	const navigate = useNavigate();
	const location = useLocation();
	const [showOpportunities] = useState(false);

	useBackButton(() => navigateBack(navigate));

	const pairSymbol = symbol?.replace('-', '/') || '';

	const { data: pairData, isLoading: loading, error, isRefetching: refreshing } = usePairDetails(pairSymbol, 7);

	const handleSetPriceAlert = () => {
		const currentProfitPotential = pairData?.opportunities?.[0]?.absRateDifference
			? pairData.opportunities[0].absRateDifference * 100
			: 0;

		const suggestedThreshold = Math.max(0.01, Math.min(0.1, currentProfitPotential * 0.5));

		navigateToCreateNotification(navigate, location.pathname, pairSymbol, suggestedThreshold);
	};

	if (loading && !pairData) {
		return (
			<div className="flex flex-col gap-6">
				<div className="flex items-center justify-between pt-[75px]">
					<div>
						<Skeleton className="h-8 w-24 mb-2" />
						<div className="flex items-center gap-2">
							<Skeleton className="h-4 w-32" />
							<Skeleton className="h-4 w-16" />
						</div>
					</div>
					<div>
						<Skeleton className="h-4 w-20 mb-1" />
						<Skeleton className="h-6 w-16" />
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

				<StatisticsCard
					statistics={{
						avgExtended: null,
						avgHyperliquid: null,
						maxSpread: null,
						minSpread: null,
					}}
					loading={true}
				/>

				<ActionCard
					icon="🔔"
					title="Set Price Alert"
					description="Get notified when profit exceeds threshold"
					buttonText="Setup"
					showChevron={false}
					onClick={handleSetPriceAlert}
				/>
			</div>
		);
	}

	if (error) {
		return <ErrorBlock error={error instanceof Error ? error.message : 'Failed to fetch pair details'} />;
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
					<div className="font-tertiary-bold text-blue-500 text-xl">~{profitPotential.toFixed(4)}%</div>
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

			<StatisticsCard statistics={pairData.statistics} />

			<ActionCard
				icon="🔔"
				title="Set Price Alert"
				description="Get notified when profit exceeds threshold"
				buttonText="Setup"
				showChevron={false}
				onClick={handleSetPriceAlert}
			/>

			{showOpportunities && (
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h2 className="font-tertiary-bold text-[var(--color-text)] text-lg">Arbitrage Opportunities</h2>
						<div className="text-sm text-[var(--color-text-tertiary)]">Sorted by profit potential</div>
					</div>
					<ArbitrageOpportunitiesList
						minProfit={0.0001}
						limit={10}
					/>
				</div>
			)}
		</div>
	);
};

export default PairDetailsPage;
