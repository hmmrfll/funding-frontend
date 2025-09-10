import SquircleWrap from '../components/SquircleWrap';
import GitHubIcon from '../components/GitHubIcon';
import TelegramIcon from '../components/TelegramIcon';
import useTelegram from '../hooks/useTelegram';
import { handleWritePerson } from '../utils/telegramUtils';

const FooterBlock = () => {
	const { openLink } = useTelegram();

	const handleLinkClick = (url: string) => {
		openLink(url);
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="grid grid-cols-2 gap-4">
				<SquircleWrap
					className="bg-[var(--color-bg-secondary)] p-4 flex items-center gap-3 cursor-pointer hover:bg-[var(--color-border)] transition-colors"
					onClick={() => handleLinkClick('https://github.com/hmmrfll/funding-backend')}
				>
					<div className="text-2xl">⚡</div>
					<div className="flex-1 min-w-0">
						<div className="font-tertiary-bold text-[var(--color-text)] text-sm">GitHub</div>
						<div className="text-xs text-[var(--color-text-tertiary)]">Hard & Work</div>
					</div>
					<div className="text-[var(--color-text-tertiary)] flex-shrink-0">
						<GitHubIcon />
					</div>
				</SquircleWrap>

				<SquircleWrap
					className="bg-[var(--color-bg-secondary)] p-4 flex items-center gap-3 cursor-pointer hover:bg-[var(--color-border)] transition-colors"
					onClick={() => handleWritePerson('vm4sto', null)}
				>
					<div className="text-2xl">📢</div>
					<div className="flex-1 min-w-0">
						<div className="font-tertiary-bold text-[var(--color-text)] text-sm">Telegram</div>
						<div className="text-xs text-[var(--color-text-tertiary)]">Personal & Achievements</div>
					</div>
					<div className="text-[var(--color-text-tertiary)] flex-shrink-0">
						<TelegramIcon />
					</div>
				</SquircleWrap>
			</div>

			<div className="text-center py-2">
				<div className="text-xs text-[var(--color-text-tertiary)]">Funding Arbitrage Bot v1.0</div>
				<div className="text-xs text-[var(--color-text-tertiary)] mt-1">Made with ❤️ for cp0x competitions</div>
			</div>
		</div>
	);
};

export default FooterBlock;
