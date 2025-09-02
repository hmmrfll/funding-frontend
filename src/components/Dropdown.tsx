import React from 'react';
import SquircleWrap from './SquircleWrap';
import { isIos } from '../utils/isMobile';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	className?: string;
};

const maxHeight = isIos ? `max-h-[calc(100vh-92px)]` : `max-h-[calc(100vh-75px)]`;

const Dropdown = (props: Props) => {
	const { isOpen, onClose, children, className } = props;
	return (
		<>
			<div
				onClick={onClose}
				className={`fixed inset-0 transition-all duration-[250ms] ease-out backdrop-blur-[4px] ${
					isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
				}`}
				style={{ backgroundColor: 'rgba(0, 0, 0, 0.12)' }}
			/>

			<div
				className={`w-full ${maxHeight} fixed bottom-0 left-0 z-[1001] flex flex-col transition-transform duration-[250ms] ease-out will-change-transform ${
					isOpen ? 'translate-y-0' : 'translate-y-full'
				}`}
			>
				<div
					className="absolute left-1/2 -translate-x-1/2 -top-3 w-12 h-1 rounded-t-sm"
					style={{ backgroundColor: 'var(--color-border)' }}
				/>

				<SquircleWrap
					cornerRadius={24}
					className={`h-[100%] p-6 w-full flex-1 z-[1] overflow-hidden flex flex-col bg-[var(--color-bg-secondary)] ${className}`}
				>
					<div className="w-full z-[2] overflow-y-auto overflow-x-hidden h-full scrollbar-hide">{children}</div>
				</SquircleWrap>
				<div
					className="absolute bottom-0 left-0 right-0 h-4 z-0"
					style={{ backgroundColor: 'var(--color-bg-secondary)' }}
				/>
			</div>
		</>
	);
};

export default Dropdown;
