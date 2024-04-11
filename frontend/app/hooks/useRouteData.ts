import { useMatches } from "@remix-run/react";
import { useMemo } from "react";
import type { z } from "zod";

export const useRouteData = <TData>(
  id: string,
  schema: z.ZodType<TData>
): TData | null => {
  const matches = useMatches();

  return useMemo(() => {
    const routeMatch = matches.find((item) => item.id === id);

    if (!routeMatch) {
      return null;
    }

    const result = schema.safeParse(routeMatch.data);

    if (!result.success) {
      return null;
    }

    return result.data;
  }, [id, matches, schema]);
};
