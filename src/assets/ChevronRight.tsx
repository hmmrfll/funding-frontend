import React from 'react';

interface ChevronRightProps {
	className?: string;
	size?: number;
}

const ChevronRight: React.FC<ChevronRightProps> = ({ className = '', size = 20 }) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M9 5l7 7-7 7"
			/>
		</svg>
	);
};

export default ChevronRight;
