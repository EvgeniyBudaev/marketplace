import { useMainRouteData } from "#app/hooks/useMainRouteData";

export const useRouterPrefix = () => {
  return useMainRouteData()?.routerPrefix;
};
