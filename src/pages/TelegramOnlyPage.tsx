import React from 'react';
import SquircleWrap from '../components/SquircleWrap';

const TelegramOnlyPage: React.FC = () => {
	const telegramBotUrl = 'https://t.me/funarbitragebot';

	return (
		<div className="min-h-screen p-4 sm:p-6 ">
			<div className="max-w-md mx-auto w-full space-y-4 sm:space-y-6 py-4 sm:py-8">
				<div className="text-center">
					<div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
						<span className="text-white text-2xl sm:text-3xl">📱</span>
					</div>
					<h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text)] mb-2">Telegram Only App</h1>
					<p className="text-sm sm:text-base text-[var(--color-text-tertiary)]">
						This application works only within Telegram
					</p>
				</div>

				<SquircleWrap className="bg-[var(--color-bg-secondary)] p-3 sm:p-6">
					<div className="text-center space-y-2 sm:space-y-4">
						<div className="text-2xl sm:text-4xl mb-2 sm:mb-4">🚫</div>
						<h2 className="text-sm sm:text-lg font-semibold text-[var(--color-text)]">Access Restricted</h2>
						<p className="text-xs sm:text-sm text-[var(--color-text-tertiary)]">
							Sorry, this application is designed to work exclusively within Telegram Mini Apps. Please open it through
							the Telegram bot to access all features.
						</p>
					</div>
				</SquircleWrap>

				<SquircleWrap className="bg-[var(--color-primary)] bg-opacity-10 border border-[var(--color-primary)] border-opacity-30 p-3 sm:p-6">
					<div className="text-center space-y-2 sm:space-y-4">
						<div className="text-2xl sm:text-4xl mb-2 sm:mb-4">🤖</div>
						<h3 className="text-sm sm:text-lg font-semibold text-[var(--color-text)]">How to Access</h3>
						<p className="text-xs sm:text-sm text-[var(--color-text-tertiary)] mb-2 sm:mb-4">
							To use this application, you need to open it through our Telegram bot:
						</p>

						<a
							href={telegramBotUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block w-full"
						>
							<button className="w-full bg-[var(--color-primary)] text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm sm:text-base">
								Open in Telegram
							</button>
						</a>

						<p className="text-xs text-[var(--color-text-tertiary)] mt-1 sm:mt-2">
							Click the button above to open our bot in Telegram
						</p>
					</div>
				</SquircleWrap>

				<div className="text-center">
					<p className="text-xs text-[var(--color-text-tertiary)]">Need help? Contact us through the Telegram bot</p>
				</div>
			</div>
		</div>
	);
};

export default TelegramOnlyPage;
