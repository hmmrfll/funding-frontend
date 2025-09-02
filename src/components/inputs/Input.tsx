import React from 'react';
import SquircleWrap from '../SquircleWrap';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	helperText?: string;
	variant?: 'default' | 'search' | 'number';
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
	label,
	helperText,
	variant = 'default',
	leftIcon,
	rightIcon,
	className = '',
	...props
}) => {
	const baseClasses =
		'w-full bg-transparent text-sm text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] border-0 outline-none transition-all duration-200';

	const variantClasses = {
		default: baseClasses,
		search: leftIcon ? `${baseClasses} pl-10` : baseClasses,
		number: `${baseClasses} text-right`,
	};

	return (
		<div className="w-full">
			<SquircleWrap
				className="w-full h-[64px] flex items-center px-4 bg-[var(--color-bg-secondary)] bg-opacity-30"
				cornerRadius={8}
			>
				<div className="relative w-full">
					{leftIcon && (
						<div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[var(--color-text-tertiary)]">
							{leftIcon}
						</div>
					)}
					<input
						className={`${variantClasses[variant]} ${className}`}
						{...props}
					/>
					{rightIcon && (
						<div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-[var(--color-text-tertiary)]">
							{rightIcon}
						</div>
					)}
				</div>
			</SquircleWrap>
			{label && <label className="text-sm font-medium text-[var(--color-text)] mt-1 block">{label}</label>}
			{helperText && <p className="text-sm text-[var(--color-text-tertiary)] mt-1">{helperText}</p>}
		</div>
	);
};

export default Input;
