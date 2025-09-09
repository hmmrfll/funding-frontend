# 🚀 Система кеширования с React Query

## Как использовать

### 1. Импорт хуков

```typescript
// Импортируйте хуки напрямую из сервисов
import { useArbitrageOpportunities } from '../service/arbitrageService';
import { useNotifications } from '../service/notificationsService';
import { useCurrentUser } from '../service/shared';
```

### 2. Использование в компонентах

```typescript
const MyComponent = () => {
	// Получение данных с автоматическим кешированием
	const { data, isLoading, error } = useArbitrageOpportunities(0.0001);

	// Мутации с автоматической инвалидацией кеша
	const { mutate: createNotification } = useCreateNotification();

	return (
		<div>
			{isLoading && <div>Загрузка...</div>}
			{error && <div>Ошибка: {error.message}</div>}
			{data && <div>{/* Рендер данных */}</div>}
		</div>
	);
};
```

### 3. Пагинация

```typescript
const ListComponent = () => {
	const { opportunities: items, isLoading, fetchNextPage, hasNextPage } = useArbitrageOpportunities(minProfit);

	return (
		<>
			{items.map((item) => (
				<Item
					key={item.id}
					data={item}
				/>
			))}
			{!isLoading && hasNextPage && <LoadingTrigger callback={() => fetchNextPage()} />}
		</>
	);
};
```

### 4. Настройки кеширования

```typescript
// Глобальные настройки в App.tsx
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000, // 5 минут
			gcTime: 10 * 60 * 1000, // 10 минут
			retry: 3,
			refetchOnWindowFocus: false,
			refetchOnReconnect: true,
		},
	},
});
```

## Доступные хуки

### Arbitrage

- `useArbitrageOpportunities(minProfit)` - возможности арбитража с пагинацией
- `useFundingRatesComparison()` - сравнение funding rates
- `usePairDetails(symbol, days)` - детали пары

### Notifications

- `useNotifications(userId)` - уведомления пользователя
- `useCreateNotification()` - создание уведомления
- `useUpdateNotification()` - обновление уведомления
- `useDeleteNotification()` - удаление уведомления

### User

- `useCurrentUser()` - текущий пользователь
- `useCreateUser()` - создание пользователя
- `useUpdateUser()` - обновление пользователя

## Преимущества

- ✅ **Автоматическое кеширование** - данные кешируются и переиспользуются
- ✅ **Синхронизация** - автоматическое обновление при изменении данных
- ✅ **Производительность** - дедупликация запросов и умная инвалидация
- ✅ **Простота** - минимум кода для работы с данными
- ✅ **Типизация** - полная поддержка TypeScript
