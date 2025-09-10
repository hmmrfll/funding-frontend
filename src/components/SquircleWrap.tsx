import { Squircle } from '@squircle-js/react';
import React, { useEffect, useState } from 'react';

type Props = {
	className?: string;
	children?: React.ReactNode;
	cornerRadius?: number;
	width?: number;
	height?: number;
	asChild?: boolean;
	onClick?: () => void;
	minHeight?: number;
};

const SquircleWrap = (props: Props) => {
	const { className, children, cornerRadius, asChild, onClick, width, height, minHeight } = props;
	const [key, setKey] = useState(0);

	useEffect(() => {
		setKey((prev) => prev + 1);
	}, [children]);

	return (
		<Squircle
			key={key}
			cornerSmoothing={1}
			cornerRadius={cornerRadius || 16}
			className={`${className || ''} ${minHeight ? `min-h-[${minHeight}px]` : ''}`}
			width={width}
			height={height}
			asChild={asChild}
			onClick={onClick}
			style={{
				minHeight: minHeight ? `${minHeight}px` : undefined,
			}}
		>
			{children}
		</Squircle>
	);
};

export default SquircleWrap;
