import React from 'react';
import SquircleWrap from './SquircleWrap';
import ChevronRight from '../assets/ChevronRight.tsx';

type Props = {
	icon: string;
	title: string;
	description: string;
	buttonText?: string;
	onClick?: () => void;
	showChevron?: boolean;
	className?: string;
};

const ActionCard: React.FC<Props> = ({
	icon,
	title,
	description,
	buttonText,
	onClick,
	showChevron = true,
	className = 'bg-[var(--color-primary)] bg-opacity-10 border border-[var(--color-primary)] border-opacity-30',
}) => {
	return (
		<SquircleWrap
			className={`${className} p-4 ${onClick ? 'cursor-pointer' : ''}`}
			onClick={onClick}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<span className="text-2xl">{icon}</span>
					<div>
						<span className="font-tertiary-bold text-[var(--color-text)]">{title}</span>
						<div className="text-xs text-[var(--color-text-tertiary)]">{description}</div>
					</div>
				</div>
				{buttonText ? (
					<button className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg font-tertiary-bold">
						{buttonText}
					</button>
				) : showChevron ? (
					<ChevronRight />
				) : null}
			</div>
		</SquircleWrap>
	);
};

export default ActionCard;
