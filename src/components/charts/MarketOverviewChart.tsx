// src/components/charts/MarketOverviewChart.tsx
import React from 'react';
import Chart from './Chart';
import type { ChartData, ChartOptions } from 'chart.js';

interface MarketMetrics {
	timestamp: string;
	totalVolume: number;
	activeOpportunities: number;
	avgSpread: number;
	maxProfitPotential: number;
}

interface MarketOverviewChartProps {
	data: MarketMetrics[];
	title?: string;
	loading?: boolean;
	className?: string;
}

const MarketOverviewChart: React.FC<MarketOverviewChartProps> = ({
	data,
	title = 'Market Overview',
	loading = false,
	className = '',
}) => {
	const chartData: ChartData<'line'> = {
		labels: data.map((item) => new Date(item.timestamp).toLocaleTimeString()),
		datasets: [
			{
				label: 'Active Opportunities',
				data: data.map((item) => item.activeOpportunities),
				borderColor: 'rgb(59, 130, 246)',
				backgroundColor: 'rgba(59, 130, 246, 0.1)',
				borderWidth: 2,
				fill: false,
				tension: 0.4,
				yAxisID: 'y',
			},
			{
				label: 'Avg Spread (%)',
				data: data.map((item) => item.avgSpread * 100),
				borderColor: 'rgb(16, 185, 129)',
				backgroundColor: 'rgba(16, 185, 129, 0.1)',
				borderWidth: 2,
				fill: false,
				tension: 0.4,
				yAxisID: 'y1',
			},
			{
				label: 'Max Profit (%)',
				data: data.map((item) => item.maxProfitPotential * 100),
				borderColor: 'rgb(245, 101, 101)',
				backgroundColor: 'rgba(245, 101, 101, 0.1)',
				borderWidth: 2,
				fill: false,
				tension: 0.4,
				yAxisID: 'y1',
			},
		],
	};

	const options: ChartOptions<'line'> = {
		interaction: {
			mode: 'index' as const,
			intersect: false,
		},
		scales: {
			x: {
				title: {
					display: true,
					text: 'Time',
				},
			},
			y: {
				type: 'linear' as const,
				display: true,
				position: 'left' as const,
				title: {
					display: true,
					text: 'Opportunities Count',
				},
			},
			y1: {
				type: 'linear' as const,
				display: true,
				position: 'right' as const,
				title: {
					display: true,
					text: 'Percentage (%)',
				},
				grid: {
					drawOnChartArea: false,
				},
			},
		},
	};

	return (
		<Chart
			type="line"
			data={chartData}
			options={options}
			title={title}
			loading={loading}
			className={className}
			height={350}
		/>
	);
};

export default MarketOverviewChart;
