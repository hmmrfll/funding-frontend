import { Squircle } from '@squircle-js/react';
import React from 'react';

type Props = {
	className?: string;
	children?: React.ReactNode;
	cornerRadius?: number;
	width?: number;
	height?: number;
	asChild?: boolean;
	onClick?: () => void;
};

const SquircleWrap = (props: Props) => {
	const { className, children, cornerRadius, asChild, onClick, width, height } = props;

	return (
		<Squircle
			cornerSmoothing={1}
			cornerRadius={cornerRadius || 16}
			className={className}
			width={width}
			height={height}
			asChild={asChild}
			onClick={onClick}
		>
			{children}
		</Squircle>
	);
};

export default SquircleWrap;
