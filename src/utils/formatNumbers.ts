export const formatNumber = (num: number): string => {
	if (num >= 1e9) {
		const value = num / 1e9;
		return (value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)) + 'B';
	}
	if (num >= 1e6) {
		const value = num / 1e6;
		return (value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)) + 'M';
	}
	if (num >= 1e3) {
		const value = num / 1e3;
		return (value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)) + 'K';
	}
	return num.toString();
};

export const formatCurrency = (amount: number): string => {
	if (amount >= 1e9) {
		const value = amount / 1e9;
		return '$' + (value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)) + 'B';
	}
	if (amount >= 1e6) {
		const value = amount / 1e6;
		return '$' + (value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)) + 'M';
	}
	if (amount >= 1e3) {
		const value = amount / 1e3;
		return '$' + (value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)) + 'K';
	}
	return '$' + amount.toFixed(0);
};

export const formatPercentage = (value: number): string => {
	return (value * 100).toFixed(2) + '%';
};

export const formatPrice = (price: number): string => {
	if (price >= 1000) {
		return '$' + price.toFixed(0);
	}
	if (price >= 1) {
		return '$' + price.toFixed(2);
	}
	return '$' + price.toFixed(4);
};
