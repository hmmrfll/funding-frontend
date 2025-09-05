// src/components/TimeframeSelector.tsx
import React from 'react';

export type Timeframe = '1h' | '4h' | '24h' | '7d';

interface TimeframeSelectorProps {
	value: Timeframe;
	onChange: (timeframe: Timeframe) => void;
	options?: Timeframe[];
	className?: string;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({
	value,
	onChange,
	options = ['1h', '4h', '24h', '7d'],
	className = '',
}) => {
	return (
		<div className={`flex bg-[var(--color-bg-secondary)] rounded-lg p-1 ${className}`}>
			{options.map((timeframe) => (
				<button
					key={timeframe}
					onClick={() => onChange(timeframe)}
					className={`px-3 py-1 rounded text-sm transition-colors ${
						value === timeframe
							? 'bg-[var(--color-primary)] text-white'
							: 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text)]'
					}`}
				>
					{timeframe}
				</button>
			))}
		</div>
	);
};

export default TimeframeSelector;
