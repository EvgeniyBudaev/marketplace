import type { ERoutes } from "~/enums";

type TRoutes = ERoutes.Login | ERoutes.Signup | ERoutes.Cart | ERoutes.CatalogAdd;

type TRoutesWithParams = ERoutes.CatalogDetail | ERoutes.ProductDetail;

type TCreatePathProps =
  | { route: TRoutes; withIndex?: boolean }
  | { route: TRoutesWithParams; withIndex?: boolean; params: Record<string, string | number> };

type TCreatePathPropsWithParams = Extract<TCreatePathProps, { route: any; params: any }>;

export function createPath(
  props: TCreatePathProps,
  query?: Record<string, string> | URLSearchParams,
): string {
  let path: string = props.route;

  if (props.withIndex) {
    path += "?index";
  }

  if (props.hasOwnProperty("params")) {
    path = Object.entries((props as TCreatePathPropsWithParams).params).reduce(
      (previousValue: string, [param, value]) => previousValue.replace(`:${param}`, String(value)),
      path,
    );
  }

  if (query && Object.keys(query).length) {
    path = `${path}${path.includes("?") ? "&" : "?"}${new URLSearchParams(query)}`;
  }

  return path;
}
