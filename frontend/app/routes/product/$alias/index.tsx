import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ProductDetail, productDetailLinks } from "~/pages";
import { getProductDetail } from "~/shared/api/products";
import { internalError } from "~/utils";

export const loader = async (args: LoaderArgs) => {
  const { params, request } = args;
  const { alias } = params as { alias: string };

  const productDetailResponse = await getProductDetail(request, { alias });

  if (!productDetailResponse.success) {
    throw internalError();
  }

  return json({
    product: productDetailResponse.data,
  });
};

export default function ProductDetailRoute() {
  const data = useLoaderData<typeof loader>();

  return <ProductDetail product={data.product} />;
}

export function links() {
  return [...productDetailLinks()];
}
