import React from 'react';
import type { SortOption } from '../../types/SearchPanel';
import { SORT_OPTIONS } from '../../types/SearchPanel';
import CheckIcon from '../../assets/icons/CheckIcon';

type Props = {
	selectedSort: SortOption;
	onSortSelect: (sort: SortOption) => void;
	onClose: () => void;
};

const SortDropdownContent: React.FC<Props> = ({ selectedSort, onSortSelect, onClose }) => {
	const handleSortSelect = (sort: SortOption) => {
		onSortSelect(sort);
		onClose();
	};

	return (
		<>
			<div
				className="font-primary-bold mb-[4px]"
				style={{ color: 'var(--color-text)' }}
			>
				Sorting
			</div>
			{SORT_OPTIONS.map((option) => (
				<div
					key={option.value}
					className="flex items-center  pb-[12px] pt-[12px] cursor-pointer hover:opacity-80 transition-opacity"
					style={{
						color: selectedSort === option.value ? 'var(--color-primary)' : 'var(--color-text)',
					}}
					onClick={() => handleSortSelect(option.value)}
				>
					<div className="font-tertiary-regular">{option.label}</div>
					{selectedSort === option.value && (
						<div className="w-[24px] h-[24px] ml-auto">
							<CheckIcon />
						</div>
					)}
				</div>
			))}
		</>
	);
};

export default SortDropdownContent;
