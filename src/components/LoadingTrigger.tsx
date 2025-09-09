import React, { useEffect, useRef } from 'react';

interface LoadingTriggerProps {
	callback: () => void;
}

const LoadingTrigger: React.FC<LoadingTriggerProps> = ({ callback }) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					callback();
				}
			},
			{
				threshold: 0.1,
				rootMargin: '100px',
			},
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			observer.disconnect();
		};
	}, [callback]);

	return (
		<div
			ref={ref}
			className="h-1"
		/>
	);
};

export default LoadingTrigger;
