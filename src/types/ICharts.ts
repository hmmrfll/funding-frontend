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
