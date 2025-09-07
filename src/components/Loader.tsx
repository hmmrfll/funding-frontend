import React from 'react';

const Loader: React.FC = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-6">
			<div className="text-center space-y-6">
				<div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto"></div>

				<div className="space-y-2">
					<h2 className="text-lg font-semibold text-[var(--color-text)]">Loading...</h2>
					<p className="text-sm text-[var(--color-text-tertiary)]">Initializing your funding arbitrage bot</p>
				</div>
			</div>
		</div>
	);
};

export default Loader;
