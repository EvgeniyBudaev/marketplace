import { inputFromForm } from "remix-domains";
import { ActionArgs, json } from "@remix-run/node";
import { ProductAdd, productAddLinks } from "~/pages/Admin/Products/ProductAdd";
import { addProduct } from "~/shared/api/products";
import { internalError } from "~/utils";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  console.log("[ProductAdd action formValues] ", formValues);

  const response = await addProduct(request, formValues);

  if (!response.success) {
    throw internalError();
  }

  return json({
    product: response.data,
  });
};

export default function ProductAddRoute() {
  return <ProductAdd />;
}

export function links() {
  return [...productAddLinks()];
}
