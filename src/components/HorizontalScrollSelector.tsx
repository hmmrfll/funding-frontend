import React from 'react';

export interface SelectorOption {
	key: string;
	label: string;
	icon?: string;
}

interface HorizontalScrollSelectorProps {
	options: SelectorOption[];
	selectedValue: string;
	onSelect: (value: string) => void;
	className?: string;
}

const HorizontalScrollSelector: React.FC<HorizontalScrollSelectorProps> = ({
	options,
	selectedValue,
	onSelect,
	className = '',
}) => {
	return (
		<div className={`relative w-[100vw] h-[40px] -mx-6 px-6 ${className}`}>
			<div className="absolute inset-0 overflow-x-auto px-6">
				<div className="flex gap-[12px] min-w-max pr-6">
					{options.map((option) => (
						<button
							key={option.key}
							onClick={() => onSelect(option.key)}
							className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
								selectedValue === option.key
									? 'bg-[var(--color-primary)] text-white'
									: 'bg-[var(--color-bg-secondary)] text-[var(--color-text)] hover:bg-[var(--color-border)]'
							}`}
						>
							{option.icon && <span>{option.icon}</span>}
							<span className="text-sm font-medium">{option.label}</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default HorizontalScrollSelector;
