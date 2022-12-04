import { Catalog } from "src/index";
import { URL_BASE } from "src/constants";
import { TCatalog } from "src/entities/catalogs";
import { TProducts } from "src/entities/products";

async function getCatalog(slug: string) {
  const catalog = await fetch(`${URL_BASE}/api/v1/catalogs/by_alias/${slug}`);

  if (!catalog.ok) {
    throw new Error("Failed to fetch data");
  }

  return catalog.json();
}

async function getProducts(slug: string) {
  const products = await fetch(
    `${URL_BASE}/api/v1/products/page?catalog=${slug}`
  );

  if (!products.ok) {
    throw new Error("Failed to fetch data");
  }

  return products.json();
}

type TProps = {
  params?: {
    slug: string;
  };
  searchParams?: {
    search?: string;
  };
};

export default async function CatalogPage(props: TProps) {
  console.log("props: ", props);
  const catalog = (props.params && await getCatalog(props.params.slug)) as TCatalog;
  const products = (props.params && await getProducts(props.params.slug)) as TProducts;

  return (
    <div>
      <Catalog catalog={catalog} products={products} />
    </div>
  );
}
