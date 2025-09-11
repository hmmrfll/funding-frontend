import React from 'react';
import Chart from './Chart';
import type { ChartData, ChartOptions } from 'chart.js';
import type { ActivityByTimeData } from '../../types/ICharts';

interface ActivityByTimeChartProps {
	data: ActivityByTimeData[];
	title?: string;
	loading?: boolean;
	className?: string;
}

const ActivityByTimeChart: React.FC<ActivityByTimeChartProps> = ({
	data,
	title = 'Activity by Time',
	loading = false,
	className = '',
}) => {
	const hoursData = Array.from({ length: 24 }, (_, hour) => {
		const found = data.find((item) => item.hour === hour);
		return found ? found.count : 0;
	});

	const chartData: ChartData<'bar'> = {
		labels: Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`),
		datasets: [
			{
				label: 'Opportunities Count',
				data: hoursData,
				backgroundColor: 'rgba(59, 130, 246, 0.6)',
				borderColor: 'rgb(59, 130, 246)',
				borderWidth: 1,
			},
		],
	};

	const options: ChartOptions<'bar'> = {
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
					text: 'Number of Opportunities',
				},
				ticks: {
					stepSize: 1,
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
	};

	return (
		<Chart
			type="bar"
			data={chartData}
			options={options}
			title={title}
			loading={loading}
			className={className}
			height={300}
		/>
	);
};

export default ActivityByTimeChart;
