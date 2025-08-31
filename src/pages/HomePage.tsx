import React from 'react';
import UserProfileBlock from '../blocs/UserProfileBlock';
import DashboardBlock from '../blocs/WidgetsBlock';
import PairDetailsBlock from '../blocs/PairDetailsBlock';
import FooterBlock from '../blocs/FooterBlock';

const HomePage: React.FC = () => {
	return (
		<div className="flex flex-col gap-[28px]">
			<UserProfileBlock />
			<DashboardBlock />
			<PairDetailsBlock />
			<FooterBlock />
		</div>
	);
};

export default HomePage;
