import SquircleWrap from './SquircleWrap';

type Props = {
	className?: string;
	cornerRadius?: number;
	width?: number;
	height?: number;
	colorMode?: 'gray' | 'default';
};

const colorsMapDark = {
	gray: 'dark:bg-[linear-gradient(90deg,var(--color-gray-800)_0%,var(--color-gray-800)_40%,var(--color-gray-500)_50%,var(--color-gray-800)_60%,var(--color-gray-800)_100%)]',
	default:
		'dark:bg-[linear-gradient(90deg,var(--color-gray-dark)_0%,var(--color-gray-dark)_40%,var(--color-gray-800)_50%,var(--color-gray-dark)_60%,var(--color-gray-dark)_100%)]',
};

const colorsMapLight = {
	gray: 'bg-[linear-gradient(90deg,var(--color-gray-500)_0%,var(--color-gray-500)_40%,var(--color-white)_50%,var(--color-gray-500)_60%,var(--color-gray-500)_100%)]',
	default:
		'bg-[linear-gradient(90deg,var(--color-white)_0%,var(--color-white)_40%,var(--color-gray-500)_50%,var(--color-white)_60%,var(--color-white)_100%)]',
};

const Skeleton = (props: Props) => {
	const { className, cornerRadius = 16, colorMode = 'default', width, height } = props;

	return (
		<SquircleWrap
			cornerRadius={cornerRadius}
			width={width}
			height={height}
			className={`${colorsMapLight[colorMode]} ${colorsMapDark[colorMode]} bg-size-[200%_100%] skeleton-animation ${className}`}
		/>
	);
};

export default Skeleton;
