import React from 'react';
import type { FilterState, SortOption } from '../types/SearchPanel';
import SquircleWrap from '../components/SquircleWrap';
import Input from '../components/inputs/Input';
import FilterIcon from '../assets/icons/FilterIcon';
import { useDropdownState } from '../hooks/useDropdownState';
import Dropdown from '../components/Dropdown';
import SortDropdownContent from './dropdownContent/SortDropdownContent';

type Props = {
	filters: FilterState;
	onFiltersChange: (filters: FilterState) => void;
	sortBy: SortOption;
	onSortChange: (sortBy: SortOption) => void;
};

const FilterPanel: React.FC<Props> = ({ filters, onFiltersChange, sortBy, onSortChange }) => {
	const { render, isOpen, openDropdown, closeDropdown } = useDropdownState();

	const handleFilterChange = (key: keyof FilterState, value: any) => {
		onFiltersChange({
			...filters,
			[key]: value,
		});
	};

	return (
		<>
			<div className="flex gap-4">
				<div className="w-full">
					<Input
						type="text"
						placeholder="Search pairs (e.g. BTC, ETH)"
						value={filters.search}
						onChange={(e) => handleFilterChange('search', e.target.value)}
						variant="search"
					/>
				</div>

				<SquircleWrap
					className="min-w-[64px] min-h-[64px] bg-[var(--color-bg-secondary)] flex items-center justify-center cursor-pointer hover:bg-opacity-50 transition-all"
					cornerRadius={8}
					onClick={openDropdown}
				>
					<FilterIcon />
				</SquircleWrap>
			</div>

			{render && (
				<Dropdown
					isOpen={isOpen}
					onClose={closeDropdown}
				>
					<SortDropdownContent
						selectedSort={sortBy}
						onSortSelect={onSortChange}
						onClose={closeDropdown}
					/>
				</Dropdown>
			)}
		</>
	);
};

export default FilterPanel;
