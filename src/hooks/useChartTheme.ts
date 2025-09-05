import { useMemo } from 'react';
import useTelegram from './useTelegram';

interface ChartTheme {
	textColor: string;
	textSecondaryColor: string;
	textTertiaryColor: string;
	bgColor: string;
	bgSecondaryColor: string;
	borderColor: string;
	primaryColor: string;
}

export const useChartTheme = (): ChartTheme => {
	const { theme } = useTelegram();

	return useMemo(() => {
		if (theme === 'dark') {
			return {
				textColor: 'rgba(255, 255, 255, 1)',
				textSecondaryColor: 'rgba(209, 213, 219, 1)',
				textTertiaryColor: 'rgba(255, 255, 255, 0.64)',
				bgColor: 'rgba(15, 20, 25, 1)',
				bgSecondaryColor: 'rgba(30, 31, 32, 1)',
				borderColor: 'rgba(55, 65, 81, 1)',
				primaryColor: 'rgba(191, 143, 224, 1)',
			};
		} else {
			return {
				textColor: 'rgba(15, 20, 25, 1)',
				textSecondaryColor: 'rgba(107, 114, 128, 1)',
				textTertiaryColor: 'rgba(15, 20, 25, 0.64)',
				bgColor: 'rgba(255, 255, 255, 1)',
				bgSecondaryColor: 'rgba(243, 245, 247, 1)',
				borderColor: 'rgba(229, 231, 235, 1)',
				primaryColor: 'rgba(191, 143, 224, 1)',
			};
		}
	}, [theme]);
};
