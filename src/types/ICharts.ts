export interface MarketSummary {
	totalVolume: number;
	totalPairs: number;
	avgSpread: number;
	topOpportunities: {
		symbol: string;
		profit: number;
		volume: number;
	}[];
}

export interface MarketOverviewPoint {
	timestamp: string;
	totalVolume: number;
	activeOpportunities: number;
	avgSpread: number;
	maxProfitPotential: number;
}

export interface ActivityByTimeData {
	hour: number;
	count: number;
}

export interface ProfitabilityByTimeData {
	hour: number;
	maxProfit: number;
	avgProfit: number;
	medianProfit: number;
}
