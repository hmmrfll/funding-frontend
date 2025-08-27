type StatusIndicatorProps = {
	status: 'success' | 'warning' | 'error';
	className?: string;
};

const StatusIndicator = ({ status, className = '' }: StatusIndicatorProps) => {
	const statusClasses = {
		success: 'bg-green-500',
		warning: 'bg-yellow-500',
		error: 'bg-red-500'
	};

	return (
		<div className={`w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${className}`}>
			<div className={`w-full h-full ${statusClasses[status]} rounded-full`}></div>
		</div>
	);
};

export default StatusIndicator;
