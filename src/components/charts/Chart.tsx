import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import SquircleWrap from '../SquircleWrap';
import { useChartTheme } from '../../hooks/useChartTheme';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	Filler,
);

export type ChartType = 'line' | 'bar' | 'doughnut' | 'area';

interface ChartProps {
	type: ChartType;
	data: ChartData<any>;
	options?: ChartOptions<any>;
	title?: string;
	height?: number;
	loading?: boolean;
	className?: string;
}

const Chart: React.FC<ChartProps> = ({
	type,
	data,
	options = {},
	title,
	height = 300,
	loading = false,
	className = '',
}) => {
	const theme = useChartTheme();

	const defaultOptions: ChartOptions<any> = {
		responsive: true,
		maintainAspectRatio: false,
		interaction: {
			mode: 'index' as const,
			intersect: false,
		},
		plugins: {
			legend: {
				position: 'top' as const,
				labels: {
					usePointStyle: true,
					color: theme.textColor,
					font: {
						size: 12,
					},
					padding: 15,
				},
			},
			title: {
				display: !!title,
				text: title,
				color: theme.textColor,
				font: {
					size: 16,
					weight: 'bold',
				},
				padding: {
					top: 10,
					bottom: 20,
				},
			},
			tooltip: {
				enabled: true,
				backgroundColor: theme.bgSecondaryColor,
				titleColor: theme.textColor,
				bodyColor: theme.textColor,
				borderColor: theme.borderColor,
				borderWidth: 1,
				cornerRadius: 8,
				padding: 12,
				titleFont: {
					size: 14,
					weight: 'bold',
				},
				bodyFont: {
					size: 13,
				},
				displayColors: true,
				usePointStyle: true,
			},
		},
		scales:
			type !== 'doughnut'
				? {
						x: {
							display: true,
							ticks: {
								color: theme.textTertiaryColor,
								font: {
									size: 11,
								},
								maxRotation: 0,
								minRotation: 0,
							},
							grid: {
								color: theme.borderColor,
								drawBorder: false,
								lineWidth: 1,
							},
							border: {
								color: theme.borderColor,
								width: 0,
							},
						},
						y: {
							display: true,
							ticks: {
								color: theme.textTertiaryColor,
								font: {
									size: 11,
								},
								padding: 8,
							},
							grid: {
								color: theme.borderColor,
								drawBorder: false,
								lineWidth: 1,
							},
							border: {
								color: theme.borderColor,
								width: 0,
							},
						},
				  }
				: undefined,
	};

	const mergedOptions = {
		...defaultOptions,
		...options,
		plugins: {
			...defaultOptions.plugins,
			...options.plugins,
		},
		scales: {
			...defaultOptions.scales,
			...options.scales,
		},
	};

	const renderChart = () => {
		switch (type) {
			case 'line':
				return (
					<Line
						data={data}
						options={mergedOptions}
					/>
				);
			case 'area':
				const areaData = {
					...data,
					datasets: data.datasets.map((dataset: any) => ({
						...dataset,
						fill: true,
						backgroundColor: dataset.backgroundColor || 'rgba(59, 130, 246, 0.1)',
					})),
				};
				return (
					<Line
						data={areaData}
						options={mergedOptions}
					/>
				);
			case 'bar':
				return (
					<Bar
						data={data}
						options={mergedOptions}
					/>
				);
			case 'doughnut':
				return (
					<Doughnut
						data={data}
						options={mergedOptions}
					/>
				);
			default:
				return (
					<Line
						data={data}
						options={mergedOptions}
					/>
				);
		}
	};

	if (loading) {
		return (
			<SquircleWrap className={`bg-[var(--color-bg-secondary)] p-4 pb-7 ${className}`}>
				<div className="animate-pulse">
					{title && <div className="h-5 bg-[var(--color-bg-tertiary)] rounded-lg w-32 mb-4"></div>}
					<div
						className="bg-[var(--color-bg-tertiary)] rounded-lg relative overflow-hidden"
						style={{ height: `${height}px` }}
					>
						{/* Имитация осей графика */}
						<div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-border)]"></div>
						<div className="absolute bottom-0 left-0 top-0 w-px bg-[var(--color-border)]"></div>

						{/* Имитация линий данных */}
						<div className="absolute top-1/4 left-4 right-4 h-px bg-[var(--color-border)] opacity-30"></div>
						<div className="absolute top-1/2 left-4 right-4 h-px bg-[var(--color-border)] opacity-30"></div>
						<div className="absolute top-3/4 left-4 right-4 h-px bg-[var(--color-border)] opacity-30"></div>

						{/* Имитация точек данных */}
						<div className="absolute top-1/3 left-1/4 w-2 h-2 bg-[var(--color-border)] rounded-full opacity-50"></div>
						<div className="absolute top-1/2 left-1/2 w-2 h-2 bg-[var(--color-border)] rounded-full opacity-50"></div>
						<div className="absolute top-2/3 left-3/4 w-2 h-2 bg-[var(--color-border)] rounded-full opacity-50"></div>
					</div>
				</div>
			</SquircleWrap>
		);
	}

	return (
		<SquircleWrap className={`bg-[var(--color-bg-secondary)] p-4 pb-7 ${className}`}>
			<div style={{ height: `${height}px` }}>{renderChart()}</div>
		</SquircleWrap>
	);
};

export default Chart;
