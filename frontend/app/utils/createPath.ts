import type { ERoutes } from "~/enums";

type TRoutes =
  | ERoutes.AdminCatalogs
  | ERoutes.AdminCatalogAdd
  | ERoutes.AdminProducts
  | ERoutes.AdminAttributes
  | ERoutes.AdminAttributeAdd
  | ERoutes.Cart
  | ERoutes.AdminProductAdd
  | ERoutes.Login
  | ERoutes.Order
  | ERoutes.Recipient
  | ERoutes.ResourcesLanguage
  | ERoutes.ResourcesTheme
  | ERoutes.Root
  | ERoutes.Settings
  | ERoutes.Shipping
  | ERoutes.Signup;

type TRoutesWithParams =
  | ERoutes.AdminAttributeEdit
  | ERoutes.AdminCatalogEdit
  | ERoutes.AdminProductEdit
  | ERoutes.CatalogDetail
  | ERoutes.ResourcesAttributesByCatalog
  | ERoutes.ProductDetail;

type TCreatePathProps =
  | { route: TRoutes; withIndex?: boolean }
  | { route: TRoutesWithParams; withIndex?: boolean; params: Record<string, string | number> };

type TCreatePathPropsWithParams = Extract<TCreatePathProps, { route: any; params: any }>;

const ROUTER_PREFIX =
  // @ts-ignore
  typeof window !== "undefined" ? window.ENV.ROUTER_PREFIX : process.env.ROUTER_PREFIX;

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

  if (ROUTER_PREFIX) {
    path = ROUTER_PREFIX + path;
  }

  return path;
}
