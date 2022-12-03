import { z } from "zod";

export const paginationSchema = z.object({
    currentPage: z.number().int().nonnegative(),
    pageSize: z.number().int().nonnegative().nullish(),
});
