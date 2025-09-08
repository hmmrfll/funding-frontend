import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBackButton } from '../hooks/useBackButton';
import { navigateBack } from '../utils/navigationUtils';
import { fullScreenPaddingTop } from '../utils/isMobile';
import SquircleWrap from '../components/SquircleWrap';
import Input from '../components/inputs/Input';
import Select from '../components/inputs/Select';
import ActionCard from '../components/ActionCard';
import { useAuth } from '../providers/AuthProvider';
import useTelegram from '../hooks/useTelegram';
import type { TradingPair } from '../types/Shared';
import notificationsService from '../service/notificationsService';

const CreateNotificationPage: React.FC = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { user, isAuthenticated } = useAuth();
	const { hapticTrigger } = useTelegram();
	const [type, setType] = useState<'global' | 'pair'>('global');
	const [selectedPair, setSelectedPair] = useState<string>('');
	const [threshold, setThreshold] = useState<number>(0.01);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [tradingPairs, setTradingPairs] = useState<TradingPair[]>([]);
	const [pairsLoading, setPairsLoading] = useState(false);

	useBackButton(() => navigateBack(navigate));

	useEffect(() => {
		const symbolParam = searchParams.get('symbol');
		const thresholdParam = searchParams.get('threshold');

		if (symbolParam) {
			setType('pair');
			setSelectedPair(symbolParam);
		}

		if (thresholdParam) {
			const parsedThreshold = parseFloat(thresholdParam);
			if (!isNaN(parsedThreshold)) {
				setThreshold(parsedThreshold);
			}
		}
	}, [searchParams]);

	const loadTradingPairs = useCallback(async () => {
		try {
			setPairsLoading(true);
			setError(null);

			const pairs = await notificationsService.getTradingPairs();
			setTradingPairs(pairs);
		} catch (error) {
			console.error('Failed to load trading pairs:', error);
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError('Unable to load trading pairs. Please try again.');
			}
		} finally {
			setPairsLoading(false);
		}
	}, []);

	useEffect(() => {
		if (isAuthenticated) {
			loadTradingPairs();
		}
	}, [isAuthenticated, loadTradingPairs]);

	const handleSave = async () => {
		if (!user?.id) return;

		try {
			setSaving(true);
			setError(null);
			hapticTrigger('medium');

			await notificationsService.createNotification(user.id, {
				type,
				...(type === 'pair' && {
					symbol: selectedPair,
					symbolLabel: tradingPairs.find((p) => p.symbol === selectedPair)?.label,
				}),
				threshold,
				enabled: true,
			});

			hapticTrigger('heavy');
			navigateBack(navigate);
		} catch (error) {
			console.error('Failed to save notification:', error);
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError('Failed to create notification. Please try again.');
			}
		} finally {
			setSaving(false);
		}
	};

	const getCurrentRate = () => {
		if (type === 'pair' && selectedPair) {
			const pair = tradingPairs.find((p) => p.symbol === selectedPair);
			return pair ? notificationsService.getCurrentRate(pair) : 'N/A';
		}
		return 'Various';
	};

	const canSave = type === 'global' || (type === 'pair' && selectedPair);

	if (error && tradingPairs.length === 0) {
		return (
			<div className="flex flex-col gap-6 pb-6">
				<div className={`flex items-start justify-between gap-4 ${fullScreenPaddingTop}`}>
					<div className="flex-1 min-w-0">
						<h1 className="font-tertiary-bold text-[var(--color-text)] text-xl">Create Notification</h1>
						<span className="text-sm text-[var(--color-text-tertiary)]">Set up a new arbitrage alert</span>
					</div>
				</div>

				<SquircleWrap className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
					<div className="text-center">
						<div className="text-red-600 dark:text-red-400 text-lg mb-2">⚠️</div>
						<div className="text-red-800 dark:text-red-200 font-medium mb-2">Error loading data</div>
						<div className="text-red-600 dark:text-red-400 text-sm mb-4">{error}</div>
						<button
							onClick={loadTradingPairs}
							className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
						>
							Try Again
						</button>
					</div>
				</SquircleWrap>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6 pb-6">
			<div className={`flex items-start justify-between gap-4 ${fullScreenPaddingTop}`}>
				<div className="flex-1 min-w-0">
					<h1 className="font-tertiary-bold text-[var(--color-text)] text-xl">Create Notification</h1>
					<span className="text-sm text-[var(--color-text-tertiary)]">Set up a new arbitrage alert</span>
				</div>
			</div>

			<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
				<h3 className="font-tertiary-bold text-[var(--color-text)] mb-4">📱 Alert Type</h3>

				<Select
					value={type}
					onChange={(e) => {
						setType(e.target.value as 'global' | 'pair');
						setSelectedPair('');
						hapticTrigger('soft');
					}}
					options={[
						{ value: 'global', label: '🌍 Global Alert - All trading pairs' },
						{ value: 'pair', label: '📊 Specific Pair - Single trading pair' },
					]}
				/>
			</SquircleWrap>

			{type === 'pair' && (
				<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
					<h3 className="font-tertiary-bold text-[var(--color-text)] mb-4">💱 Select Trading Pair</h3>

					<Select
						value={selectedPair}
						onChange={(e) => {
							setSelectedPair(e.target.value);
							hapticTrigger('soft');
						}}
						placeholder={pairsLoading ? 'Loading trading pairs...' : 'Choose a trading pair'}
						disabled={pairsLoading}
						options={tradingPairs.map((pair) => ({
							value: pair.symbol,
							label: `${pair.label} (${notificationsService.getCurrentRate(pair)})`,
						}))}
					/>
				</SquircleWrap>
			)}

			<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
				<h3 className="font-tertiary-bold text-[var(--color-text)] mb-4">🎯 Profit Threshold</h3>

				<Input
					type="number"
					step="0.001"
					value={threshold}
					onChange={(e) => {
						setThreshold(parseFloat(e.target.value) || 0);
						hapticTrigger('soft');
					}}
					placeholder="0.01"
					helperText={`Alert when profit reaches ${notificationsService.formatPercentage(threshold)} or higher`}
					variant="number"
				/>
			</SquircleWrap>

			<SquircleWrap className="bg-[var(--color-bg-secondary)] p-4">
				<h3 className="font-tertiary-bold text-[var(--color-text)] mb-3">👀 Preview</h3>

				<div className="bg-[var(--color-border)] bg-opacity-30 p-4 rounded-lg">
					<div className="flex items-start justify-between mb-3">
						<div className="flex-1">
							<div className="font-medium text-[var(--color-text)] mb-1">
								{type === 'global'
									? '🌍 Global Alert'
									: `📊 ${tradingPairs.find((p) => p.symbol === selectedPair)?.label || 'Select a pair'}`}
							</div>
							<div className="text-sm text-[var(--color-text-tertiary)]">
								{type === 'global'
									? `All pairs above ${notificationsService.formatPercentage(threshold)}`
									: selectedPair
									? `${selectedPair} above ${notificationsService.formatPercentage(threshold)}`
									: 'Choose a trading pair first'}
							</div>
						</div>
						<div className="text-xs text-[var(--color-text-tertiary)]">Current: {getCurrentRate()}</div>
					</div>

					<div className="text-xs text-[var(--color-text-tertiary)] bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
						💡 You'll receive a Telegram notification when this condition is met
					</div>
				</div>
			</SquircleWrap>

			{error && (
				<SquircleWrap className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
					<div className="text-center">
						<div className="text-red-600 dark:text-red-400 text-lg mb-2">⚠️</div>
						<div className="text-red-800 dark:text-red-200 font-medium mb-2">Error</div>
						<div className="text-red-600 dark:text-red-400 text-sm">{error}</div>
					</div>
				</SquircleWrap>
			)}

			<ActionCard
				icon="💾"
				title="Save Notification"
				description={canSave ? 'Create this arbitrage alert' : 'Complete the setup first'}
				buttonText={saving ? 'Saving...' : 'Save'}
				onClick={canSave ? handleSave : undefined}
				showChevron={false}
				className={
					canSave
						? 'bg-[var(--color-primary)] bg-opacity-10 border border-[var(--color-primary)] border-opacity-30'
						: 'bg-[var(--color-bg-secondary)] border-0 opacity-50'
				}
			/>
		</div>
	);
};

export default CreateNotificationPage;
