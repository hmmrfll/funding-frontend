import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	const frontendUrl = env.VITE_FRONTEND_URL;

	const baseAllowedHosts = ['localhost', '127.0.0.1', '0.0.0.0'];

	let additionalHosts: string[] = [];
	if (frontendUrl) {
		try {
			const url = new URL(frontendUrl);
			additionalHosts.push(url.hostname);
		} catch (error) {
			console.warn('Invalid VITE_FRONTEND_URL:', frontendUrl);
		}
	}

	const allowedHosts = [...baseAllowedHosts, ...additionalHosts];

	return {
		plugins: [react(), tailwindcss()],
		optimizeDeps: {
			exclude: ['@vite/client', '@vite/env'],
		},
		server: {
			port: parseInt(env.VITE_PORT || '3000'),
			host: '0.0.0.0',
			allowedHosts,
		},
		preview: {
			port: parseInt(env.VITE_PORT || '3000'),
		}
	};
});
