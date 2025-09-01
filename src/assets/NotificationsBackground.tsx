import React from 'react';

type Props = {
	className?: string;
	notificationsActive: boolean;
};

const NotificationsBackground: React.FC<Props> = ({ className = '', notificationsActive }) => {
	return (
		<div className={`absolute inset-0 opacity-25 ${className}`}>
			{/* Gradient backgrounds */}
			<div
				className={`absolute top-2 right-2 w-18 h-18 bg-gradient-to-bl ${
					notificationsActive ? 'from-orange-400 to-red-500' : 'from-gray-400 to-gray-600'
				} rounded-full blur-2xl transition-all duration-500`}
			></div>
			<div
				className={`absolute bottom-2 left-2 w-14 h-14 bg-gradient-to-tr ${
					notificationsActive ? 'from-yellow-400 to-orange-500' : 'from-gray-300 to-gray-500'
				} rounded-full blur-xl transition-all duration-500`}
			></div>

			{/* Grid of dots pattern */}
			<svg
				className="absolute inset-0 w-full h-full"
				viewBox="0 0 100 100"
			>
				<defs>
					<radialGradient
						id="dotGrad"
						cx="50%"
						cy="50%"
					>
						<stop
							offset="0%"
							stopColor={notificationsActive ? '#f97316' : '#9ca3af'}
							stopOpacity="0.8"
						/>
						<stop
							offset="100%"
							stopColor={notificationsActive ? '#ef4444' : '#6b7280'}
							stopOpacity="0.2"
						/>
					</radialGradient>
				</defs>

				{/* Grid pattern of circles */}
				<circle
					cx="25"
					cy="25"
					r="3"
					fill="url(#dotGrad)"
				/>
				<circle
					cx="40"
					cy="25"
					r="4"
					fill="url(#dotGrad)"
				/>
				<circle
					cx="60"
					cy="25"
					r="2"
					fill="url(#dotGrad)"
				/>
				<circle
					cx="75"
					cy="25"
					r="3"
					fill="url(#dotGrad)"
				/>

				<circle
					cx="25"
					cy="45"
					r="2"
					fill="url(#dotGrad)"
				/>
				<circle
					cx="40"
					cy="45"
					r="5"
					fill="url(#dotGrad)"
				/>
				<circle
					cx="60"
					cy="45"
					r="6"
					fill="url(#dotGrad)"
				/>
				<circle
					cx="75"
					cy="45"
					r="2"
					fill="url(#dotGrad)"
				/>

				<circle
					cx="25"
					cy="65"
					r="4"
					fill="url(#dotGrad)"
				/>
				<circle
					cx="40"
					cy="65"
					r="2"
					fill="url(#dotGrad)"
				/>
				<circle
					cx="60"
					cy="65"
					r="3"
					fill="url(#dotGrad)"
				/>
				<circle
					cx="75"
					cy="65"
					r="4"
					fill="url(#dotGrad)"
				/>

				<circle
					cx="25"
					cy="80"
					r="2"
					fill="url(#dotGrad)"
				/>
				<circle
					cx="40"
					cy="80"
					r="3"
					fill="url(#dotGrad)"
				/>
				<circle
					cx="60"
					cy="80"
					r="2"
					fill="url(#dotGrad)"
				/>
				<circle
					cx="75"
					cy="80"
					r="3"
					fill="url(#dotGrad)"
				/>
			</svg>
		</div>
	);
};

export default NotificationsBackground;
