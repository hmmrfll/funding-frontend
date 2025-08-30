// src/pages/PairDetailsPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBackButton } from '../hooks/useBackButton';
import SquircleWrap from '../components/SquircleWrap';
import { getPairDetails } from '../service/arbitrageService';
import type { PairDetails } from '../service/arbitrageService';

const PairDetailsPage: React.FC = () => {
	const { symbol } = useParams<{ symbol: string }>();
	const navigate = useNavigate();
	const [pairData, setPairData] = useState<PairDetails | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useBackButton(() => navigate('/'));

	const pairSymbol = symbol?.replace('-', '/') || '';

	useEffect(() => {
		const fetchData = async () => {
			if (!pairSymbol) return;

			try {
				setLoading(true);
				const result = await getPairDetails(pairSymbol, 7);
				setPairData(result);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to fetch pair details');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
		const interval = setInterval(fetchData, 30000); // Обновляем каждые 30 секунд

		return () => clearInterval(interval);
	}, [pairSymbol]);

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

	if (loading) {
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
				<div className="grid grid-cols-2 gap-4">
					{[1, 2].map((i) => (
						<SquircleWrap
							key={i}
							className="bg-[var(--color-bg-secondary)] p-4"
						>
							<div className="animate-pulse">
								<div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
								<div className="h-6 bg-gray-300 rounded w-24 mb-1"></div>
								<div className="h-3 bg-gray-300 rounded w-16"></div>
							</div>
						</SquircleWrap>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col gap-6">
				<div className="pt-[75px]">
					<h1 className="font-tertiary-bold text-[var(--color-text)] mb-4">Error</h1>
					<div className="text-red-500">{error}</div>
					<button
						onClick={() => navigate('/')}
						className="mt-4 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg"
					>
						Go Back
					</button>
				</div>
			</div>
		);
	}

	if (!pairData) {
		return null;
	}

	const current = pairData.current;
	const profitPotential =
		pairData.opportunities && pairData.opportunities[0]?.absRateDifference
			? pairData.opportunities[0].absRateDifference * 100
			: 0;
	const riskLevel = (pairData.opportunities && pairData.opportunities[0]?.riskLevel) || 'low';

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<div className="flex items-center justify-between pt-[75px]">
				<div>
					<h1 className="font-tertiary-bold text-[var(--color-text)]">{pairSymbol}</h1>
					<div className="flex items-center gap-2 mt-1">
						<span className="text-sm text-[var(--color-text-tertiary)]">Funding Rate Arbitrage</span>
						<span className={`text-xs px-2 py-1 rounded-full bg-opacity-20 ${getRiskColor(riskLevel)} bg-current`}>
							{riskLevel} risk
						</span>
					</div>
				</div>
				<div className="text-right">
					<div className="text-xs text-[var(--color-text-tertiary)]">Potential Profit</div>
					<div className="font-tertiary-bold text-blue-500 text-xl">~{profitPotential.toFixed(2)}%</div>
				</div>
			</div>

			{/* Current Rates */}
			<div className="grid grid-cols-2 gap-4">
				<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
					<div className="flex flex-col">
						<div className="flex items-center justify-between mb-2">
							<span className="font-tertiary-bold text-[var(--color-text)]">Extended</span>
							<span className="text-xs text-[var(--color-text-tertiary)]">8h period</span>
						</div>
						<div
							className={`text-2xl font-mono mb-1 ${
								(current.extended.fundingRate || 0) >= 0 ? 'text-green-500' : 'text-red-500'
							}`}
						>
							{formatRate(current.extended.fundingRate)}
						</div>
						<div className="text-xs text-[var(--color-text-tertiary)]">
							Price: ${formatNumber(current.extended.markPrice)}
						</div>
						<div className="text-xs text-[var(--color-text-tertiary)] mt-1">
							Next:{' '}
							{current.extended.nextFundingTime
								? new Date(current.extended.nextFundingTime).toLocaleTimeString()
								: 'N/A'}
						</div>
					</div>
				</SquircleWrap>

				<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
					<div className="flex flex-col">
						<div className="flex items-center justify-between mb-2">
							<span className="font-tertiary-bold text-[var(--color-text)]">Hyperliquid</span>
							<span className="text-xs text-[var(--color-text-tertiary)]">1h period</span>
						</div>
						<div
							className={`text-2xl font-mono mb-1 ${
								(current.hyperliquid.fundingRate || 0) >= 0 ? 'text-green-500' : 'text-red-500'
							}`}
						>
							{formatRate(current.hyperliquid.fundingRate)}
						</div>
						<div className="text-xs text-[var(--color-text-tertiary)]">
							Price: ${formatNumber(current.hyperliquid.markPrice)}
						</div>
						<div className="text-xs text-[var(--color-text-tertiary)] mt-1">
							OI: {formatLargeNumber(current.hyperliquid.openInterest)}
						</div>
					</div>
				</SquircleWrap>
			</div>

			{/* Profit Calculator */}
			<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
				<div className="flex flex-col gap-3">
					<h3 className="font-tertiary-bold text-[var(--color-text)]">💰 Profit Calculator</h3>
					<div className="grid grid-cols-2 gap-4 text-sm">
						<div>
							<span className="text-[var(--color-text-tertiary)]">Rate Difference:</span>
							<div className="font-mono font-bold text-blue-500">
								{formatRate(Math.abs((current.extended.fundingRate || 0) - (current.hyperliquid.fundingRate || 0)))}
							</div>
						</div>
						<div>
							<span className="text-[var(--color-text-tertiary)]">8h Period:</span>
							<div className="font-mono font-bold text-green-500">~{profitPotential.toFixed(2)}%</div>
						</div>
					</div>
					<div className="text-xs text-[var(--color-text-tertiary)] bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
						⚠️ Rates exclude exchange fees and potential slippage
					</div>
				</div>
			</SquircleWrap>

			{/* Historical Chart Placeholder */}
			<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
				<div className="flex flex-col gap-3">
					<h3 className="font-tertiary-bold text-[var(--color-text)]">📈 7d History</h3>
					<div className="h-32 bg-[var(--color-border)] rounded-lg flex items-center justify-center">
						<span className="text-[var(--color-text-tertiary)]">Chart visualization</span>
					</div>
					<div className="flex justify-between text-xs text-[var(--color-text-tertiary)]">
						<span>7d ago</span>
						<span>5d ago</span>
						<span>3d ago</span>
						<span>1d ago</span>
						<span>Now</span>
					</div>
				</div>
			</SquircleWrap>

			{/* Statistics */}
			<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
				<div className="flex flex-col gap-3">
					<h3 className="font-tertiary-bold text-[var(--color-text)]">📊 Statistics</h3>
					<div className="grid grid-cols-2 gap-4 text-sm">
						<div>
							<span className="text-[var(--color-text-tertiary)]">Avg Extended:</span>
							<div className="font-mono font-bold">{formatRate(pairData.statistics.avgExtended)}</div>
						</div>
						<div>
							<span className="text-[var(--color-text-tertiary)]">Avg Hyperliquid:</span>
							<div className="font-mono font-bold">{formatRate(pairData.statistics.avgHyperliquid)}</div>
						</div>
						<div>
							<span className="text-[var(--color-text-tertiary)]">Max Spread:</span>
							<div className="font-mono font-bold text-green-500">{formatRate(pairData.statistics.maxSpread)}</div>
						</div>
						<div>
							<span className="text-[var(--color-text-tertiary)]">Min Spread:</span>
							<div className="font-mono font-bold text-red-500">{formatRate(pairData.statistics.minSpread)}</div>
						</div>
					</div>
				</div>
			</SquircleWrap>

			{/* Alert Settings */}
			<SquircleWrap className="bg-[var(--color-primary)] bg-opacity-10 border border-[var(--color-primary)] border-opacity-30 p-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<span className="text-2xl">🔔</span>
						<div>
							<span className="font-tertiary-bold text-[var(--color-text)]">Set Price Alert</span>
							<div className="text-xs text-[var(--color-text-tertiary)]">
								Get notified when profit exceeds threshold
							</div>
						</div>
					</div>
					<button className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg font-tertiary-bold">
						Setup
					</button>
				</div>
			</SquircleWrap>
		</div>
	);
};

export default PairDetailsPage;
