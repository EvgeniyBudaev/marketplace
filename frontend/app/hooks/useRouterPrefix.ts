import { useMainRouteData } from "~/hooks/useMainRouteData";

export const useRouterPrefix = () => {
  return useMainRouteData()?.routerPrefix;
};
