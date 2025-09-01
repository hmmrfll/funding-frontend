import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
	error: string;
	title?: string;
	buttonText?: string;
	onButtonClick?: () => void;
	showBackButton?: boolean;
};

const ErrorBlock: React.FC<Props> = ({
	error,
	title = 'Error',
	buttonText = 'Go Back',
	onButtonClick,
	showBackButton = true,
}) => {
	const navigate = useNavigate();

	const handleButtonClick = () => {
		if (onButtonClick) {
			onButtonClick();
		} else {
			navigate('/');
		}
	};

	return (
		<div className="flex flex-col gap-6">
			<div className="pt-[75px]">
				<h1 className="font-tertiary-bold text-[var(--color-text)] mb-4">{title}</h1>
				<div className="text-red-500">{error}</div>
				{showBackButton && (
					<button
						onClick={handleButtonClick}
						className="mt-4 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg"
					>
						{buttonText}
					</button>
				)}
			</div>
		</div>
	);
};

export default ErrorBlock;
