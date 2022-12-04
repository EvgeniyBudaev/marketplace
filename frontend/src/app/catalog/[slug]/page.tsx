import { Catalog } from "src/index";
import { URL_BASE } from "src/constants";
import { TCatalog } from "src/entities/catalogs";
import { TProducts } from "src/entities/products";
import { Todos } from "../../../page/Catalog/Todos";

async function getCatalog(props: TProps) {
  const slug = props.params?.slug;

  const catalog = await fetch(`${URL_BASE}/api/v1/catalogs/by_alias/${slug}`);

  if (!catalog.ok) {
    throw new Error("Failed to fetch data");
  }

  return catalog.json();
}

async function getProducts(props: TProps) {
  const slug = props.params?.slug;
  const searchParams = props.searchParams ?? {};

  const encodeAndJoinPair = (pair: any) =>
    pair.map(encodeURIComponent).join("=");
  const params = Object.entries(searchParams).map(encodeAndJoinPair).join("&");
  const url = `${URL_BASE}/api/v1/products/page?catalog=${slug}${
    params ? `&${params}` : ""
  }`;

  const products = await fetch(url);

  if (!products.ok) {
    throw new Error("Failed to fetch data");
  }

  return products.json();
}

async function getTodos(props: TProps) {
  const searchParams = props.searchParams ?? {};

  const encodeAndJoinPair = (pair: any) =>
    pair.map(encodeURIComponent).join("=");
  const params = Object.entries(searchParams).map(encodeAndJoinPair).join("&");
  const url = `https://jsonplaceholder.typicode.com/todos?_limit=20${
    params ? `&${params}` : ""
  }`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

type TProps = {
  params?: {
    slug: string;
  };
  searchParams?: {
    searchParams?: { [key: string]: string | string[] | undefined };
  };
};

export default async function CatalogPage(props: TProps) {
  console.log("props: ", props);
  // const catalog = (await getCatalog(props)) as TCatalog;
  // const products =  (await getProducts(props)) as TProducts;
  const todos = await getTodos(props);

  return (
    <div>
      {/*<Catalog catalog={catalog} products={products} />*/}
      {todos && <Todos todos={todos} />}
    </div>
  );
}
