import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import Avatar from '../components/Avatar';

import { fullScreenPaddingTop } from '../utils/isMobile';
import ChevronRight from '../assets/ChevronRight.tsx';
import Skeleton from '../components/Skeleton';

const UserProfileBlock = () => {
	const { user, isLoading, error, isAuthenticated, authToken } = useAuth();
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/settings/notifications');
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

		if (!isAuthenticated) {
			return {
				icon: (
					<div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
						<span className="text-white text-xl">🔐</span>
					</div>
				),
				title: 'Connect Telegram',
				subtitle: 'Login to access your account',
				isLoading: false,
				onClick: () => {
					const uuid = crypto.randomUUID();
					window.open(`https://t.me/funarbitragebot?start=web_auth_${uuid}`, '_blank');
				},
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
			onClick: handleClick,
			className: '',
			iconClassName: 'relative',
			showChevron: true,
		};
	};

	const content = getBlockContent();

	return (
		<>
			<div className={`flex items-center space-x-3 ${fullScreenPaddingTop}`}>
				<div className={content.iconClassName}>{content.icon}</div>

				<div className="flex-1 min-w-0 flex flex-col h-full justify-center gap-[2px]">
					{content.isLoading ? (
						<>
							<Skeleton
								width={160}
								height={16}
								cornerRadius={4}
								colorMode="gray"
								className="mb-2"
							/>
							<Skeleton
								width={80}
								height={12}
								cornerRadius={4}
								colorMode="gray"
							/>
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
