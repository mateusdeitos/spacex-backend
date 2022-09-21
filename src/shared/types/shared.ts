export type TPagination = {
	limit: number;
	offset: number;
}

export type TPaginatedResult<T> = {
	total: number;
	limit: number;
	offset: number;
	data: T[];
}