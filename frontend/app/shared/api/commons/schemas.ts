import { z } from "zod";

export const paginationSchema = z.object({
  pageSize: z.number().int().nonnegative().nullish(),
  currentPage: z.number().int().nonnegative(),
  hasNext: z.boolean(),
  hasPrevious: z.boolean(),
  countOfResult: z.number(),
});
