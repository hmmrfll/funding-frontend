import React from 'react';
import UserProfileBlock from '../blocs/UserProfileBlock';
import DashboardBlock from '../blocs/WidgetsBlock';

const HomePage: React.FC = () => {
	return (
		<div className="flex flex-col gap-[28px]">
			<UserProfileBlock />
			<DashboardBlock />
		</div>
	);
};

export default HomePage;
