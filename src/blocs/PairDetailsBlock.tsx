// src/blocs/PairDetailsBlock.tsx
import React, { useEffect, useState } from 'react';
import SquircleWrap from '../components/SquircleWrap';
import ChevronRight from '../assets/ChevronRight.tsx';
import { useNavigate } from 'react-router-dom';
import { getFundingRatesComparison } from '../service/arbitrageService';
import type { FundingRatesComparison, ArbitrageOpportunity } from '../service/arbitrageService';

const PairDetailsBlock: React.FC = () => {
	const navigate = useNavigate();
	const [data, setData] = useState<FundingRatesComparison | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const result = await getFundingRatesComparison();
				setData(result);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to fetch data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
		const interval = setInterval(fetchData, 30000); // Обновляем каждые 30 секунд

		return () => clearInterval(interval);
	}, []);

	const handlePairClick = (symbol: string) => {
		navigate(`/pair/${symbol.replace('/', '-')}`);
	};

	const formatRate = (rate: number | null): string => {
		if (rate === null) return 'N/A';
		const percentage = (rate * 100).toFixed(4);
		return `${rate >= 0 ? '+' : ''}${percentage}%`;
	};

	const safeFormatRate = (rate: number | null): string => {
		if (rate === null || isNaN(rate)) return 'N/A';
		const percentage = (rate * 100).toFixed(4);
		return `${rate >= 0 ? '+' : ''}${percentage}%`;
	};

	const getRiskColor = (risk: string) => {
		switch (risk) {
			case 'low':
				return 'text-green-500';
			case 'medium':
				return 'text-yellow-500';
			case 'high':
				return 'text-red-500';
			default:
				return 'text-gray-500';
		}
	};

	const getDirectionIcon = (rate: number | null) => {
		if (rate === null) return '➖';
		return rate >= 0 ? '↗️' : '↘️';
	};

	const getProfitPotential = (opportunities: ArbitrageOpportunity[], symbol: string): number => {
		const opportunity = opportunities.find((opp) => opp.symbol === symbol);
		return opportunity ? opportunity.absRateDifference * 100 : 0;
	};

	const getRiskLevel = (opportunities: ArbitrageOpportunity[], symbol: string): 'low' | 'medium' | 'high' => {
		const opportunity = opportunities.find((opp) => opp.symbol === symbol);
		return opportunity ? opportunity.riskLevel : 'low';
	};

	if (loading) {
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

	// Получаем топ-3 пары с наибольшим потенциалом прибыли
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
				<span className="text-xs text-[var(--color-text-tertiary)]">Real-time</span>
			</div>

			<div className="flex flex-col gap-3">
				{topPairs.map(([symbol, pair]) => {
					const profitPotential = getProfitPotential(data.opportunities, symbol);
					const riskLevel = getRiskLevel(data.opportunities, symbol);

					return (
						<SquircleWrap
							key={symbol}
							className="bg-[var(--color-bg-secondary)] p-4 cursor-pointer hover:bg-[var(--color-border)] transition-colors"
							onClick={() => handlePairClick(symbol)}
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
														(pair.extended.fundingRate || 0) >= 0 ? 'text-green-500' : 'text-red-500'
													}`}
												>
													{safeFormatRate(pair.extended.fundingRate)}
												</span>
												<span>{getDirectionIcon(pair.extended.fundingRate)}</span>
											</div>
										</div>

										<div className="flex flex-col">
											<span className="text-[var(--color-text-tertiary)] text-xs">Hyperliquid</span>
											<div className="flex items-center gap-1">
												<span
													className={`font-mono ${
														(pair.hyperliquid.fundingRate || 0) >= 0 ? 'text-green-500' : 'text-red-500'
													}`}
												>
													{safeFormatRate(pair.hyperliquid.fundingRate)}
												</span>
												<span>{getDirectionIcon(pair.hyperliquid.fundingRate)}</span>
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
				})}
			</div>

			<SquircleWrap
				className="bg-[var(--color-primary)] bg-opacity-10 border border-[var(--color-primary)] border-opacity-30 p-3 cursor-pointer"
				onClick={() => navigate('/analytics')}
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<span className="text-2xl">📊</span>
						<div>
							<span className="font-tertiary-bold text-[var(--color-text)]">View All Pairs</span>
							<div className="text-xs text-[var(--color-text-tertiary)]">Analytics & Historical Data</div>
						</div>
					</div>
					<ChevronRight />
				</div>
			</SquircleWrap>
		</div>
	);
};

export default PairDetailsBlock;
