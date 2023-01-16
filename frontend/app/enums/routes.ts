export enum ERoutes {
  Root = "/",
  Login = "/auth/login",
  Signup = "/auth/signup",

  Cart = "/cart",
  CatalogAdd = "/admin/catalogs/add",
  CatalogDetail = "/catalog/:alias",
  Order = "/order",
  ProductDetail = "/product/:alias",
  Recipient = "/recipient",
  Shipping = "/shipping",

  ResourcesCatalogs = "/resources/catalogs",
  ResourcesCart = "/resources/cart",
  ResourcesCartItemIncrement = "/resources/cart/increment",
  ResourcesLogout = "/resources/logout",
  ResourcesSearch = "/resources/search",
}
