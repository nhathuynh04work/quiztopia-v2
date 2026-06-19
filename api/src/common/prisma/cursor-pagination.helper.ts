export interface PrismaModelDelegate<T> {
  findUnique(args: { where: Record<string, unknown> }): Promise<T | null>;
  findMany(args: {
    where?: Record<string, unknown>;
    take?: number;
    orderBy?: Record<string, "asc" | "desc">[];
    include?: Record<string, unknown>;
    select?: Record<string, unknown>;
  }): Promise<T[]>;
}

interface CursorPaginationOptions<T, K extends keyof T> {
  delegate: PrismaModelDelegate<any>;
  query: {
    cursor?: string;
    limit: number;
  };
  where?: Record<string, unknown>;
  orderByField: K;
  orderDirection?: "asc" | "desc";
  idField?: keyof T & string;
  include?: Record<string, unknown>;
  select?: Record<string, unknown>;
}

export async function paginateWithCursor<
  T extends Record<string, any>,
  K extends keyof T & string,
>({
  delegate,
  query,
  where = {},
  orderByField,
  orderDirection = "desc",
  idField = "id",
  include,
  select,
}: CursorPaginationOptions<T, K>): Promise<{
  data: T[];
  nextCursor: string | null;
}> {
  const limit = query.limit;

  let cursorRecord: T | null = null;
  if (query.cursor) {
    cursorRecord = await delegate.findUnique({
      where: { [idField]: query.cursor },
    });
  }

  const combinedWhere: Record<string, unknown> = { ...where };
  if (cursorRecord) {
    const cursorValue = cursorRecord[orderByField];
    const idValue = cursorRecord[idField];
    const comparisonOperator = orderDirection === "desc" ? "lt" : "gt";

    const existingAnd = Array.isArray(combinedWhere["AND"])
      ? (combinedWhere["AND"] as unknown[])
      : [];

    combinedWhere["AND"] = [
      ...existingAnd,
      {
        OR: [
          {
            [orderByField]: {
              [comparisonOperator]: cursorValue,
            },
          },
          {
            [orderByField]: cursorValue,
            [idField]: {
              [comparisonOperator]: idValue,
            },
          },
        ],
      },
    ];
  }

  const findManyOptions: {
    where?: Record<string, unknown>;
    take?: number;
    orderBy?: Record<string, "asc" | "desc">[];
    include?: Record<string, unknown>;
    select?: Record<string, unknown>;
  } = {
    where: combinedWhere,
    take: limit + 1,
    orderBy: [
      { [orderByField]: orderDirection },
      { [idField]: orderDirection },
    ],
  };

  if (include) findManyOptions.include = include;
  if (select) findManyOptions.select = select;

  const results = await delegate.findMany(findManyOptions);

  const hasNextPage = results.length > limit;
  if (hasNextPage) {
    results.pop();
  }

  const nextCursor =
    hasNextPage && results.length > 0
      ? (results[results.length - 1][idField] as string)
      : null;

  return {
    data: results as T[],
    nextCursor,
  };
}
