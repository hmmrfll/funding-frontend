// src/components/charts/AreaChart.tsx
import React from 'react';
import Chart from './Chart';
import type { ChartData, ChartOptions } from 'chart.js';

interface AreaChartData {
	timestamp: string;
	value: number;
	volume?: number;
}

interface AreaChartProps {
	data: AreaChartData[];
	title?: string;
	loading?: boolean;
	className?: string;
	color?: string;
	label?: string;
}

const AreaChart: React.FC<AreaChartProps> = ({
	data,
	title = 'Area Chart',
	loading = false,
	className = '',
	color = 'rgb(59, 130, 246)',
	label = 'Value',
}) => {
	const chartData: ChartData<'line'> = {
		labels: data.map((item) => new Date(item.timestamp).toLocaleTimeString()),
		datasets: [
			{
				label,
				data: data.map((item) => item.value),
				borderColor: color,
				backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.1)'),
				borderWidth: 2,
				fill: true, // Это делает график area chart
				tension: 0.4,
				pointRadius: 0,
				pointHoverRadius: 4,
			},
		],
	};

	const options: ChartOptions<'line'> = {
		interaction: {
			intersect: false,
			mode: 'index' as const,
		},
		scales: {
			x: {
				title: {
					display: true,
					text: 'Time',
					color: 'var(--color-text)',
				},
			},
			y: {
				title: {
					display: true,
					text: label,
					color: 'var(--color-text)',
				},
				beginAtZero: true,
			},
		},
	};

	return (
		<Chart
			type="area"
			data={chartData}
			options={options}
			title={title}
			loading={loading}
			className={className}
		/>
	);
};

export default AreaChart;
