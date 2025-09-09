import { useAuthCallback } from '../service/authService';
import Skeleton from '../components/Skeleton';

const AuthPage = () => {
	useAuthCallback();

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center space-y-4">
				<div className="relative">
					<Skeleton
						width={48}
						height={48}
						cornerRadius={24}
						colorMode="gray"
						className="mx-auto"
					/>
					<div className="absolute inset-0 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
				</div>

				<Skeleton
					width={200}
					height={20}
					cornerRadius={4}
					colorMode="gray"
					className="mx-auto"
				/>
			</div>
		</div>
	);
};

export default AuthPage;
