import SquircleWrap from '../components/SquircleWrap';

const DashboardBlock = () => {
	return (
		<div className="flex justify-between gap-4 relative">
			<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4 w-[100%] flex gap-4 aspect-square">
				<div className="flex flex-col gap-2">
					<div className="font-tertiary-bold">Arbitrage<br/> Metrics</div>
				</div>
			</SquircleWrap>
			<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4 w-[100%] flex gap-4 aspect-square">
				<div className="flex flex-col gap-2">
					<div className="font-tertiary-bold">Notifications settings</div>
				</div>
			</SquircleWrap>
		</div>
	);
};

export default DashboardBlock;
