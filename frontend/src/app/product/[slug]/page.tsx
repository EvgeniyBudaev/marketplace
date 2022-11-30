import { URL_BASE } from "src/constants";
import { ProductDetail } from "src/page";
import { TProduct } from "src/types";

async function getData(slug: string) {
  const res = await fetch(`${URL_BASE}/api/v1/products/${slug}`);

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

type TProps = {
  params: {
    slug: string;
  };
  searchParams: any;
};

export default async function ProductPage(props: TProps) {
  //console.log("props: ", props);
  //const data = (await getData(props.params.slug)) as TProduct;
  //console.log("data: ", data);

  return (
    <div>
      <ProductDetail />
    </div>
  );
}
