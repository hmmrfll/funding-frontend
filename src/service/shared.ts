import { useInfiniteQuery } from '@tanstack/react-query';
import type { PaginatedResponse } from '../types/Shared';

const defaultQueryOptions = {
	staleTime: 1000 * 60 * 5,
	gcTime: 1000 * 60 * 10,
};

export const usePaginatedQuery = <T, TParams extends object>(
	queryKey: string[],
	queryFn: (params: { page: number } & TParams) => Promise<PaginatedResponse<T>>,
	params: TParams,
	enabled: boolean,
) => {
	const { data, ...rest } = useInfiniteQuery<PaginatedResponse<T>>({
		queryKey: [...queryKey, params],
		queryFn: ({ pageParam = 1 }) => queryFn({ page: pageParam as number, ...params }),
		getNextPageParam: (lastPage, allPages) => (lastPage.totalPages > allPages.length ? allPages.length + 1 : undefined),
		initialPageParam: 1,
		...defaultQueryOptions,
		enabled,
	});

	const items = data?.pages.flatMap((page) => page.data) || [];
	const total = data?.pages?.[0]?.total || 0;

	return {
		data: items,
		total,
		...rest,
	};
};
