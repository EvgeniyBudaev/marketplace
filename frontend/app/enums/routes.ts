export enum ERoutes {
  Root = "/",
  AdminPanel = "/admin",
  Login = "/auth/login",
  Signup = "/auth/signup",

  AdminAttributes = "/admin/attributes",
  AdminAttributeAdd = "/admin/attributes/add",
  AdminAttributeEdit = "/admin/attributes/:alias/edit",

  AdminCatalogs = "/admin/catalogs",
  AdminCatalogAdd = "/admin/catalogs/add",
  AdminCatalogEdit = "/admin/catalogs/:alias/edit",

  AdminProducts = "/admin/products",
  AdminProductAdd = "/admin/products/add",
  AdminProductEdit = "/admin/products/:alias/edit",

  Cart = "/cart",
  CatalogDetail = "/catalog/:alias",
  CatalogMirrors = "/catalog/mirrors",
  Order = "/order",
  ProductDetail = "/product/:alias",
  Recipient = "/recipient",
  Settings = "/settings",
  Shipping = "/shipping",

  ResourcesAdminProductAddUploadImage = "/resources/admin/products/add",
  ResourcesAttributesByCatalog = "/resources/catalogs/attributes/:alias",
  ResourcesCatalogs = "/resources/catalogs",
  ResourcesCart = "/resources/cart",
  ResourcesCartItemIncrement = "/resources/cart/increment",
  ResourcesLogout = "/resources/logout",
  ResourcesSearch = "/resources/search",
  ResourcesLanguage = "/resources/language",
  ResourcesTheme = "/resources/theme",
}
