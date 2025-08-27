export type HapticFeedbackType = 'soft' | 'medium' | 'heavy' | 'rigid' | 'light';

interface TelegramWebApp {
	initData: string;
	initDataUnsafe: {
		start_param: string;
		user: {
			id: string;
			allows_write_to_pm: boolean;
			first_name: string;
			last_name: string;
			username: string;
			language_code: string;
			photo_url: string;
		};
	};
	platform: string;
	themeParams: {
		accent_text_color: string;
		bg_color: string;
		bottom_bar_bg_color: string;
		button_color: string;
		button_text_color: string;
		destructive_text_color: string;
		header_bg_color: string;
		hint_color: string;
		link_color: string;
		secondary_bg_color: string;
		section_bg_color: string;
		section_header_text_color: string;
		section_separator_color: string;
		subtitle_text_color: string;
		text_color: string;
	};
	version: string;
	isExpanded: boolean;
	expand: () => void;
	close: () => void;
	disableVerticalSwipes: () => void;
	requestFullscreen: () => void;
	openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
	HapticFeedback: {
		impactOccurred: (type: HapticFeedbackType) => void;
		notificationOccurred: (type: 'error' | 'warning' | 'success') => void;
	};
	requestContact: () => void;
	showScanQrPopup: (options?: { text?: string }) => void;
	closeScanQrPopup: () => void;
	onEvent: (event: string, callback: (event: any) => void) => void;
	offEvent: (event: string, callback: (event: any) => void) => void;
	BackButton: {
		onClick: (callback: () => void) => void;
		offClick: (callback: () => void) => void;
		show: () => void;
		hide: () => void;
	};
}

declare global {
	interface Window {
		Telegram: {
			WebApp: TelegramWebApp;
		};
		TelegramWebviewProxy?: any;
	}
}
