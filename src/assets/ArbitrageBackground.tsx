import React from 'react';

type Props = {
	className?: string;
};

const ArbitrageBackground: React.FC<Props> = ({ className = '' }) => {
	return (
		<div className={`absolute inset-0 opacity-30 ${className}`}>
			{/* Gradient shapes */}
			<div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-400 to-purple-600 rounded-full blur-2xl"></div>
			<div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-emerald-400 to-cyan-500 rounded-full blur-xl"></div>

			{/* Simple geometric pattern */}
			<svg
				className="absolute inset-0 w-full h-full"
				viewBox="0 0 100 100"
			>
				<defs>
					<linearGradient
						id="triangleGrad"
						x1="0%"
						y1="0%"
						x2="100%"
						y2="100%"
					>
						<stop
							offset="0%"
							stopColor="#3b82f6"
							stopOpacity="0.6"
						/>
						<stop
							offset="100%"
							stopColor="#8b5cf6"
							stopOpacity="0.3"
						/>
					</linearGradient>
				</defs>

				{/* Modern triangular shapes */}
				<polygon
					points="20,80 40,40 60,70"
					fill="url(#triangleGrad)"
					opacity="0.7"
				/>
				<polygon
					points="50,30 70,20 80,50"
					fill="url(#triangleGrad)"
					opacity="0.5"
				/>
				<polygon
					points="15,45 35,35 25,60"
					fill="url(#triangleGrad)"
					opacity="0.4"
				/>

				{/* Connecting lines */}
				<line
					x1="40"
					y1="40"
					x2="70"
					y2="20"
					stroke="#3b82f6"
					strokeWidth="1.5"
					opacity="0.6"
				/>
				<line
					x1="60"
					y1="70"
					x2="80"
					y2="50"
					stroke="#8b5cf6"
					strokeWidth="1.5"
					opacity="0.5"
				/>
			</svg>
		</div>
	);
};

export default ArbitrageBackground;
