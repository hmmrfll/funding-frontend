import React from 'react';

interface SelectOption {
	value: string;
	label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	error?: string;
	helperText?: string;
	options: SelectOption[];
	placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
	label,
	error,
	helperText,
	options,
	placeholder,
	className = '',
	...props
}) => {
	const baseClasses =
		'w-full bg-[var(--color-border)] bg-opacity-30 rounded-lg px-4 py-3 text-sm text-[var(--color-text)] border border-transparent outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 focus:border-[var(--color-primary)] focus:border-opacity-30 transition-all duration-200 cursor-pointer appearance-none';

	return (
		<div className="w-full">
			{label && <label className="text-sm font-medium text-[var(--color-text)] mb-2 block">{label}</label>}
			<div className="relative">
				<select
					className={`${baseClasses} ${
						error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
					} ${className}`}
					{...props}
				>
					{placeholder && (
						<option
							value=""
							disabled
						>
							{placeholder}
						</option>
					)}
					{options.map((option) => (
						<option
							key={option.value}
							value={option.value}
						>
							{option.label}
						</option>
					))}
				</select>
				<div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-tertiary)] pointer-events-none">
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<polyline points="6,9 12,15 18,9" />
					</svg>
				</div>
			</div>
			{error && <p className="text-sm text-red-500 mt-1">{error}</p>}
			{helperText && !error && <p className="text-sm text-[var(--color-text-tertiary)] mt-1">{helperText}</p>}
		</div>
	);
};

export default Select;
