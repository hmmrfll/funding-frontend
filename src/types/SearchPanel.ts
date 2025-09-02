export type SortOption =
	| 'profit_desc'
	| 'profit_asc'
	| 'symbol_asc'
	| 'symbol_desc'
	| 'extended_rate'
	| 'hyperliquid_rate';

export interface FilterState {
	search: string;
	minProfit: number;
	maxProfit: number;
	exchanges: {
		extended: boolean;
		hyperliquid: boolean;
	};
	riskLevels: {
		low: boolean;
		medium: boolean;
		high: boolean;
	};
	showOnlyProfitable: boolean;
}

export const DEFAULT_FILTERS: FilterState = {
	search: '',
	minProfit: 0,
	maxProfit: 100,
	exchanges: {
		extended: true,
		hyperliquid: true,
	},
	riskLevels: {
		low: true,
		medium: true,
		high: true,
	},
	showOnlyProfitable: false,
};

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
	{ value: 'profit_desc', label: 'Highest Profit' },
	{ value: 'profit_asc', label: 'Lowest Profit' },
	{ value: 'symbol_asc', label: 'Symbol A-Z' },
	{ value: 'symbol_desc', label: 'Symbol Z-A' },
	{ value: 'extended_rate', label: 'Extended Rate' },
	{ value: 'hyperliquid_rate', label: 'Hyperliquid Rate' },
];
