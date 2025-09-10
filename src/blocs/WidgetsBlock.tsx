import SquircleWrap from '../components/SquircleWrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import ArbitrageBackground from '../assets/ArbitrageBackground';
import NotificationsBackground from '../assets/NotificationsBackground';
import { useNotifications } from '../hooks/useQuery/useNotifications';

const DashboardBlock = () => {
	const navigate = useNavigate();
	const { user, isAuthenticated } = useAuth();

	const { data: notifications = [], isLoading: notificationsLoading } = useNotifications(user?.id || '');

	const notificationsActive = notifications.some((n) => n.enabled);

	const handleArbitrageClick = () => {
		navigate('/dashboards');
	};

	const handleNotificationsClick = () => {
		navigate('/settings/notifications');
	};

	return (
		<div className="flex justify-between gap-4 relative">
			<SquircleWrap
				className="bg-[var(--color-bg-secondary)] p-4 w-[100%] flex flex-col justify-between aspect-square relative overflow-hidden cursor-pointer hover:bg-[var(--color-border)] transition-colors"
				onClick={handleArbitrageClick}
			>
				<ArbitrageBackground />

				<div className="flex flex-col z-10">
					<div className="font-tertiary-bold text-[var(--color-text)] text-lg leading-tight">Dashboards</div>
					<div className="font-tertiary-bold text-[var(--color-text)] text-lg leading-tight">Metrics</div>
				</div>

				<div className="flex items-center gap-2 z-10">
					<div className="flex items-center gap-1">
						<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
						<span className="text-xs text-blue-500 font-medium">Live</span>
					</div>
				</div>
			</SquircleWrap>

			<SquircleWrap
				className="bg-[var(--color-bg-secondary)] p-4 w-[100%] flex flex-col justify-between aspect-square relative overflow-hidden cursor-pointer hover:bg-[var(--color-border)] transition-colors"
				onClick={handleNotificationsClick}
			>
				<NotificationsBackground notificationsActive={notificationsActive} />

				<div className="flex flex-col z-10">
					<div className="font-tertiary-bold text-[var(--color-text)] text-lg leading-tight">Notifications</div>
					<div className="font-tertiary-bold text-[var(--color-text)] text-lg leading-tight">Settings</div>
				</div>

				<div className="flex items-center gap-2 z-10">
					{notificationsLoading ? (
						<>
							<div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
							<span className="text-xs text-gray-400">Loading...</span>
						</>
					) : (
						<>
							<div
								className={`w-2 h-2 rounded-full ${
									notificationsActive ? 'bg-orange-500' : 'bg-gray-400'
								} transition-colors duration-300`}
							></div>
							<span
								className={`text-xs font-medium ${
									notificationsActive ? 'text-orange-500' : 'text-gray-500'
								} transition-colors duration-300`}
							>
								{notificationsActive ? `${notifications.filter((n) => n.enabled).length} active` : 'No alerts'}
							</span>
						</>
					)}
				</div>
			</SquircleWrap>
		</div>
	);
};

export default DashboardBlock;
