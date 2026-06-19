export type CursorPaginationQuery = {
	cursor?: string;
	limit?: number;
};

export type CursorPaginatedResponse<T> = {
	data: T[];
	nextCursor: string | null;
};
