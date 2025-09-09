import fetchWithAuth from './fetchWithAuth';
import type { MarketSummary, MarketOverviewPoint } from '../types/ICharts';

export const getMarketSummary = async (): Promise<MarketSummary> => {
	const data = await fetchWithAuth('/charts/market-summary');
	return data;
};

export const getMarketOverview = async (
	timeframe: '1h' | '4h' | '24h' | '7d' = '24h',
): Promise<MarketOverviewPoint[]> => {
	const params = new URLSearchParams();
	params.append('timeframe', timeframe);

	const data = await fetchWithAuth(`/charts/market-overview?${params.toString()}`);
	return data;
};

export const exportChartData = async (chartType: string, data: any[], filename?: string): Promise<void> => {
	try {
		const csvContent = convertToCSV(data);
		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);

		link.setAttribute('href', url);
		link.setAttribute('download', filename || `${chartType}_data_${new Date().toISOString().split('T')[0]}.csv`);
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		URL.revokeObjectURL(url);
	} catch (error) {
		console.error('Error exporting chart data:', error);
		throw new Error('Failed to export chart data');
	}
};

export const exportAllChartsData = async (): Promise<void> => {
	try {
		const [marketSummary] = await Promise.all([getMarketSummary()]);

		const timestamp = new Date().toISOString().split('T')[0];

		await exportChartData('market_summary', [marketSummary], `market_summary_${timestamp}.csv`);

		console.log('All charts data exported successfully');
	} catch (error) {
		console.error('Error exporting all charts data:', error);
		throw new Error('Failed to export all charts data');
	}
};

const convertToCSV = (data: any[]): string => {
	if (!data.length) return '';

	const headers = Object.keys(data[0]);
	const csvRows = [headers.join(',')];

	for (const row of data) {
		const values = headers.map((header) => {
			const value = row[header];
			if (value === null || value === undefined) return '';
			if (typeof value === 'object') return JSON.stringify(value);
			if (typeof value === 'string') return `"${value.replace(/"/g, '""')}"`;
			return value;
		});
		csvRows.push(values.join(','));
	}

	return csvRows.join('\n');
};
