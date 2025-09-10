export const handleWritePerson = (username: string | null, phoneNumber: string | null): void => {
	if (username && username !== 'Нет username') {
		const telegramUsernameUrl = `https://t.me/${username}`;
		window.open(telegramUsernameUrl, '_blank');
		if (window.Telegram?.WebApp?.HapticFeedback) {
			window.Telegram.WebApp.HapticFeedback.impactOccurred('soft');
		}
	} else if (phoneNumber) {
		const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber.substring(1) : phoneNumber;
		const telegramPhoneUrl = `https://t.me/+${formattedPhone}`;
		window.open(telegramPhoneUrl, '_blank');
		if (window.Telegram?.WebApp?.HapticFeedback) {
			window.Telegram.WebApp.HapticFeedback.impactOccurred('soft');
		}
	} else {
		// Если ни имени пользователя, ни телефона нет
		alert('У пользователя закрытый профиль. Пожалуйста, свяжитесь с администратором клуба.');
		console.error('User has a private profile with no username or phone number available.');
		if (window.Telegram?.WebApp?.HapticFeedback) {
			window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
		}
	}
};

export const isAdminMode = (): boolean => sessionStorage.getItem('role') === 'admin';
