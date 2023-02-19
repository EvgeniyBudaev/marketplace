import { inputFromForm } from "remix-domains";
import { json } from "@remix-run/node";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";
import { getProductDetail } from "~/shared/api/products";
import { getInputErrors, getResponseError } from "~/shared/domain";
import { EFormFields } from "~/pages/Admin/Attributes/AttributeEdit";
import type { TForm } from "~/pages/Admin/Attributes/AttributeEdit";
import { ProductEdit, productEditLinks } from "~/pages/Admin/Products/ProductEdit";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  console.log("formValues: ", formValues);
  const _method = formValues?._method ?? "";

  try {
    return null;
    // return badRequest({ fieldErrors, success: false });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};
    console.log("[ERROR] ", error);
    console.log("[fieldErrors] ", fieldErrors);
    console.log("[formError] ", formError);
    return badRequest({ success: false, formError, fieldErrors });
  }
};

export const loader = async (args: LoaderArgs) => {
  const { params, request } = args;
  const { alias } = params;

  try {
    const response = await getProductDetail(request, { alias });

    if (response.success) {
      console.log("[OK]");
      return json({
        product: response.data,
        success: true,
      });
    }
    const fieldErrors = getInputErrors<keyof TForm>(response, Object.values(EFormFields));
    console.log("[BAD]");
    console.log("[fieldErrors] ", fieldErrors);

    return badRequest({ fieldErrors, success: false });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};
    console.log("[ERROR] ", error);
    console.log("[fieldErrors] ", fieldErrors);
    console.log("[formError] ", formError);
    return badRequest({ success: false, formError, fieldErrors });
  }
};

export default function ProductEditRoute() {
  const { product } = useLoaderData<typeof loader>();

  return <ProductEdit product={product} />;
}

export function links() {
  return [...productEditLinks()];
}
