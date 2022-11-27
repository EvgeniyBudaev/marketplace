import { Catalog } from "src/index";
import { URL_BASE } from "src/constants";
import { TProduct } from "src/types";

async function getData() {
  const res = await fetch(
    `${URL_BASE}/api/v1/products/catalog?catalog=mirrors`
  );

  return res.json();
}

export default async function MirrorsPage() {
  const data = (await getData()) as TProduct[];
  console.log("data: ", data);

  return (
    <div>
      <Catalog products={data} />
    </div>
  );
}
