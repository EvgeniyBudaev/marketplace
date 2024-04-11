import { z } from "zod";
import { useRouteData } from "#app/hooks/useRouteData";

const ROUTE_ID = "routes/";

const MainRouteDataSchema = z.object({
  routerPrefix: z.string().nullish(),
});

export type MainRouteData = z.infer<typeof MainRouteDataSchema>;

export const useMainRouteData = () =>
  useRouteData<MainRouteData>(ROUTE_ID, MainRouteDataSchema);
