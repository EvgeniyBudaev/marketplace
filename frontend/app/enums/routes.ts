import { Recipient } from "~/pages";

export enum ERoutes {
  Root = "/",
  Login = "/auth/login",
  Signup = "/auth/signup",

  Cart = "/cart",
  CatalogDetail = "/catalog/:alias",
  Order = "/order",
  ProductDetail = "/product/:alias",
  Recipient = "/recipient",
  Shipping = "/shipping",

  ResourcesCatalogs = "/resources/catalogs",
  ResourcesCart = "/resources/cart",
  ResourcesLogout = "/resources/logout",
  ResourcesSearch = "/resources/search",
}
