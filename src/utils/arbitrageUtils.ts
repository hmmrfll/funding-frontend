import type { ArbitrageOpportunity } from '../types/IArbitrage';
import { navigateToPairDetails } from './navigationUtils';

/**
 * Calculate profit potential for a trading pair
 * @param opportunities - Array of arbitrage opportunities
 * @param symbol - Trading pair symbol
 * @returns Profit potential as percentage
 */
export const getProfitPotential = (opportunities: ArbitrageOpportunity[], symbol: string): number => {
	const opportunity = opportunities.find((opp) => opp.symbol === symbol);
	return opportunity ? opportunity.absRateDifference * 100 : 0;
};

/**
 * Get risk level for a trading pair
 * @param opportunities - Array of arbitrage opportunities
 * @param symbol - Trading pair symbol
 * @returns Risk level string
 */
export const getRiskLevel = (opportunities: ArbitrageOpportunity[], symbol: string): string => {
	const opportunity = opportunities.find((opp) => opp.symbol === symbol);
	return opportunity?.riskLevel || 'low';
};

/**
 * Handle navigation to pair details page with context
 * @param symbol - Trading pair symbol
 * @param navigate - React Router navigate function
 * @param currentPath - Current page path to store as previous
 */
export const handlePairClick = (symbol: string, navigate: (path: string) => void, currentPath: string) => {
	navigateToPairDetails(symbol, navigate, currentPath);
};
