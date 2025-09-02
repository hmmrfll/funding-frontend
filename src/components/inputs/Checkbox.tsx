import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	helperText?: string;
	color?: 'default' | 'green' | 'yellow' | 'red';
}

const Checkbox: React.FC<CheckboxProps> = ({
	label,
	error,
	helperText,
	color = 'default',
	className = '',
	...props
}) => {
	const colorClasses = {
		default: 'text-[var(--color-primary)] focus:ring-[var(--color-primary)]',
		green: 'text-green-500 focus:ring-green-500',
		yellow: 'text-yellow-500 focus:ring-yellow-500',
		red: 'text-red-500 focus:ring-red-500',
	};

	const labelColorClasses = {
		default: 'group-hover:text-[var(--color-primary)]',
		green: 'group-hover:text-green-500',
		yellow: 'group-hover:text-yellow-500',
		red: 'group-hover:text-red-500',
	};

	return (
		<div className="w-full">
			<label className="flex items-center gap-3 cursor-pointer group">
				<input
					type="checkbox"
					className={`w-4 h-4 rounded border-[var(--color-border)] focus:ring-2 focus:ring-opacity-20 transition-all duration-200 ${colorClasses[color]} ${className}`}
					{...props}
				/>
				{label && (
					<span
						className={`text-sm text-[var(--color-text)] transition-colors font-medium ${labelColorClasses[color]}`}
					>
						{label}
					</span>
				)}
			</label>
			{error && <p className="text-sm text-red-500 mt-1">{error}</p>}
			{helperText && !error && <p className="text-sm text-[var(--color-text-tertiary)] mt-1">{helperText}</p>}
		</div>
	);
};

export default Checkbox;
