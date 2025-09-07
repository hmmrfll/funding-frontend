import React from 'react';
import { useAuth } from '../providers/AuthProvider';
import UserProfileBlock from '../blocs/UserProfileBlock';
import DashboardBlock from '../blocs/WidgetsBlock';
import PairDetailsBlock from '../blocs/PairDetailsBlock';
import FooterBlock from '../blocs/FooterBlock';
import Loader from '../components/Loader';

const HomePage: React.FC = () => {
	const { isLoading } = useAuth();

	if (isLoading) {
		return <Loader />;
	}

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
