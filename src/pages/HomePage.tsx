import React from 'react';
import UserProfileBlock from '../blocs/UserProfileBlock';

const HomePage: React.FC = () => {
	return (
		<div className="flex flex-col space-y-4">
			<UserProfileBlock />
		</div>
	);
};

export default HomePage;
