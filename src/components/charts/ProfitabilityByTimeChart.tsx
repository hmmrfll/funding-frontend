import React from 'react';
import Chart from './Chart';
import type { ChartData, ChartOptions } from 'chart.js';
import type { ProfitabilityByTimeData } from '../../types/ICharts';

interface ProfitabilityByTimeChartProps {
	data: ProfitabilityByTimeData[];
	title?: string;
	loading?: boolean;
	className?: string;
}

const ProfitabilityByTimeChart: React.FC<ProfitabilityByTimeChartProps> = ({
	data,
	title = 'Profitability by Time',
	loading = false,
	className = '',
}) => {
	const hoursData = Array.from({ length: 24 }, (_, hour) => {
		const found = data.find((item) => item.hour === hour);
		return found ? found.maxProfit : 0;
	});

	const avgHoursData = Array.from({ length: 24 }, (_, hour) => {
		const found = data.find((item) => item.hour === hour);
		return found ? found.avgProfit : 0;
	});

	const chartData: ChartData<'line'> = {
		labels: Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`),
		datasets: [
			{
				label: 'Max Profit (%)',
				data: hoursData,
				borderColor: 'rgb(245, 101, 101)',
				backgroundColor: 'rgba(245, 101, 101, 0.1)',
				borderWidth: 2,
				fill: false,
				tension: 0.4,
				yAxisID: 'y',
			},
			{
				label: 'Avg Profit (%)',
				data: avgHoursData,
				borderColor: 'rgb(16, 185, 129)',
				backgroundColor: 'rgba(16, 185, 129, 0.1)',
				borderWidth: 2,
				fill: false,
				tension: 0.4,
				yAxisID: 'y',
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
					text: 'Hour of Day',
				},
				ticks: {
					maxTicksLimit: 12,
				},
			},
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: 'Profit (%)',
				},
				ticks: {
					callback: function (value) {
						return value + '%';
					},
				},
			},
		},
		plugins: {
			legend: {
				display: true,
				position: 'top' as const,
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

export default ProfitabilityByTimeChart;
