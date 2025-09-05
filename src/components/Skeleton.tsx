type Props = {
	className?: string;
};

const Skeleton = (props: Props) => {
	const { className } = props;

	return <div className={`animate-pulse bg-gray-300 dark:bg-gray-600 rounded ${className}`} />;
};

export default Skeleton;
