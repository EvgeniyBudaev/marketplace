import type { ServerBuild } from "@remix-run/server-runtime";
import type { ServerRouteManifest } from "@remix-run/server-runtime/dist/routes";
import { JWTService, TJWTServiceParams } from "./JWTService";
import { wrapDataFunction } from "./wrapDataFunction";

export function registerAccessTokenRefresh(
  build: ServerBuild,
  jwtParams: TJWTServiceParams,
  routeIdPrefixList?: string[],
): ServerBuild {
  const jwtService = new JWTService(jwtParams);

  const routes: ServerRouteManifest = Object.entries(build.routes).reduce(
    (acc, [routeId, route]) => {
      if (!routeIdPrefixList || routeIdPrefixList.every((item) => !routeId.startsWith(item))) {
        return {
          ...acc,
          [routeId]: route,
        };
      }

      const action = route.module.action && wrapDataFunction(route.module.action, jwtService);
      const loader = route.module.loader && wrapDataFunction(route.module.loader, jwtService);
      const newRoute = {
        ...route,
        module: {
          ...route.module,
          action,
          loader,
        },
      };

      return {
        ...acc,
        [routeId]: newRoute,
      };
    },
    {},
  );

  return {
    ...build,
    routes,
  };
}
