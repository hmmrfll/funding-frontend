import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import Avatar from '../components/Avatar';

import { fullScreenPaddingTop } from '../utils/isMobile';
import ChevronRight from '../assets/ChevronRight.tsx';
import Skeleton from '../components/Skeleton';

const UserProfileBlock = () => {
	const { user, isLoading, error } = useAuth();
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/settings');
	};

	const getApiKeysStatus = () => {
		if (!user) return 'error';
		if (user.hasExtendedKeys && user.hasHyperliquidKeys) return 'success';
		if (user.hasExtendedKeys || user.hasHyperliquidKeys) return 'warning';
		return 'error';
	};

	const getBlockContent = () => {
		if (isLoading) {
			return {
				icon: (
					<Avatar
						isLoading
						size={48}
					/>
				),
				title: '',
				subtitle: '',
				isLoading: true,
				onClick: undefined,
				className: '',
				iconClassName: '',
			};
		}

		if (error) {
			return {
				icon: (
					<div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
						<span className="text-red-500 dark:text-red-400 text-xl">❌</span>
					</div>
				),
				title: 'Error loading profile',
				subtitle: 'Please try again later',
				isLoading: false,
				onClick: undefined,
				className: 'border border-red-200 dark:border-red-800',
				iconClassName: '',
			};
		}

		if (!user) {
			return {
				icon: (
					<div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
						<span className="text-yellow-500 dark:text-yellow-400 text-xl">⚠️</span>
					</div>
				),
				title: 'Profile not found',
				subtitle: 'Please try refreshing the page',
				isLoading: false,
				onClick: undefined,
				className: '',
				iconClassName: '',
			};
		}

		return {
			icon: (
				<Avatar
					imgPath={user?.avatarUrl}
					size={48}
				/>
			),
			title: user?.name || 'Unknown User',
			subtitle: `Chat ID: ${user?.telegramId}`,
			isLoading: false,
			onClick: undefined,
			className: '',
			iconClassName: 'relative',
			showChevron: false,
		};
	};

	const content = getBlockContent();

	return (
		<>
			<div
				className={`flex items-center space-x-3 ${fullScreenPaddingTop} ${content.className} ${
					content.onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
				}`}
				onClick={content.onClick}
			>
				<div className={content.iconClassName}>{content.icon}</div>

				<div className="flex-1 min-w-0 flex flex-col h-full justify-center gap-[2px]">
					{content.isLoading ? (
						<>
							<Skeleton className="w-40 h-4 rounded mb-2" />
							<Skeleton className="w-20 h-3 rounded" />
						</>
					) : (
						<>
							<span className="font-quaternary-regular text-[var(--color-text)]">{content.title}</span>
							<span className="font-quaternary-regular text-[var(--color-text-tertiary)]">{content.subtitle}</span>
						</>
					)}
				</div>

				{content.showChevron && (
					<div className="text-gray-400 dark:text-gray-500">
						<ChevronRight />
					</div>
				)}
			</div>
		</>
	);
};

export default UserProfileBlock;
