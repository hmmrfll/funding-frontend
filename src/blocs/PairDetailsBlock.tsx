import React, { useEffect, useState } from 'react';
import SquircleWrap from '../components/SquircleWrap';
import PairCard from '../components/PairCard';
import ActionCard from '../components/ActionCard';
import { useNavigate } from 'react-router-dom';
import { getFundingRatesComparison } from '../service/arbitrageService';
import type { FundingRatesComparison, ArbitrageOpportunity } from '../service/arbitrageService';

const PairDetailsBlock: React.FC = () => {
	const navigate = useNavigate();
	const [data, setData] = useState<FundingRatesComparison | null>(null);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async (isInitialLoad = true) => {
			try {
				if (isInitialLoad) {
					setLoading(true);
				} else {
					setRefreshing(true);
				}

				const result = await getFundingRatesComparison();
				setData(result);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to fetch data');
			} finally {
				setLoading(false);
				setRefreshing(false);
			}
		};

		fetchData(true);

		const interval = setInterval(() => fetchData(false), 30000);

		return () => clearInterval(interval);
	}, []);

	const handlePairClick = (symbol: string) => {
		navigate(`/pair/${symbol.replace('/', '-')}`);
	};

	if (loading && !data) {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex justify-between items-center">
					<h2 className="font-secondary-bold text-[var(--color-text)]">Funding Rates Monitor</h2>
					<span className="text-xs text-[var(--color-text-tertiary)]">Loading...</span>
				</div>
				<div className="flex flex-col gap-3">
					{[1, 2, 3].map((i) => (
						<SquircleWrap
							key={i}
							className="bg-[var(--color-bg-secondary)] p-4"
						>
							<div className="animate-pulse">
								<div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
								<div className="h-3 bg-gray-300 rounded w-1/2"></div>
							</div>
						</SquircleWrap>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex justify-between items-center">
					<h2 className="font-secondary-bold text-[var(--color-text)]">Funding Rates Monitor</h2>
					<span className="text-xs text-red-500">Error</span>
				</div>
				<div className="text-red-500 text-center py-4">{error}</div>
			</div>
		);
	}

	if (!data) {
		return null;
	}

	const getProfitPotential = (opportunities: ArbitrageOpportunity[], symbol: string): number => {
		const opportunity = opportunities.find((opp) => opp.symbol === symbol);
		return opportunity ? opportunity.absRateDifference * 100 : 0;
	};

	const topPairs = Object.entries(data.comparison || {})
		.filter(([_, pair]) => pair && pair.available && pair.available.both)
		.sort(([_, a], [__, b]) => {
			const aProfit = getProfitPotential(data.opportunities || [], a.symbol);
			const bProfit = getProfitPotential(data.opportunities || [], b.symbol);
			return bProfit - aProfit;
		})
		.slice(0, 3);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between items-center">
				<h2 className="font-secondary-bold text-[var(--color-text)]">Funding Rates Monitor</h2>
				<div className="flex items-center gap-2">
					{refreshing && (
						<div className="w-3 h-3 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
					)}
					<span className="text-xs text-[var(--color-text-tertiary)]">{refreshing ? 'Updating...' : 'Real-time'}</span>
				</div>
			</div>

			<div className="flex flex-col gap-3">
				{topPairs.map((pair) => (
					<PairCard
						key={pair[0]}
						pair={pair}
						opportunities={data.opportunities || []}
						onClick={handlePairClick}
					/>
				))}
			</div>

			<ActionCard
				icon="📊"
				title="View All Pairs"
				description="Analytics & Historical Data"
				onClick={() => navigate('/analytics')}
			/>
		</div>
	);
};

export default PairDetailsBlock;
