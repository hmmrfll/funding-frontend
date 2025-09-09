export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	totalPages: number;
	limit: number;
	page: number;
}
